import { type EachTestingContext } from 'roster-shared/testing';

import { getCompanyNameFromDomainName } from 'src/modules/contact-creation-manager/utils/get-company-name-from-domain-name.util';

type GetCompanyNameFromDomainNameTestCase = EachTestingContext<{
  input: string;
  expected: string;
}>;

describe('getCompanyNameFromDomainName', () => {
  const testCases: GetCompanyNameFromDomainNameTestCase[] = [
    {
      title: 'should extract and capitalize company name from simple domain',
      context: {
        input: 'roster.dev',
        expected: 'roster',
      },
    },
    {
      title: 'should extract and capitalize company name from subdomain',
      context: {
        input: 'app.roster.dev',
        expected: 'roster',
      },
    },
    {
      title:
        'should extract and capitalize company name from multiple subdomains',
      context: {
        input: 'test.app.roster.dev',
        expected: 'roster',
      },
    },
    {
      title: 'should handle domain with multiple parts',
      context: {
        input: 'roster.co.uk',
        expected: 'roster',
      },
    },
    {
      title: 'should handle empty string',
      context: {
        input: '',
        expected: '',
      },
    },
    {
      title: 'should handle invalid domain',
      context: {
        input: 'not-a-valid-domain',
        expected: '',
      },
    },
  ];

  test.each(testCases)('$title', ({ context: { input, expected } }) => {
    expect(getCompanyNameFromDomainName(input)).toBe(expected);
  });
});
