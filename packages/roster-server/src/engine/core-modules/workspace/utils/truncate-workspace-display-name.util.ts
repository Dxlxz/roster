import { WORKSPACE_DISPLAY_NAME_MAX_LENGTH } from 'roster-shared/constants';
import { isDefined } from 'roster-shared/utils';

import { trimAndTruncateToMaxCharacters } from 'src/utils/trim-and-truncate-to-max-characters.util';

export const truncateWorkspaceDisplayName = (
  displayName: string | undefined,
): string | undefined =>
  isDefined(displayName)
    ? trimAndTruncateToMaxCharacters({
        value: displayName,
        maxCharacters: WORKSPACE_DISPLAY_NAME_MAX_LENGTH,
      })
    : undefined;
