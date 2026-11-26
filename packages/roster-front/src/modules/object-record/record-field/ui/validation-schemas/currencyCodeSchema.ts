import { z } from 'zod';

import { CurrencyCode } from 'roster-shared/constants';

export const currencyCodeSchema = z.enum(CurrencyCode);
