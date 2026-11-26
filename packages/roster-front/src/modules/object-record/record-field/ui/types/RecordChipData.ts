import { type AvatarShape } from 'roster-ui/primitives/data-display';
export type RecordChipData = {
  recordId: string;
  name: string;
  avatarShape: AvatarShape;
  avatarUrl: string;
  isLabelIdentifier: boolean;
  objectNameSingular: string;
};
