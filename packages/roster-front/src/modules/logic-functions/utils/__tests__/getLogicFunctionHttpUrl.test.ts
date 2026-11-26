import {
  getFunctionsBaseUrl,
  getLogicFunctionHttpUrl,
} from '@/logic-functions/utils/getLogicFunctionHttpUrl';

describe('getFunctionsBaseUrl', () => {
  it('builds the isolated base from subdomain + public domain', () => {
    expect(
      getFunctionsBaseUrl({
        serverBaseUrl: 'https://api.roster.dev',
        publicFunctionDomain: 'withroster.dev',
        workspaceSubdomain: 'acme',
      }),
    ).toBe('https://acme.withroster.dev');
  });

  it('falls back to the /s server route when the public domain is missing', () => {
    expect(
      getFunctionsBaseUrl({
        serverBaseUrl: 'https://api.roster.dev',
        publicFunctionDomain: null,
        workspaceSubdomain: 'acme',
      }),
    ).toBe('https://api.roster.dev/s');
  });

  it('falls back to the /s server route when the subdomain is missing', () => {
    expect(
      getFunctionsBaseUrl({
        serverBaseUrl: 'https://api.roster.dev',
        publicFunctionDomain: 'withroster.dev',
        workspaceSubdomain: undefined,
      }),
    ).toBe('https://api.roster.dev/s');
  });
});

describe('getLogicFunctionHttpUrl', () => {
  it('builds the isolated public-domain URL when configured', () => {
    expect(
      getLogicFunctionHttpUrl({
        path: '/webhook/stripe',
        serverBaseUrl: 'https://api.roster.dev',
        publicFunctionDomain: 'withroster.dev',
        workspaceSubdomain: 'acme',
      }),
    ).toBe('https://acme.withroster.dev/webhook/stripe');
  });

  it('normalizes a path that does not start with a slash', () => {
    expect(
      getLogicFunctionHttpUrl({
        path: 'webhook',
        serverBaseUrl: 'https://api.roster.dev',
        publicFunctionDomain: 'withroster.dev',
        workspaceSubdomain: 'acme',
      }),
    ).toBe('https://acme.withroster.dev/webhook');
  });

  it('falls back to the legacy /s/ route when no public domain is configured', () => {
    expect(
      getLogicFunctionHttpUrl({
        path: '/webhook/stripe',
        serverBaseUrl: 'https://api.roster.dev',
        publicFunctionDomain: null,
        workspaceSubdomain: 'acme',
      }),
    ).toBe('https://api.roster.dev/s/webhook/stripe');
  });

  it('falls back to the legacy /s/ route when the workspace has no subdomain', () => {
    expect(
      getLogicFunctionHttpUrl({
        path: '/webhook',
        serverBaseUrl: 'https://api.roster.dev',
        publicFunctionDomain: 'withroster.dev',
        workspaceSubdomain: undefined,
      }),
    ).toBe('https://api.roster.dev/s/webhook');
  });
});
