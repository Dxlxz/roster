import { type ObjectRecordEvent } from 'roster-shared/database-events';

export type AgentTriggerPayload =
  | {
      type: 'DATABASE_EVENT';
      eventName: string;
      objectNameSingular: string;
      events: ObjectRecordEvent[];
    }
  | {
      type: 'CRON';
      firedAt: string;
    };
