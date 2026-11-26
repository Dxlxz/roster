import { absoluteUrlSchema, isValidDomain } from 'roster-shared/utils';

export const validateLinkInput = ({
  input,
  isDomainField,
}: {
  input: string;
  isDomainField: boolean;
}) => ({
  isValid: isDomainField
    ? isValidDomain(input)
    : absoluteUrlSchema.safeParse(input).success,
  errorMessage: '',
});
