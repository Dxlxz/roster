import { type CallRecorderStyle } from 'src/logic-functions/types/call-recorder-style.type';

export const CALL_RECORDER_STYLE_OPTIONS: {
  label: string;
  value: CallRecorderStyle;
}[] = [
  { label: 'roster', value: 'roster' },
  { label: 'Workspace', value: 'WORKSPACE' },
  { label: 'Minimal', value: 'MINIMAL' },
  { label: 'None', value: 'NONE' },
];
