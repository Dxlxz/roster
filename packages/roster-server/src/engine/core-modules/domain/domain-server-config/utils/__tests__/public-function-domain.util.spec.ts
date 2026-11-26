import {
  getHostnameFromUrlOrUndefined,
  isHostUnderPublicFunctionDomain,
} from 'src/engine/core-modules/domain/domain-server-config/utils/public-function-domain.util';

describe('getHostnameFromUrlOrUndefined', () => {
  it('returns the lowercased hostname of a valid url', () => {
    expect(getHostnameFromUrlOrUndefined('https://Withroster.com')).toBe(
      'withroster.dev',
    );
  });

  it('ignores the path and port', () => {
    expect(
      getHostnameFromUrlOrUndefined('https://withroster.dev:8080/ignored'),
    ).toBe('withroster.dev');
  });

  it('returns undefined for empty/nullish input', () => {
    expect(getHostnameFromUrlOrUndefined(undefined)).toBeUndefined();
    expect(getHostnameFromUrlOrUndefined(null)).toBeUndefined();
    expect(getHostnameFromUrlOrUndefined('')).toBeUndefined();
  });

  it('returns undefined for a non-url string', () => {
    expect(getHostnameFromUrlOrUndefined('not a url')).toBeUndefined();
  });
});

describe('isHostUnderPublicFunctionDomain', () => {
  const publicDomainBaseHostname = 'withroster.dev';

  it('matches a strict subdomain of the base', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'acme.withroster.dev',
        publicDomainBaseHostname,
      }),
    ).toBe(true);
  });

  it('matches deeper subdomains', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'app.acme.withroster.dev',
        publicDomainBaseHostname,
      }),
    ).toBe(true);
  });

  it('is case-insensitive and strips the port', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'ACME.Withroster.com:443',
        publicDomainBaseHostname,
      }),
    ).toBe(true);
  });

  it('does not match the apex base itself', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'withroster.dev',
        publicDomainBaseHostname,
      }),
    ).toBe(false);
  });

  it('does not match the main app domain', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'acme.roster.dev',
        publicDomainBaseHostname,
      }),
    ).toBe(false);
  });

  it('does not match a lookalike suffix', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'evilwithroster.dev',
        publicDomainBaseHostname,
      }),
    ).toBe(false);
  });

  it('returns false when no base is configured', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'acme.withroster.dev',
        publicDomainBaseHostname: undefined,
      }),
    ).toBe(false);
  });

  it('returns false when host is missing', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: undefined,
        publicDomainBaseHostname,
      }),
    ).toBe(false);
  });
});
