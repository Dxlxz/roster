import { type CurrencyPickerOption } from 'roster-ui/components/input';
import { CURRENCY_CODE_LABELS } from 'roster-shared/constants';

export const CURRENCY_PICKER_CURRENCIES: readonly CurrencyPickerOption[] =
  Object.entries(CURRENCY_CODE_LABELS).map(([code, { label }]) => ({
    code,
    name: label,
  }));
