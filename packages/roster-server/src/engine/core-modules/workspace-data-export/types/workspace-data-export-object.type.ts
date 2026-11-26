import { type RecordExportColumn } from 'roster-shared/types';

export type WorkspaceDataExportObject = {
  objectMetadataId: string;
  nameSingular: string;
  labelSingular: string;
  columns: RecordExportColumn[];
  fieldCount: number;
};
