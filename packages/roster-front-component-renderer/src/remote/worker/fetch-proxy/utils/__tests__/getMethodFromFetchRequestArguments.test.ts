import { getMethodFromFetchRequestArguments } from '../getMethodFromFetchRequestArguments';

describe('getMethodFromFetchRequestArguments', () => {
  it('should prefer the init method when both init and Request provide one', () => {
    const request = { url: 'https://api.roster.test', method: 'PUT' };

    expect(
      getMethodFromFetchRequestArguments(request, {
        method: 'POST',
      }),
    ).toBe('POST');
  });

  it('should use the Request method when init has no method', () => {
    const request = { url: 'https://api.roster.test', method: 'DELETE' };

    expect(getMethodFromFetchRequestArguments(request, undefined)).toBe(
      'DELETE',
    );
  });

  it('should default to GET when input is a string and init has no method', () => {
    expect(
      getMethodFromFetchRequestArguments('https://api.roster.test', undefined),
    ).toBe('GET');
  });
});
