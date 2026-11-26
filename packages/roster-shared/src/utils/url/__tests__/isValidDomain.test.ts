import { isValidDomain } from '@/utils/url/isValidDomain';

describe('isValidDomain', () => {
  it.each([
    'roster.dev',
    'https://www.roster.dev/careers?x=1',
    'blog.roster.dev',
    'roster.co.uk',
    'münchen.de',
    'roster.dev.',
    'roster.dev:8080',
  ])('should accept %s', (rawDomain) => {
    expect(isValidDomain(rawDomain)).toBe(true);
  });

  it.each([
    'not a domain',
    'roster',
    'javascript:alert(1)',
    '<script>',
    'localhost',
    '192.168.1.1',
    '',
  ])('should reject %s', (rawDomain) => {
    expect(isValidDomain(rawDomain)).toBe(false);
  });

  it('should judge a backslash host the way a browser reads it', () => {
    expect(isValidDomain('roster.dev\\@evil.com')).toBe(true);
    expect(isValidDomain('roster.dev\\@not a domain')).toBe(true);
  });
});
