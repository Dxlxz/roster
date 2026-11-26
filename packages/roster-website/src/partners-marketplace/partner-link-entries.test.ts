import { collectPartnerLinkUrls } from './collect-partner-link-urls';
import { collectPartnerLinks } from './collect-partner-links';
import { formatPartnerLinkLabel } from './format-partner-link-label';

describe('formatPartnerLinkLabel', () => {
  it('shows the hostname for a website URL', () => {
    expect(formatPartnerLinkLabel('https://www.agency-roster.dev')).toBe(
      'agency-roster.dev',
    );
  });

  it('includes a path when present', () => {
    expect(
      formatPartnerLinkLabel('https://linkedin.com/company/atelier-sigma'),
    ).toBe('linkedin.com/company/atelier-sigma');
  });
});

describe('collectPartnerLinks', () => {
  it('returns website before social links and dedupes identical URLs', () => {
    expect(
      collectPartnerLinks({
        website: 'https://agency-roster.dev',
        linkedin: 'https://linkedin.com/company/acme',
        x: 'https://x.com/acme',
        github: 'https://agency-roster.dev',
      }),
    ).toEqual([
      {
        href: 'https://agency-roster.dev',
        label: 'agency-roster.dev',
      },
      {
        href: 'https://linkedin.com/company/acme',
        label: 'linkedin.com/company/acme',
      },
      {
        href: 'https://x.com/acme',
        label: 'x.com/acme',
      },
    ]);
  });
});

describe('collectPartnerLinkUrls', () => {
  it('preserves API order and dedupes identical URLs', () => {
    expect(
      collectPartnerLinkUrls([
        'https://agency-roster.dev',
        'https://github.com/acme',
        'https://agency-roster.dev',
      ]),
    ).toEqual([
      { href: 'https://agency-roster.dev', label: 'agency-roster.dev' },
      { href: 'https://github.com/acme', label: 'github.com/acme' },
    ]);
  });
});
