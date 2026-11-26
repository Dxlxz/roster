import { pascalCase } from 'roster-shared/utils';

export const computeCompositeFieldEnumTypeKey = (
  fieldMetadataType: string,
  compositePropertyName: string,
): string => {
  return `${pascalCase(fieldMetadataType)}${pascalCase(
    compositePropertyName,
  )}Enum`;
};
