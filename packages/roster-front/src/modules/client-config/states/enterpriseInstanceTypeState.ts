import { createAtomState } from '@/ui/utilities/state/jotai/utils/createAtomState';
import {
  ENTERPRISE_INSTANCE_TYPE,
  type EnterpriseInstanceType,
} from 'roster-shared/constants';

export const enterpriseInstanceTypeState =
  createAtomState<EnterpriseInstanceType>({
    key: 'enterpriseInstanceTypeState',
    defaultValue: ENTERPRISE_INSTANCE_TYPE.PRODUCTION,
  });
