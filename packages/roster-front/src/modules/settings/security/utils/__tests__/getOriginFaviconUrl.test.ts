import { getOriginFaviconUrl } from '@/settings/security/utils/getOriginFaviconUrl';

describe('getOriginFaviconUrl', () => {
  it('looks up the favicon of a public website', () => {
    expect(
      getOriginFaviconUrl({
        origin: 'https://meet.example.com',
        allowRequestsTorosterIcons: true,
      }),
    ).toBe('https://roster-icons.com/meet.example.com');
  });

  it('drops the port from the looked up domain', () => {
    expect(
      getOriginFaviconUrl({
        origin: 'https://meet.example.com:8443',
        allowRequestsTorosterIcons: true,
      }),
    ).toBe('https://roster-icons.com/meet.example.com');
  });

  it.each([
    'https://portal.corp.lan',
    'https://nas.home.arpa',
    'https://intranet',
    'http://localhost:3000',
    'http://192.168.1.10',
  ])('keeps the private host %s off roster-icons', (origin) => {
    expect(
      getOriginFaviconUrl({ origin, allowRequestsTorosterIcons: true }),
    ).toBeUndefined();
  });

  it('skips every lookup when the instance turns roster-icons off', () => {
    expect(
      getOriginFaviconUrl({
        origin: 'https://meet.example.com',
        allowRequestsTorosterIcons: false,
      }),
    ).toBeUndefined();
  });
});
