import { type CallRecorderStyle } from 'src/logic-functions/types/call-recorder-style.type';

export const CAMERA_TILE_PREVIEW_ASSET_PATHS: Record<
  CallRecorderStyle,
  string
> = {
  roster: 'camera-tile/previews/roster.jpg',
  WORKSPACE: 'camera-tile/previews/workspace.jpg',
  MINIMAL: 'camera-tile/previews/minimal.jpg',
  NONE: 'camera-tile/previews/none.jpg',
};
