import { isReservedEnvVariableName } from 'src/engine/core-modules/logic-function/logic-function-executor/utils/is-reserved-env-variable-name.util';

describe('isReservedEnvVariableName', () => {
  it.each([
    'roster_API_URL',
    'APPLICATION_ID',
    'roster_FUTURE_VARIABLE',
    'roster_',
  ])('should reserve %s', (name) => {
    expect(isReservedEnvVariableName(name)).toBe(true);
  });

  it.each(['APP_API_KEY', 'roster_api_url', 'MY_roster_VARIABLE', 'roster'])(
    'should not reserve %s',
    (name) => {
      expect(isReservedEnvVariableName(name)).toBe(false);
    },
  );
});
