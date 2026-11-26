import { type FieldMetadataType } from 'roster-shared/types';

export type FormulaSqlColumn = {
  columnName: string;
  columnFieldMetadataType: FieldMetadataType;
  fieldUniversalIdentifier: string;
};
