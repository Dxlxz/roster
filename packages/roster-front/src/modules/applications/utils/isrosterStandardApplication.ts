import { roster_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER } from 'roster-shared/application';
import { isDefined } from 'roster-shared/utils';

type ApplicationLike = {
  universalIdentifier?: string | null;
};

export const isrosterStandardApplication = (
  application: ApplicationLike | null | undefined,
): boolean =>
  isDefined(application?.universalIdentifier) &&
  application.universalIdentifier ===
    roster_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER;
