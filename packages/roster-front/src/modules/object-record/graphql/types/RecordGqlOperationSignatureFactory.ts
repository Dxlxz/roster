import { type RecordGqlOperationSignature } from 'roster-shared/types';

export type RecordGqlOperationSignatureFactory<FactoryParams extends object> = (
  factoryParams: FactoryParams,
) => RecordGqlOperationSignature;
