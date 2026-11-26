import { getApplicationVariable } from 'roster-sdk/front-component';

export const getApplicationVariableValue = (variableKey: string): string =>
  getApplicationVariable(variableKey) ?? '';
