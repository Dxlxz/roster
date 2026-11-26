import { type FieldMetadataType } from 'roster-shared/types';

export type FormFieldCurrencyInputSettings = {
  type: FieldMetadataType.CURRENCY;
  amountUnit: 'micros' | 'units';
};
