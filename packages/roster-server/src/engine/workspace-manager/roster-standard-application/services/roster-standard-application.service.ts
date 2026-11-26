import { Injectable } from '@nestjs/common';

import { isDefined } from 'roster-shared/utils';

import { ApplicationGrantRoleService } from 'src/engine/core-modules/application/application-grant-role/services/application-grant-role.service';
import {
  ApplicationException,
  ApplicationExceptionCode,
} from 'src/engine/core-modules/application/application.exception';
import { ApplicationService } from 'src/engine/core-modules/application/application.service';
import { findFlatEntityByUniversalIdentifier } from 'src/engine/metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util';
import { MetadataFlatEntity } from 'src/engine/metadata-modules/flat-entity/types/metadata-flat-entity.type';
import { getMetadataFlatEntityMapsKey } from 'src/engine/metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util';
import { findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/utils/find-many-flat-entity-by-universal-identifier-in-universal-flat-entity-maps.util';
import { getSubFlatEntityMapsByApplicationIdsOrThrow } from 'src/engine/metadata-modules/flat-entity/utils/get-sub-flat-entity-maps-by-application-ids-or-throw.util';
import { computeMissingInitialObjectViewOperations } from 'src/engine/metadata-modules/view/utils/compute-missing-initial-object-view-operations.util';
import { PermissionTableService } from 'src/engine/permissions/permission-table/services/permission-table.service';
import { WorkspaceOrmManager } from 'src/engine/roster-orm/workspace-orm.manager';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';
import { STANDARD_ROLE } from 'src/engine/workspace-manager/roster-standard-application/constants/standard-role.constant';
import { roster_STANDARD_ALL_METADATA_NAME } from 'src/engine/workspace-manager/roster-standard-application/constants/roster-standard-all-metadata-name.constant';
import { keepWorkspaceOwnedProperties } from 'src/engine/metadata-modules/flat-entity/utils/keep-workspace-owned-properties.util';
import { temporaryOmitPermissionStorageObjectsFromrosterStandardAllFlatEntityMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/temporary-omit-permission-storage-objects-from-roster-standard-all-flat-entity-maps.util';
import { computerosterStandardApplicationAllFlatEntityMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/roster-standard-application-all-flat-entity-maps.constant';
import { WorkspaceMigrationBuilderException } from 'src/engine/workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception';
import { WorkspaceMigrationValidateBuildAndRunService } from 'src/engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service';
import { FromToAllUniversalFlatEntityMaps } from 'src/engine/workspace-manager/workspace-migration/types/workspace-migration-orchestrator.type';

// TODO completely deprecate this file once we've created the roster-standard roster-app manifest
@Injectable()
export class rosterStandardApplicationService {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly workspaceMigrationValidateBuildAndRunService: WorkspaceMigrationValidateBuildAndRunService,
    private readonly workspaceCacheService: WorkspaceCacheService,
    private readonly workspaceOrmManager: WorkspaceOrmManager,
    private readonly applicationGrantRoleService: ApplicationGrantRoleService,
    private readonly permissionTableService: PermissionTableService,
  ) {}

  async synchronizerosterStandardApplicationOrThrow({
    workspaceId,
  }: {
    workspaceId: string;
  }) {
    const { rosterStandardFlatApplication } =
      await this.applicationService.findWorkspacerosterStandardAndCustomApplicationOrThrow(
        {
          workspaceId,
        },
      );
    const {
      featureFlagsMap,
      billingEntitlements,
      ...fromrosterStandardAllFlatEntityMaps
    } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
      ...roster_STANDARD_ALL_METADATA_NAME.map(getMetadataFlatEntityMapsKey),
      'featureFlagsMap',
      'billingEntitlements',
    ]);

    const { allFlatEntityMaps, idByUniversalIdentifierByMetadataName } =
      computerosterStandardApplicationAllFlatEntityMaps({
        now: new Date().toISOString(),
        workspaceId,
        rosterStandardApplicationId: rosterStandardFlatApplication.id,
        isWorkspaceCreation: true,
      });
    const torosterStandardAllFlatEntityMaps =
      temporaryOmitPermissionStorageObjectsFromrosterStandardAllFlatEntityMaps(
        allFlatEntityMaps,
      );

    await this.permissionTableService.createTables({ workspaceId });

    const fromToAllFlatEntityMaps: FromToAllUniversalFlatEntityMaps = {};

    for (const metadataName of roster_STANDARD_ALL_METADATA_NAME) {
      const flatEntityMapsKey = getMetadataFlatEntityMapsKey(metadataName);
      const fromFlatEntityMaps =
        fromrosterStandardAllFlatEntityMaps[flatEntityMapsKey];
      const from = getSubFlatEntityMapsByApplicationIdsOrThrow<
        MetadataFlatEntity<typeof metadataName>
      >({
        applicationIds: [rosterStandardFlatApplication.id],
        flatEntityMaps: fromFlatEntityMaps,
      });

      const fromTo = {
        from,
        to: keepWorkspaceOwnedProperties({
          metadataName,
          fromFlatEntityMaps: from,
          toFlatEntityMaps:
            torosterStandardAllFlatEntityMaps[flatEntityMapsKey],
        }),
      };

      // @ts-expect-error Metadata flat entity maps cache key and metadataName colliding
      fromToAllFlatEntityMaps[flatEntityMapsKey] = fromTo;
    }

    const validateAndBuildResult =
      await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigrationFromTo(
        {
          // Workspace creation and seeding chain migrations right after this sync.
          shouldDeferActions: false,
          buildOptions: {
            isSystemBuild: true,
            inferDeletionFromMissingEntities: true,
            applicationUniversalIdentifier:
              rosterStandardFlatApplication.universalIdentifier,
          },
          fromToAllFlatEntityMaps,
          workspaceId,
          additionalCacheDataMaps: {
            featureFlagsMap,
            billingEntitlements,
          },
          idByUniversalIdentifierByMetadataName,
        },
      );

    if (validateAndBuildResult.status === 'fail') {
      throw new WorkspaceMigrationBuilderException(
        validateAndBuildResult,
        'Multiple validation errors occurred while synchronizing roster-standard application',
      );
    }

    if (!isDefined(rosterStandardFlatApplication.requestedRoleId)) {
      await this.setStandardApplicationDefaultRoleOrThrow({
        workspaceId,
        rosterStandardApplicationId: rosterStandardFlatApplication.id,
      });
    }

    await this.applicationGrantRoleService.upsertGrantRole({
      workspaceId,
      applicationId: rosterStandardFlatApplication.id,
      isRequestedRoleDeclaredWithLegacyProperties: false,
    });

    await this.seedStandardObjectInitialViewsOrThrow({
      workspaceId,
      standardObjectMetadataUniversalIdentifiers: Object.keys(
        torosterStandardAllFlatEntityMaps.flatObjectMetadataMaps
          .byUniversalIdentifier,
      ),
    });
  }

  private async setStandardApplicationDefaultRoleOrThrow({
    workspaceId,
    rosterStandardApplicationId,
  }: {
    workspaceId: string;
    rosterStandardApplicationId: string;
  }): Promise<void> {
    const { flatRoleMaps } = await this.workspaceCacheService.getOrRecompute(
      workspaceId,
      ['flatRoleMaps'],
    );

    const adminFlatRole = findFlatEntityByUniversalIdentifier({
      universalIdentifier: STANDARD_ROLE.admin.universalIdentifier,
      flatEntityMaps: flatRoleMaps,
    });

    if (!isDefined(adminFlatRole)) {
      throw new ApplicationException(
        `Could not find the Admin role in workspace ${workspaceId}`,
        ApplicationExceptionCode.ENTITY_NOT_FOUND,
      );
    }

    await this.applicationService.update(rosterStandardApplicationId, {
      workspaceId,
      requestedRoleId: adminFlatRole.id,
    });
  }

  private async seedStandardObjectInitialViewsOrThrow({
    workspaceId,
    standardObjectMetadataUniversalIdentifiers,
  }: {
    workspaceId: string;
    standardObjectMetadataUniversalIdentifiers: string[];
  }): Promise<void> {
    const { flatObjectMetadataMaps, flatViewMaps, flatViewFieldMaps } =
      await this.workspaceCacheService.getOrRecompute(workspaceId, [
        'flatObjectMetadataMaps',
        'flatViewMaps',
        'flatViewFieldMaps',
      ]);

    const { workspaceCustomFlatApplication } =
      await this.applicationService.findWorkspacerosterStandardAndCustomApplicationOrThrow(
        { workspaceId },
      );

    const seedOperations = computeMissingInitialObjectViewOperations({
      flatObjectMetadatas:
        findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMaps({
          flatEntityMaps: flatObjectMetadataMaps,
          universalIdentifiers: standardObjectMetadataUniversalIdentifiers,
        }),
      flatViewMaps,
      flatViewFieldMaps,
      initialViewApplicationUniversalIdentifier:
        workspaceCustomFlatApplication.universalIdentifier,
    });

    if (
      seedOperations.viewsToCreate.length === 0 &&
      seedOperations.viewFieldsToCreate.length === 0
    ) {
      return;
    }

    const result =
      await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunLegacyWorkspaceMigration(
        {
          isSystemBuild: true,
          workspaceId,
          applicationUniversalIdentifier:
            workspaceCustomFlatApplication.universalIdentifier,
          allFlatEntityOperationByMetadataName: {
            view: {
              flatEntityToCreate: seedOperations.viewsToCreate,
              flatEntityToDelete: [],
              flatEntityToUpdate: [],
            },
            viewField: {
              flatEntityToCreate: seedOperations.viewFieldsToCreate,
              flatEntityToDelete: [],
              flatEntityToUpdate: [],
            },
          },
        },
      );

    if (result.status === 'fail') {
      throw new WorkspaceMigrationBuilderException(
        result,
        `Multiple validation errors occurred while seeding initial object views for workspace ${workspaceId}`,
      );
    }
  }
}
