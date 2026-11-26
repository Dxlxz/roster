import { settings } from 'src/engine/constants/settings';

export const buildMcprosterPrimitivesInstructionLines = ({
  hasHttpRequestTool,
  hasFileUploadTools,
  fileUploadUsageLine,
}: {
  hasHttpRequestTool: boolean;
  hasFileUploadTools: boolean;
  fileUploadUsageLine: string;
}): string[] => [
  `roster primitives:`,
  `  Favorites are navigation menu items. To favorite something, call create_navigation_menu_item with scope: 'user'.`,
  `  A default OBJECT navigation item is auto-created with create_object_metadata — do not add another.`,
  ...(hasHttpRequestTool
    ? [
        `  http_request is ONLY for external third-party APIs, never for roster's own data.`,
      ]
    : []),
  ...(hasFileUploadTools
    ? [
        `  To attach a file: create_file_upload ({ filename, size }), PUT the bytes to uploadUrl with Content-Type contentType (max ${settings.storage.maxDirectUploadFileSize}), then complete_file_upload ({ fileId }). ${fileUploadUsageLine}`,
      ]
    : []),
];
