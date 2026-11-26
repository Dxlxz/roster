import { getUniqueHttpOriginsFromUrls } from '../getUniqueHttpOriginsFromUrls';

describe('getUniqueHttpOriginsFromUrls', () => {
  it('should reduce urls to their origins', () => {
    expect(
      getUniqueHttpOriginsFromUrls([
        'https://api.roster.test/graphql',
        'http://functions.roster.test/base/path',
      ]),
    ).toEqual(['https://api.roster.test', 'http://functions.roster.test']);
  });

  it('should deduplicate identical origins', () => {
    expect(
      getUniqueHttpOriginsFromUrls([
        'https://api.roster.test/graphql',
        'https://api.roster.test/rest/front-components/id',
      ]),
    ).toEqual(['https://api.roster.test']);
  });

  it('should drop undefined urls', () => {
    expect(
      getUniqueHttpOriginsFromUrls([undefined, 'https://api.roster.test']),
    ).toEqual(['https://api.roster.test']);
  });

  it('should drop malformed urls', () => {
    expect(
      getUniqueHttpOriginsFromUrls(['not a url', 'https://api.roster.test']),
    ).toEqual(['https://api.roster.test']);
  });

  it('should drop urls with non http schemes', () => {
    expect(
      getUniqueHttpOriginsFromUrls([
        'data:text/html,<script>alert(1)</script>',
        'file:///etc/passwd',
        'blob:https://api.roster.test/id',
        'https://api.roster.test',
      ]),
    ).toEqual(['https://api.roster.test']);
  });
});
