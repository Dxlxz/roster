import { getDomainNamesFromLinks } from 'src/modules/contact-creation-manager/utils/get-domain-names-from-links.util';

describe('getDomainNamesFromLinks', () => {
  it('should return the primary domain and every secondary domain', () => {
    expect(
      getDomainNamesFromLinks({
        primaryLinkLabel: '',
        primaryLinkUrl: 'roster.dev',
        secondaryLinks: [
          { url: 'roster-crm.com', label: '' },
          { url: 'crm.dev', label: '' },
        ],
      }),
    ).toEqual(['roster.dev', 'roster-crm.com', 'crm.dev']);
  });

  it('should ignore links without url', () => {
    expect(
      getDomainNamesFromLinks({
        primaryLinkLabel: '',
        primaryLinkUrl: '',
        secondaryLinks: [{ url: '', label: 'Old domain' }],
      }),
    ).toEqual([]);
  });

  it('should return an empty list when the company has no domain name', () => {
    expect(getDomainNamesFromLinks(null)).toEqual([]);
  });
});
