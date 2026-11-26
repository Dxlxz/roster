import { type MediaAccessOwner } from '@/media-access/types/MediaAccessOwner';
import { type IframeMediaPermission } from 'roster-shared/types';
import { createRequiredContext } from '~/utils/createRequiredContext';

export const [
  FrontComponentIframeOwnerProvider,
  useFrontComponentIframeOwnerOrThrow,
] = createRequiredContext<{
  owner: MediaAccessOwner;
  iframeMediaPermissions: readonly IframeMediaPermission[];
}>('FrontComponentIframeOwner');
