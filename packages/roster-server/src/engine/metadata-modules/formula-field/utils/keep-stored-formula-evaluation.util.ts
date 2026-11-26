import { type FieldMetadataFormula } from 'roster-shared/types';

// A missing evaluation means QUERY_TIME
export const keepStoredFormulaEvaluation = (
  evaluation: FieldMetadataFormula['evaluation'],
): Pick<FieldMetadataFormula, 'evaluation'> =>
  evaluation === 'STORED' ? { evaluation } : {};
