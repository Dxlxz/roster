import { StandardObjectNameSingular } from 'roster-shared/types';
import { type TipTapNode } from 'roster-shared/utils';

export const isAiChatParticipantMentionAttributes = (
  attributes: TipTapNode['attrs'],
): boolean =>
  attributes?.objectNameSingular ===
    StandardObjectNameSingular.WorkspaceMember &&
  attributes?.shouldAddAsParticipant === true;
