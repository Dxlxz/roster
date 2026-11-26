import { roster_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER } from 'roster-shared/application';
import { FileFolder } from 'roster-shared/types';

export const buildWorkspaceDataExportFolder = ({
  workspaceId,
  exportId,
  folder,
}: {
  workspaceId: string;
  exportId: string;
  folder: 'export' | 'parts';
}) => ({
  workspaceId,
  applicationUniversalIdentifier:
    roster_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER,
  fileFolder: FileFolder.WorkspaceDataExport,
  folderPath: folder === 'parts' ? `${exportId}/parts` : exportId,
});
