import { STANDARD_OBJECTS } from 'roster-shared/metadata';
import { isDefined } from 'roster-shared/utils';

import { type rosterStandardAllFlatEntityMaps } from 'src/engine/workspace-manager/roster-standard-application/types/roster-standard-all-flat-entity-maps.type';

const CAMPAIGN_SENDING_OBJECT_UNIVERSAL_IDENTIFIERS: string[] = [
  STANDARD_OBJECTS.campaignDelivery.universalIdentifier,
  STANDARD_OBJECTS.messageSuppression.universalIdentifier,
];

export const collectCampaignSendingStandardUniversalIdentifiers = ({
  standardAllFlatEntityMaps,
}: {
  standardAllFlatEntityMaps: rosterStandardAllFlatEntityMaps;
}): { objectMetadata: string[]; fieldMetadata: string[]; index: string[] } => {
  const belongsToCampaignSendingObject = ({
    objectMetadataUniversalIdentifier,
  }: {
    objectMetadataUniversalIdentifier: string;
  }) =>
    CAMPAIGN_SENDING_OBJECT_UNIVERSAL_IDENTIFIERS.includes(
      objectMetadataUniversalIdentifier,
    );

  const fieldMetadata = Object.values(
    standardAllFlatEntityMaps.flatFieldMetadataMaps.byUniversalIdentifier,
  )
    .filter(isDefined)
    .filter(belongsToCampaignSendingObject)
    .map((flatFieldMetadata) => flatFieldMetadata.universalIdentifier);

  const index = Object.values(
    standardAllFlatEntityMaps.flatIndexMaps.byUniversalIdentifier,
  )
    .filter(isDefined)
    .filter(belongsToCampaignSendingObject)
    .map((flatIndexMetadata) => flatIndexMetadata.universalIdentifier);

  return {
    objectMetadata: CAMPAIGN_SENDING_OBJECT_UNIVERSAL_IDENTIFIERS,
    fieldMetadata,
    index,
  };
};
