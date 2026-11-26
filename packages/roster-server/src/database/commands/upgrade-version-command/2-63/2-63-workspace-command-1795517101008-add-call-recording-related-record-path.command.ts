import { Command } from 'nest-commander';
import { roster_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER } from 'roster-shared/application';
import { isDefined } from 'roster-shared/utils';
import { v4 } from 'uuid';

import { ProvisionedWorkspaceCommandRunner } from 'src/database/commands/command-runners/provisioned-workspace.command-runner';
import { WorkspaceIteratorService } from 'src/database/commands/command-runners/workspace-iterator.service';
import { type RunOnWorkspaceArgs } from 'src/database/commands/command-runners/workspace.command-runner';
import { CALL_RECORDING_RELATED_RECORD_PATH_UNIVERSAL_IDENTIFIER } from 'src/database/commands/upgrade-version-command/2-63/constants/call-recording-related-record-path-universal-identifier.constant';
import { ApplicationService } from 'src/engine/core-modules/application/application.service';
import { RegisteredWorkspaceCommand } from 'src/engine/core-modules/upgrade/decorators/registered-workspace-command.decorator';
import { type FlatRelatedRecordPath } from 'src/engine/metadata-modules/flat-related-record-path/types/flat-related-record-path.type';
import { getRelatedRecordPathFieldMetadataUniversalIdentifiers } from 'src/engine/metadata-modules/related-record-path/utils/get-related-record-path-field-metadata-universal-identifiers.util';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';
import { computerosterStandardApplicationAllFlatEntityMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/roster-standard-application-all-flat-entity-maps.constant';
import { WorkspaceMigrationBuilderException } from 'src/engine/workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception';
import { WorkspaceMigrationValidateBuildAndRunService } from 'src/engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service';

const getHopsKey = (
  hops: Parameters<
    typeof getRelatedRecordPathFieldMetadataUniversalIdentifiers
  >[0],
) => getRelatedRecordPathFieldMetadataUniversalIdentifiers(hops).join(':');

@RegisteredWorkspaceCommand('2.63.0', 1795517101008)
@Command({
  name: 'upgrade:2-63:add-call-recording-related-record-path',
  description:
    'Add the related record path from calendar events to their call recordings',
})
export class AddCallRecordingRelatedRecordPathCommand extends ProvisionedWorkspaceCommandRunner {
  constructor(
    protected readonly workspaceIteratorService: WorkspaceIteratorService,
    private readonly applicationService: ApplicationService,
    private readonly workspaceCacheService: WorkspaceCacheService,
    private readonly workspaceMigrationValidateBuildAndRunService: WorkspaceMigrationValidateBuildAndRunService,
  ) {
    super(workspaceIteratorService);
  }

  private standardFlatRelatedRecordPaths: FlatRelatedRecordPath[] | undefined;

  private getStandardFlatRelatedRecordPaths(): FlatRelatedRecordPath[] {
    if (isDefined(this.standardFlatRelatedRecordPaths)) {
      return this.standardFlatRelatedRecordPaths;
    }

    const standardFlatRelatedRecordPathByUniversalIdentifier =
      computerosterStandardApplicationAllFlatEntityMaps({
        now: new Date().toISOString(),
        workspaceId: v4(),
        rosterStandardApplicationId: v4(),
      }).allFlatEntityMaps.flatRelatedRecordPathMaps.byUniversalIdentifier;

    this.standardFlatRelatedRecordPaths = [
      standardFlatRelatedRecordPathByUniversalIdentifier[
        CALL_RECORDING_RELATED_RECORD_PATH_UNIVERSAL_IDENTIFIER
      ],
    ].filter(isDefined);

    return this.standardFlatRelatedRecordPaths;
  }

  override async runOnWorkspace({
    workspaceId,
    options,
  }: RunOnWorkspaceArgs): Promise<void> {
    const { flatFieldMetadataMaps, flatRelatedRecordPathMaps } =
      await this.workspaceCacheService.getOrRecompute(workspaceId, [
        'flatFieldMetadataMaps',
        'flatRelatedRecordPathMaps',
      ]);

    const existingHopsKeys = new Set(
      Object.values(flatRelatedRecordPathMaps.byUniversalIdentifier)
        .filter(isDefined)
        .map(getHopsKey),
    );

    const missingStandardFlatRelatedRecordPaths =
      this.getStandardFlatRelatedRecordPaths().filter(
        (standardFlatRelatedRecordPath) =>
          !existingHopsKeys.has(getHopsKey(standardFlatRelatedRecordPath)) &&
          getRelatedRecordPathFieldMetadataUniversalIdentifiers(
            standardFlatRelatedRecordPath,
          ).every(
            (fieldMetadataUniversalIdentifier) =>
              flatFieldMetadataMaps.byUniversalIdentifier[
                fieldMetadataUniversalIdentifier
              ]?.isActive ?? false,
          ),
      );

    if (missingStandardFlatRelatedRecordPaths.length === 0) {
      return;
    }

    this.logger.log(
      `${options.dryRun ? '[DRY RUN] ' : ''}Workspace ${workspaceId}: creating ${missingStandardFlatRelatedRecordPaths.length} standard related record path(s)`,
    );

    if (options.dryRun) {
      return;
    }

    const { rosterStandardFlatApplication } =
      await this.applicationService.findWorkspacerosterStandardAndCustomApplicationOrThrow(
        { workspaceId },
      );

    const result =
      await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunLegacyWorkspaceMigration(
        {
          workspaceId,
          isSystemBuild: true,
          applicationUniversalIdentifier:
            roster_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER,
          allFlatEntityOperationByMetadataName: {
            relatedRecordPath: {
              flatEntityToCreate: missingStandardFlatRelatedRecordPaths.map(
                (standardFlatRelatedRecordPath) => ({
                  ...standardFlatRelatedRecordPath,
                  id: v4(),
                  workspaceId,
                  applicationId: rosterStandardFlatApplication.id,
                }),
              ),
              flatEntityToDelete: [],
              flatEntityToUpdate: [],
            },
          },
        },
      );

    if (result.status === 'fail') {
      throw new WorkspaceMigrationBuilderException(
        result,
        `Failed to add the call recording related record path for workspace ${workspaceId}`,
      );
    }
  }
}
