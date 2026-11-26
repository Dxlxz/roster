import { doNotTranslate } from 'roster-shared/i18n';

export const getFindDuplicateRecordsQueryResponseField = (
  objectNameSingular: string,
) => doNotTranslate(`${objectNameSingular}Duplicates`);
