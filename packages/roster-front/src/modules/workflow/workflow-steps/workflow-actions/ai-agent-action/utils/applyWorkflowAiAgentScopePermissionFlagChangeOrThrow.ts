import { type AiRunScope } from 'roster-shared/ai';
import { PERMISSION_FLAG_UNIVERSAL_IDENTIFIER_BY_TYPE } from 'roster-shared/constants';
import { doNotTranslate } from 'roster-shared/i18n';
import { CustomError, isDefined } from 'roster-shared/utils';

export const applyWorkflowAiAgentScopePermissionFlagChangeOrThrow = ({
  scope,
  permissionFlagKey,
  isGranted,
}: {
  scope: AiRunScope | undefined;
  permissionFlagKey: string;
  isGranted: boolean;
}): AiRunScope => {
  const universalIdentifier =
    PERMISSION_FLAG_UNIVERSAL_IDENTIFIER_BY_TYPE.get(permissionFlagKey);

  if (!isDefined(universalIdentifier)) {
    throw new CustomError(
      doNotTranslate(`Unknown permission flag ${permissionFlagKey}`),
      'UNKNOWN_PERMISSION_FLAG',
    );
  }

  const otherUniversalIdentifiers = (
    scope?.permissionFlagUniversalIdentifiers ?? []
  ).filter(
    (existingUniversalIdentifier) =>
      existingUniversalIdentifier !== universalIdentifier,
  );

  return {
    ...scope,
    permissionFlagUniversalIdentifiers: isGranted
      ? [...otherUniversalIdentifiers, universalIdentifier]
      : otherUniversalIdentifiers,
  };
};
