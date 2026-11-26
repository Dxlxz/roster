import { isOAuthResourceServedByOrigins } from 'src/engine/core-modules/application/application-oauth/utils/is-oauth-resource-served-by-origins.util';

const ORIGINS = ['https://api.roster.dev', 'https://acme.roster.dev/'];

describe('isOAuthResourceServedByOrigins', () => {
  it.each([
    'https://api.roster.dev',
    'https://api.roster.dev/',
    'https://api.roster.dev/mcp',
    'https://acme.roster.dev/mcp/',
  ])('should accept %s', (resource) => {
    expect(isOAuthResourceServedByOrigins({ resource, origins: ORIGINS })).toBe(
      true,
    );
  });

  it.each([
    'https://evil.example.com/mcp',
    'https://api.roster.dev.evil.example.com/mcp',
    'http://api.roster.dev/mcp',
    'https://api.roster.dev:8443/mcp',
    'https://api.roster.dev/mcp/other',
    'https://api.roster.dev/rest',
    'https://api.roster.dev/mcp?server=evil',
    'https://api.roster.dev/mcp#fragment',
    'https://user@api.roster.dev/mcp',
    'api.roster.dev/mcp',
    '',
  ])('should refuse %s', (resource) => {
    expect(isOAuthResourceServedByOrigins({ resource, origins: ORIGINS })).toBe(
      false,
    );
  });
});
