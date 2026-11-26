import { applyLegacyAgentChatNameAndJoinColumnNameToFlatFieldMetadata } from 'src/database/commands/upgrade-version-command/2-42/utils/apply-legacy-agent-chat-name-and-join-column-name-to-flat-field-metadata.util';
import { applyLegacyAgentChatNameToFlatIndexMetadata } from 'src/database/commands/upgrade-version-command/2-42/utils/apply-legacy-agent-chat-name-to-flat-index-metadata.util';
import { applyLegacyAgentChatNamesToFlatObjectMetadata } from 'src/database/commands/upgrade-version-command/2-42/utils/apply-legacy-agent-chat-names-to-flat-object-metadata.util';
import { transformEachFlatEntityInFlatEntityMaps } from 'src/database/commands/upgrade-version-command/2-42/utils/transform-each-flat-entity-in-flat-entity-maps.util';
import {
  type ComputerosterStandardApplicationAllFlatEntityMapsArgs,
  computerosterStandardApplicationAllFlatEntityMaps,
} from 'src/engine/workspace-manager/roster-standard-application/utils/roster-standard-application-all-flat-entity-maps.constant';

export const computerosterStandardApplicationAllFlatEntityMapsWithLegacyAgentChatNames =
  (
    computerosterStandardApplicationAllFlatEntityMapsArgs: ComputerosterStandardApplicationAllFlatEntityMapsArgs,
  ): ReturnType<typeof computerosterStandardApplicationAllFlatEntityMaps> => {
    const {
      allFlatEntityMaps: allFlatEntityMapsWithCurrentNames,
      idByUniversalIdentifierByMetadataName,
    } = computerosterStandardApplicationAllFlatEntityMaps(
      computerosterStandardApplicationAllFlatEntityMapsArgs,
    );

    return {
      idByUniversalIdentifierByMetadataName,
      allFlatEntityMaps: {
        ...allFlatEntityMapsWithCurrentNames,
        flatObjectMetadataMaps: transformEachFlatEntityInFlatEntityMaps({
          flatEntityMaps:
            allFlatEntityMapsWithCurrentNames.flatObjectMetadataMaps,
          transformFlatEntity: applyLegacyAgentChatNamesToFlatObjectMetadata,
        }),
        flatFieldMetadataMaps: transformEachFlatEntityInFlatEntityMaps({
          flatEntityMaps:
            allFlatEntityMapsWithCurrentNames.flatFieldMetadataMaps,
          transformFlatEntity:
            applyLegacyAgentChatNameAndJoinColumnNameToFlatFieldMetadata,
        }),
        flatIndexMaps: transformEachFlatEntityInFlatEntityMaps({
          flatEntityMaps: allFlatEntityMapsWithCurrentNames.flatIndexMaps,
          transformFlatEntity: applyLegacyAgentChatNameToFlatIndexMetadata,
        }),
      },
    };
  };
