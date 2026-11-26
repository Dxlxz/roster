import { APPLICATION_SOURCE_FILE_EXTENSIONS } from 'roster-shared/application';
import { FileFolder, type ServerFileFolder } from 'roster-shared/types';

export const ALLOWED_EXTENSIONS_BY_APPLICATION_FILE_FOLDER: Partial<
  Record<FileFolder | ServerFileFolder, Readonly<Record<string, true>>>
> = {
  [FileFolder.BuiltLogicFunction]: { '.mjs': true },
  [FileFolder.BuiltFrontComponent]: { '.mjs': true },
  [FileFolder.Source]: Object.fromEntries(
    APPLICATION_SOURCE_FILE_EXTENSIONS.map((extension): [string, true] => [
      extension,
      true,
    ]),
  ),
  [FileFolder.Dependencies]: { '.json': true, '.lock': true, '.gz': true },
};
