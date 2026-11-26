import { isEmailBlocklisted } from 'src/modules/blocklist/utils/is-email-blocklisted.util';

describe('isEmailBlocklisted', () => {
  it('should return true if email is blocklisted', () => {
    const channelHandles = ['abc@example.com'];
    const email = 'hello@roster.dev';
    const blocklist = ['hello@roster.dev', 'hey@roster.dev'];
    const result = isEmailBlocklisted(channelHandles, email, blocklist);

    expect(result).toBe(true);
  });
  it('should return false if email is not blocklisted', () => {
    const channelHandles = ['abc@example.com'];
    const email = 'hello@roster.dev';
    const blocklist = ['hey@example.com'];
    const result = isEmailBlocklisted(channelHandles, email, blocklist);

    expect(result).toBe(false);
  });
  it('should ignore case when matching a blocklisted email', () => {
    const channelHandles = ['abc@example.com'];
    const email = 'john.doe@acme.com';
    const blocklist = ['John.Doe@Acme.com'];
    const result = isEmailBlocklisted(channelHandles, email, blocklist);

    expect(result).toBe(true);
  });
  it('should ignore case when matching a blocklisted domain', () => {
    const channelHandles = ['abc@example.com'];
    const email = 'John@Acme.com';
    const blocklist = ['@acme.com'];
    const result = isEmailBlocklisted(channelHandles, email, blocklist);

    expect(result).toBe(true);
  });
  it('should ignore case when the email is a channel handle', () => {
    const channelHandles = ['Abc@Example.com'];
    const email = 'abc@example.com';
    const blocklist = ['@example.com'];
    const result = isEmailBlocklisted(channelHandles, email, blocklist);

    expect(result).toBe(false);
  });
  it('should return false if email is null', () => {
    const channelHandles = ['abc@roster.dev'];
    const email = null;
    const blocklist = ['@example.com'];
    const result = isEmailBlocklisted(channelHandles, email, blocklist);

    expect(result).toBe(false);
  });
  it('should return true for subdomains', () => {
    const channelHandles = ['abc@example.com'];
    const email = 'hello@roster.roster.dev';
    const blocklist = ['@roster.dev'];
    const result = isEmailBlocklisted(channelHandles, email, blocklist);

    expect(result).toBe(true);
  });
  it('should return false for domains which end with blocklisted domain but are not subdomains', () => {
    const channelHandles = ['abc@example.com'];
    const email = 'hello@rosterroster.dev';
    const blocklist = ['@roster.dev'];
    const result = isEmailBlocklisted(channelHandles, email, blocklist);

    expect(result).toBe(false);
  });
  it('should return false if email is undefined', () => {
    const channelHandles = ['abc@example.com'];
    const email = undefined;
    const blocklist = ['@roster.dev'];
    const result = isEmailBlocklisted(channelHandles, email, blocklist);

    expect(result).toBe(false);
  });
  it('should return true if email ends with blocklisted domain', () => {
    const channelHandles = ['abc@example.com'];
    const email = 'hello@roster.dev';
    const blocklist = ['@roster.dev'];
    const result = isEmailBlocklisted(channelHandles, email, blocklist);

    expect(result).toBe(true);
  });

  it('should return false if email is same as channel handle', () => {
    const channelHandles = ['hello@roster.dev'];
    const email = 'hello@roster.dev';
    const blocklist = ['@roster.dev'];
    const result = isEmailBlocklisted(channelHandles, email, blocklist);

    expect(result).toBe(false);
  });
});
