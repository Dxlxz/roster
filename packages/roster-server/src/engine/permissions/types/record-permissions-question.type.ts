import { type ObjectRecordsOperationType } from 'roster-shared/types';

import { type PermissionsPrincipalsWithRolesContext } from 'src/engine/permissions/principal/types/permissions-principals-with-roles-context.type';

export type ObjectQuestion = {
  principals: PermissionsPrincipalsWithRolesContext | undefined;
  objectMetadataId: string;
};

export type ObjectOperationQuestion = ObjectQuestion & {
  operationType: ObjectRecordsOperationType;
};
