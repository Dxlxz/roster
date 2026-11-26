import { type IframeMediaPermission } from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';

export const isIframeMediaPermissionCovered = ({
  permission,
  coveringPermission,
}: {
  permission: IframeMediaPermission;
  coveringPermission: IframeMediaPermission | null;
}): boolean =>
  isDefined(coveringPermission) &&
  coveringPermission.origin === permission.origin &&
  (!permission.microphone || coveringPermission.microphone) &&
  (!permission.camera || coveringPermission.camera);
