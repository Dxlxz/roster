import { isUsableFileNameSegment } from '@/app/pull/pull-file-base-name';
import { type Manifest } from 'roster-shared/application';

export const getNavigationFolderNameForPullFile = ({
  parentUniversalIdentifier,
  manifest,
}: {
  parentUniversalIdentifier: string;
  manifest: Manifest;
}): string | null => {
  const folderName = manifest.navigationMenuItems?.find(
    (candidate) => candidate.universalIdentifier === parentUniversalIdentifier,
  )?.name;

  return isUsableFileNameSegment(folderName) ? folderName : null;
};
