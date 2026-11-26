import { normalizeDomain } from '@/utils/url/normalizeDomain';

describe('normalizeDomain', () => {
  it.each([
    'roster.dev',
    'roster.dev',
    'www.roster.dev',
    'https://roster.dev',
    'https://www.roster.dev/',
    'http://www.roster.dev/careers?utm=1#team',
    '  https://roster.dev  ',
    'roster.dev.',
    'roster.dev:8080',
    'https://user:secret@www.roster.dev',
    'ftp://roster.dev',
  ])('should reduce %s to the bare domain', (rawDomain) => {
    expect(normalizeDomain(rawDomain)).toBe('roster.dev');
  });

  it('should keep subdomains other than www', () => {
    expect(normalizeDomain('https://blog.roster.dev')).toBe('blog.roster.dev');
  });

  it('should fold an internationalized domain onto its punycode spelling', () => {
    expect(normalizeDomain('münchen.de')).toBe('xn--mnchen-3ya.de');
    expect(normalizeDomain('https://München.de')).toBe('xn--mnchen-3ya.de');
    expect(normalizeDomain('xn--mnchen-3ya.de')).toBe('xn--mnchen-3ya.de');
  });

  it('should read a backslash as a path separator, like a browser does', () => {
    expect(normalizeDomain('roster.dev\\@evil.com')).toBe('roster.dev');
    expect(normalizeDomain('https://roster.dev\\evil.com/x')).toBe(
      'roster.dev',
    );
  });

  it('should drop every user info segment', () => {
    expect(normalizeDomain('https://a@b@roster.dev')).toBe('roster.dev');
  });

  it('should strip every repeated www label and trailing dot in one pass', () => {
    expect(normalizeDomain('www.www.roster.dev')).toBe('roster.dev');
    expect(normalizeDomain('roster.dev..')).toBe('roster.dev');
  });

  it.each([
    'roster.dev',
    'https://www.roster.dev/careers?x=1',
    'www.www.roster.dev',
    'roster.dev..',
    'münchen.de',
    'not a domain',
    '',
  ])('should already be normalized after one pass for %s', (rawDomain) => {
    const normalized = normalizeDomain(rawDomain);

    expect(normalizeDomain(normalized)).toBe(normalized);
  });

  it('should return an empty string for an empty value', () => {
    expect(normalizeDomain('')).toBe('');
  });

  it('should hand back something unparseable rather than throwing', () => {
    expect(normalizeDomain('not a domain')).toBe('not a domain');
  });
});
