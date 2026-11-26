/* @license Enterprise */

import { type RecordShareAccessLevel } from 'roster-shared/types';

export type ShareWithInput = {
  workspaceMemberId?: string;
  roleId?: string;
  everyone?: boolean;
  accessLevel: RecordShareAccessLevel;
};
