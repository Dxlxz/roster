import {
  type FilterableAndTSVectorFieldType,
  type RecordFilterOperand,
} from 'roster-shared/types';
import { getFilterOperandsForFilterableFieldType } from 'roster-shared/utils';

export const getRecordFilterOperands = ({
  filterType,
  subFieldName,
}: {
  filterType: FilterableAndTSVectorFieldType;
  subFieldName?: string | null | undefined;
}): readonly RecordFilterOperand[] => {
  return getFilterOperandsForFilterableFieldType({
    filterType,
    subFieldName,
  });
};
