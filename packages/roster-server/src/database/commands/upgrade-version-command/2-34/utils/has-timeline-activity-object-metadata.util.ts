import { STANDARD_OBJECTS } from 'roster-shared/metadata';
import { isDefined } from 'roster-shared/utils';

export const hasTimelineActivityObjectMetadata = ({
  byUniversalIdentifier,
}: {
  byUniversalIdentifier: Partial<Record<string, unknown>>;
}): boolean =>
  isDefined(
    byUniversalIdentifier[
      STANDARD_OBJECTS.timelineActivity.universalIdentifier
    ],
  );
