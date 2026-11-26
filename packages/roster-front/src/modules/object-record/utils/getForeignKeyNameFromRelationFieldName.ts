import { doNotTranslate } from 'roster-shared/i18n';

export const getForeignKeyNameFromRelationFieldName = (nameSingular: string) =>
  doNotTranslate(`${nameSingular}Id`);
