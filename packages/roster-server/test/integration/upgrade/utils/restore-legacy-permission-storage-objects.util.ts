import { roster_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER } from 'roster-shared/application';
import { isDefined } from 'roster-shared/utils';

import { getAppProviderByClassName } from 'test/integration/utils/get-app-provider-by-class-name.util';

import { PERMISSION_STORAGE_OBJECTS_TO_CONVERT } from 'src/database/commands/upgrade-version-command/2-61/constants/permission-storage-objects-to-convert.constant';
import { type ApplicationService } from 'src/engine/core-modules/application/application.service';
import { getWorkspaceSchemaName } from 'src/engine/workspace-datasource/utils/get-workspace-schema-name.util';
import { computerosterStandardApplicationAllFlatEntityMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/roster-standard-application-all-flat-entity-maps.constant';
import { type WorkspaceMigrationValidateBuildAndRunService } from 'src/engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service';

const PERMISSION_TABLE_ENUM_NAMES = [
  'recordShare_principalType_enum',
  'recordShare_rowCause_enum',
  'recordShare_accessLevel_enum',
  'accessGroup_type_enum',
];

const buildInsertPlaceholders = (count: number): string =>
  Array.from({ length: count }, (_, index) => `$${index + 1}`).join(', ');

export const restoreLegacyPermissionStorageObjects = async (
  workspaceId: string,
): Promise<void> => {
  const schema = `"${getWorkspaceSchemaName(workspaceId)}"`;
  const recordShareRows: Record<string, unknown>[] =
    await global.testDataSource.query(`SELECT * FROM ${schema}."recordShare"`);

  for (const { tableName } of PERMISSION_STORAGE_OBJECTS_TO_CONVERT) {
    await global.testDataSource.query(
      `DROP TABLE ${schema}."${tableName}" CASCADE`,
    );
  }

  for (const enumName of PERMISSION_TABLE_ENUM_NAMES) {
    await global.testDataSource.query(`DROP TYPE ${schema}."${enumName}"`);
  }

  const { rosterStandardFlatApplication } =
    await getAppProviderByClassName<ApplicationService>(
      'ApplicationService',
    ).findWorkspacerosterStandardAndCustomApplicationOrThrow({ workspaceId });
  const { allFlatEntityMaps } =
    computerosterStandardApplicationAllFlatEntityMaps({
      now: new Date().toISOString(),
      workspaceId,
      rosterStandardApplicationId: rosterStandardFlatApplication.id,
    });
  const flatObjectMetadatas = PERMISSION_STORAGE_OBJECTS_TO_CONVERT.map(
    ({ universalIdentifier }) =>
      allFlatEntityMaps.flatObjectMetadataMaps.byUniversalIdentifier[
        universalIdentifier
      ],
  ).filter(isDefined);
  const objectMetadataIds = flatObjectMetadatas.map(({ id }) => id);

  const result =
    await getAppProviderByClassName<WorkspaceMigrationValidateBuildAndRunService>(
      'WorkspaceMigrationValidateBuildAndRunService',
    ).validateBuildAndRunLegacyWorkspaceMigration({
      workspaceId,
      isSystemBuild: true,
      applicationUniversalIdentifier:
        roster_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER,
      allFlatEntityOperationByMetadataName: {
        objectMetadata: {
          flatEntityToCreate: flatObjectMetadatas,
          flatEntityToDelete: [],
          flatEntityToUpdate: [],
        },
        fieldMetadata: {
          flatEntityToCreate: Object.values(
            allFlatEntityMaps.flatFieldMetadataMaps.byUniversalIdentifier,
          )
            .filter(isDefined)
            .filter(({ objectMetadataId }) =>
              objectMetadataIds.includes(objectMetadataId),
            ),
          flatEntityToDelete: [],
          flatEntityToUpdate: [],
        },
        index: {
          flatEntityToCreate: Object.values(
            allFlatEntityMaps.flatIndexMaps.byUniversalIdentifier,
          )
            .filter(isDefined)
            .filter(({ objectMetadataId }) =>
              objectMetadataIds.includes(objectMetadataId),
            ),
          flatEntityToDelete: [],
          flatEntityToUpdate: [],
        },
      },
    });

  if (result.status === 'fail') {
    throw new Error(
      `Could not restore the legacy permission storage objects: ${JSON.stringify(result)}`,
    );
  }

  for (const row of recordShareRows) {
    const columnNames = Object.keys(row);

    await global.testDataSource.query(
      `INSERT INTO ${schema}."recordShare" (${columnNames.map((columnName) => `"${columnName}"`).join(', ')}) VALUES (${buildInsertPlaceholders(columnNames.length)})`,
      Object.values(row),
    );
  }
};
