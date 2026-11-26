import { RESERVED_SUBDOMAINS } from 'roster-shared/constants';
import { isValidrosterSubdomain } from 'roster-shared/utils';

export const isSubdomainValid = (subdomain: string) => {
  return (
    isValidrosterSubdomain(subdomain) &&
    !RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase())
  );
};
