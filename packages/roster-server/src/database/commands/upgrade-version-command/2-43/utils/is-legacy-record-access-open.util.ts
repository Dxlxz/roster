import { STANDARD_OBJECTS } from 'roster-shared/metadata';
import { MetadataReadability } from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';

export const isLegacyRecordAccessOpen = ({
  flatObjectMetadataMaps,
  wasRecordSharingEnabled,
}: {
  flatObjectMetadataMaps: {
    byUniversalIdentifier: Record<
      string,
      { readability: MetadataReadability } | undefined
    >;
  };
  wasRecordSharingEnabled: boolean;
}): boolean => {
  const thread =
    flatObjectMetadataMaps.byUniversalIdentifier[
      STANDARD_OBJECTS.agentChatThread.universalIdentifier
    ];
  // Missing or SYSTEM metadata has not passed the compatibility backfill yet.
  return (
    (!isDefined(thread) || thread.readability === MetadataReadability.SYSTEM) &&
    !wasRecordSharingEnabled
  );
};
