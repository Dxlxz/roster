import { emailSchema } from 'roster-shared/utils';

export const isValidEmailRecipientAddress = (address: string): boolean =>
  emailSchema.safeParse(address).success;
