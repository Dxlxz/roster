import base from './jest.config.mjs';

export default {
  ...base,
  moduleNameMapper: {
    '^roster-shared/(.*)$': '<rootDir>/../roster-shared/src/$1',
    '^@/(.*)$': '<rootDir>/../roster-shared/src/$1',
    ...base.moduleNameMapper,
  },
};
