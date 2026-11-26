import { type AgentResponseFieldType } from 'roster-shared/ai';

export type OutputSchemaField = {
  id: string;
  name: string;
  description?: string;
  type: AgentResponseFieldType | undefined;
};
