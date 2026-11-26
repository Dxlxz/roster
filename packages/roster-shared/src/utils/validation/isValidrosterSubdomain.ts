import { SUBDOMAIN_PATTERN } from '@/constants/SubdomainPattern';

export const isValidrosterSubdomain = (subdomain: string): boolean => {
  return SUBDOMAIN_PATTERN.test(subdomain);
};
