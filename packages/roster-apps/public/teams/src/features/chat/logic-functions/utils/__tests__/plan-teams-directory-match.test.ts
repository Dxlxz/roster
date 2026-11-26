import { describe, expect, it } from 'vitest';

import { planTeamsDirectoryMatch } from 'src/features/chat/logic-functions/utils/plan-teams-directory-match';

const ADA = { id: 'aad-ada', displayName: 'Ada', mail: 'Ada@roster.dev' };
const BOB = { id: 'aad-bob', displayName: 'Bob', mail: 'bob@roster.dev' };
const GUEST = {
  id: 'aad-guest',
  displayName: 'Guest',
  mail: 'ada@roster.dev',
  userPrincipalName: 'ada_roster.dev#EXT#@partner.onmicrosoft.com',
};

describe('planTeamsDirectoryMatch', () => {
  it('splits directory users into candidates, already linked and unmatched', () => {
    expect(
      planTeamsDirectoryMatch({
        users: [ADA, BOB, GUEST, { id: 'aad-linked', mail: 'x@roster.dev' }],
        workspaceMemberIdByEmail: new Map([['ada@roster.dev', 'member-ada']]),
        linkedAadObjectIds: new Set(['aad-linked']),
      }),
    ).toEqual({
      candidates: [
        {
          teamsUserAadObjectId: 'aad-ada',
          workspaceMemberId: 'member-ada',
          displayName: 'Ada',
        },
      ],
      alreadyLinkedCount: 1,
      unmatchedCount: 2,
    });
  });
});
