import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Test } from '@nestjs/testing';

import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { CloudflareSecretMatchGuard } from 'src/engine/core-modules/cloudflare/guards/cloudflare-secret.guard';

const buildMockContext = (headers: Record<string, unknown>) =>
  new ExecutionContextHost([{ headers }]);

describe('CloudflareSecretMatchGuard.canActivate', () => {
  let guard: CloudflareSecretMatchGuard;
  let rosterConfigService: rosterConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CloudflareSecretMatchGuard,
        { provide: rosterConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    guard = module.get(CloudflareSecretMatchGuard);
    rosterConfigService = module.get(rosterConfigService);
  });

  it('should return true when the webhook secret matches', () => {
    jest.spyOn(rosterConfigService, 'get').mockReturnValue('valid-secret');

    const context = buildMockContext({
      'cf-webhook-auth': 'valid-secret',
    });

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw InternalServerErrorException when env is not set', () => {
    jest.spyOn(rosterConfigService, 'get').mockReturnValue(undefined);

    const context = buildMockContext({
      'cf-webhook-auth': 'any-value',
    });

    expect(() => guard.canActivate(context)).toThrow(
      'CLOUDFLARE_WEBHOOK_SECRET is not configured',
    );
  });

  it('should return false when the header is missing', () => {
    jest.spyOn(rosterConfigService, 'get').mockReturnValue('valid-secret');

    const context = buildMockContext({});

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return false when the header value is wrong', () => {
    jest.spyOn(rosterConfigService, 'get').mockReturnValue('valid-secret');

    const context = buildMockContext({
      'cf-webhook-auth': 'wrong-secret',
    });

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return false when the header is an empty string', () => {
    jest.spyOn(rosterConfigService, 'get').mockReturnValue('valid-secret');

    const context = buildMockContext({
      'cf-webhook-auth': '',
    });

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return false when header length differs from secret', () => {
    jest.spyOn(rosterConfigService, 'get').mockReturnValue('short');

    const context = buildMockContext({
      'cf-webhook-auth': 'much-longer-value',
    });

    expect(guard.canActivate(context)).toBe(false);
  });
});
