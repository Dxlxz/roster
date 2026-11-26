import { isValidrosterSubdomain } from '@/utils/validation/isValidrosterSubdomain';

describe('isValidrosterSubdomain', () => {
  describe('valid subdomains', () => {
    it('should accept standard alphanumeric subdomains', () => {
      expect(isValidrosterSubdomain('abc')).toBe(true);
      expect(isValidrosterSubdomain('test123')).toBe(true);
      expect(isValidrosterSubdomain('company1')).toBe(true);
      expect(isValidrosterSubdomain('workspace2024')).toBe(true);
    });

    it('should accept subdomains with hyphens in the middle', () => {
      expect(isValidrosterSubdomain('my-company')).toBe(true);
      expect(isValidrosterSubdomain('test-workspace')).toBe(true);
      expect(isValidrosterSubdomain('multi-word-subdomain')).toBe(true);
      expect(isValidrosterSubdomain('a-b-c-d-e')).toBe(true);
    });

    it('should accept minimum length subdomains (1 character)', () => {
      expect(isValidrosterSubdomain('a')).toBe(true);
      expect(isValidrosterSubdomain('1')).toBe(true);
      expect(isValidrosterSubdomain('ab')).toBe(true);
      expect(isValidrosterSubdomain('a-b')).toBe(true);
    });

    it('should accept maximum length subdomains (30 characters)', () => {
      const exactly30 = 'a' + 'b'.repeat(28) + 'c';

      expect(exactly30.length).toBe(30);
      expect(isValidrosterSubdomain(exactly30)).toBe(true);
    });

    it('should accept numeric-only subdomains', () => {
      expect(isValidrosterSubdomain('123')).toBe(true);
      expect(isValidrosterSubdomain('456789')).toBe(true);
      expect(isValidrosterSubdomain('1-2-3')).toBe(true);
    });
  });

  describe('invalid subdomains', () => {
    it('should reject empty strings', () => {
      expect(isValidrosterSubdomain('')).toBe(false);
    });

    it('should reject subdomains longer than 30 characters', () => {
      const tooLong = 'a'.repeat(31);

      expect(isValidrosterSubdomain(tooLong)).toBe(false);
    });

    it('should reject subdomains starting with a hyphen', () => {
      expect(isValidrosterSubdomain('-test')).toBe(false);
      expect(isValidrosterSubdomain('-abc')).toBe(false);
    });

    it('should reject subdomains ending with a hyphen', () => {
      expect(isValidrosterSubdomain('test-')).toBe(false);
      expect(isValidrosterSubdomain('abc-')).toBe(false);
    });

    it('should reject subdomains with uppercase letters', () => {
      expect(isValidrosterSubdomain('Test')).toBe(false);
      expect(isValidrosterSubdomain('MyCompany')).toBe(false);
      expect(isValidrosterSubdomain('WORKSPACE')).toBe(false);
    });

    it('should reject subdomains with special characters', () => {
      expect(isValidrosterSubdomain('test@company')).toBe(false);
      expect(isValidrosterSubdomain('my_workspace')).toBe(false);
      expect(isValidrosterSubdomain('test.company')).toBe(false);
      expect(isValidrosterSubdomain('workspace#1')).toBe(false);
    });

    it('should reject subdomains with spaces', () => {
      expect(isValidrosterSubdomain('test company')).toBe(false);
      expect(isValidrosterSubdomain(' test')).toBe(false);
      expect(isValidrosterSubdomain('test ')).toBe(false);
    });

    it('should reject subdomains starting with "api-"', () => {
      expect(isValidrosterSubdomain('api-test')).toBe(false);
      expect(isValidrosterSubdomain('api-company')).toBe(false);
      expect(isValidrosterSubdomain('api-123')).toBe(false);
    });

    it('should accept subdomains containing "api" not as prefix', () => {
      expect(isValidrosterSubdomain('myapi')).toBe(true);
      expect(isValidrosterSubdomain('rapid')).toBe(true);
    });

    it('should reject subdomains with only hyphens', () => {
      expect(isValidrosterSubdomain('---')).toBe(false);
      expect(isValidrosterSubdomain('----')).toBe(false);
    });

    it('should reject whitespace-only strings', () => {
      expect(isValidrosterSubdomain('   ')).toBe(false);
      expect(isValidrosterSubdomain('\t')).toBe(false);
      expect(isValidrosterSubdomain('\n')).toBe(false);
    });

    it('should reject unicode characters', () => {
      expect(isValidrosterSubdomain('café')).toBe(false);
      expect(isValidrosterSubdomain('tëst')).toBe(false);
    });
  });
});
