import { escapeRedisGlob } from 'src/engine/core-modules/cache-storage/utils/escape-redis-glob.util';

describe('escapeRedisGlob', () => {
  it.each([
    ['', ''],
    ['{roster-cache}:engine:workspace:', '{roster-cache}:engine:workspace:'],
    ['{roster[prod]}', '{roster\\[prod\\]}'],
    ['{roster*}', '{roster\\*}'],
    ['{roster?}', '{roster\\?}'],
    ['{roster\\prod}', '{roster\\\\prod}'],
    ['{roster]prod}', '{roster\\]prod}'],
  ])('escapes %s as literal Redis glob text', (value, expected) => {
    expect(escapeRedisGlob(value)).toBe(expected);
  });
});
