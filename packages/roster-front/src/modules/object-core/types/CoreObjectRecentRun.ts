import { type TagColor } from 'roster-ui/primitives/data-display';

export type CoreObjectRecentRun = {
  id: string;
  createdAt: string;
  statusLabel: string;
  statusColor: TagColor;
};
