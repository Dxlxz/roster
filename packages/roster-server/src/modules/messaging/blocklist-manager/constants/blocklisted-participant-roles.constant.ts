import { MessageParticipantRole } from 'roster-shared/types';

export const BLOCKLISTED_PARTICIPANT_ROLES = [
  MessageParticipantRole.FROM,
  MessageParticipantRole.TO,
] as const;
