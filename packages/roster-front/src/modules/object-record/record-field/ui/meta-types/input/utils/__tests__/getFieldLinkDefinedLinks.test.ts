import { getFieldLinkDefinedLinks } from '@/object-record/record-field/ui/meta-types/input/utils/getFieldLinkDefinedLinks';

describe('getFieldLinkDefinedLinks', () => {
  describe('Field value', () => {
    it('should return an empty array if fieldValue is undefined', () => {
      const result = getFieldLinkDefinedLinks(undefined);
      expect(result).toEqual([]);
    });

    it('should return an empty array if fieldValue is null', () => {
      const result = getFieldLinkDefinedLinks(null);
      expect(result).toEqual([]);
    });
  });

  describe('Primary link', () => {
    it('should not return primary link when primaryLinkUrl is null', () => {
      expect(
        getFieldLinkDefinedLinks({
          primaryLinkUrl: null,
          primaryLinkLabel: 'roster',
          secondaryLinks: [],
        }),
      ).toEqual([]);
    });

    it('should not return primary link when primaryLinkUrl is empty string', () => {
      expect(
        getFieldLinkDefinedLinks({
          primaryLinkUrl: '',
          primaryLinkLabel: 'roster',
          secondaryLinks: [],
        }),
      ).toEqual([]);
    });

    it('should return primary link when primaryLinkUrl is defined but primaryLinkLabel is null', () => {
      expect(
        getFieldLinkDefinedLinks({
          primaryLinkUrl: 'https://roster.dev',
          primaryLinkLabel: null,
          secondaryLinks: [],
        }),
      ).toEqual([
        {
          url: 'https://roster.dev',
          label: null,
        },
      ]);
    });
  });

  describe('Secondary links', () => {
    it('should handle null secondaryLinks', () => {
      expect(
        getFieldLinkDefinedLinks({
          primaryLinkUrl: '',
          primaryLinkLabel: '',
          secondaryLinks: null,
        }),
      ).toEqual([]);
    });

    it('should filter out secondary links with null url', () => {
      expect(
        getFieldLinkDefinedLinks({
          primaryLinkUrl: '',
          primaryLinkLabel: '',
          secondaryLinks: [
            {
              url: null,
              label: 'roster',
            },
            {
              url: 'https://docs.roster.dev',
              label: 'Documentation',
            },
          ],
        }),
      ).toEqual([
        {
          url: 'https://docs.roster.dev',
          label: 'Documentation',
        },
      ]);
    });

    it('should filter out secondary links with empty url', () => {
      expect(
        getFieldLinkDefinedLinks({
          primaryLinkUrl: '',
          primaryLinkLabel: '',
          secondaryLinks: [
            {
              url: '',
              label: 'roster',
            },
            {
              url: 'https://docs.roster.dev',
              label: 'Documentation',
            },
          ],
        }),
      ).toEqual([
        {
          url: 'https://docs.roster.dev',
          label: 'Documentation',
        },
      ]);
    });

    it('should keep secondary links with null label if url is defined', () => {
      expect(
        getFieldLinkDefinedLinks({
          primaryLinkUrl: '',
          primaryLinkLabel: '',
          secondaryLinks: [
            {
              url: 'https://roster.dev',
              label: null,
            },
          ],
        }),
      ).toEqual([
        {
          url: 'https://roster.dev',
          label: null,
        },
      ]);
    });

    it('should correctly combine primary and secondary links with edge cases', () => {
      expect(
        getFieldLinkDefinedLinks({
          primaryLinkUrl: 'https://roster.dev',
          primaryLinkLabel: null,
          secondaryLinks: [
            {
              url: '',
              label: 'Invalid Link',
            },
            {
              url: 'https://docs.roster.dev',
              label: null,
            },
            {
              url: null,
              label: 'Another Invalid Link',
            },
          ],
        }),
      ).toEqual([
        {
          url: 'https://roster.dev',
          label: null,
        },
        {
          url: 'https://docs.roster.dev',
          label: null,
        },
      ]);
    });

    it('should handle empty secondaryLinks array', () => {
      expect(
        getFieldLinkDefinedLinks({
          primaryLinkUrl: '',
          primaryLinkLabel: '',
          secondaryLinks: [],
        }),
      ).toEqual([]);
    });

    it('should filter out secondary links and primary link with invalid URLs', () => {
      expect(
        getFieldLinkDefinedLinks({
          primaryLinkUrl: 'lydia,com',
          primaryLinkLabel: 'Invalid Primary',
          secondaryLinks: [
            {
              url: 'lydia,com',
              label: 'Invalid URL',
            },
            {
              url: 'wikipedia',
              label: 'Missing Protocol',
            },
            {
              url: 'https://roster.dev',
              label: 'Valid URL',
            },
          ],
        }),
      ).toEqual([
        {
          url: 'https://roster.dev',
          label: 'Valid URL',
        },
      ]);
    });
  });
});
