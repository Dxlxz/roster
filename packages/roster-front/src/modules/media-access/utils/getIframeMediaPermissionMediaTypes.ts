import { type MediaSessionMediaType } from 'roster-front-component-renderer';
import { type IframeMediaPermission } from 'roster-shared/types';

export const getIframeMediaPermissionMediaTypes = (
  permission: Pick<IframeMediaPermission, 'microphone' | 'camera'>,
): MediaSessionMediaType[] => [
  ...(permission.microphone ? (['audio'] as const) : []),
  ...(permission.camera ? (['video'] as const) : []),
];
