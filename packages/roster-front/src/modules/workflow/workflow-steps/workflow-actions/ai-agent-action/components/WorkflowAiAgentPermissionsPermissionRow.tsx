import { PermissionIcon } from '@/settings/roles/role-permissions/object-overrides/components/PermissionIcon';
import { type SettingsRoleObjectPermissionKey } from '@/settings/roles/role-permissions/object-overrides/constants/SettingsRoleObjectPermissionIconConfig';
import { isDefined } from 'roster-shared/utils';
import { LightIconButton } from 'roster-ui/components/input';
import { ListItemButton } from 'roster-ui/components/navigation';
import { ListItem } from 'roster-ui/primitives/navigation';
import { IconTrash } from 'roster-ui/icon';
import { useLingui } from '@lingui/react/macro';

type WorkflowAiAgentPermissionsPermissionRowProps = {
  permission: {
    key: SettingsRoleObjectPermissionKey;
    label: string;
  };
  isEnabled: boolean;
  readonly: boolean;
  shouldShowDeleteButton?: boolean;
  alwaysShowGranted?: boolean;
  onAdd?: () => void;
  onDelete?: () => void;
};

export const WorkflowAiAgentPermissionsPermissionRow = ({
  permission,
  isEnabled,
  readonly,
  shouldShowDeleteButton = true,
  alwaysShowGranted = false,
  onAdd,
  onDelete,
}: WorkflowAiAgentPermissionsPermissionRowProps) => {
  const { t } = useLingui();
  const isClickable = !readonly && !isEnabled && isDefined(onAdd);
  const isDisabled = isEnabled && !shouldShowDeleteButton;
  const shouldShowTrashButton = isEnabled && shouldShowDeleteButton;

  const startIcon = (
    <PermissionIcon
      permission={permission.key}
      state={alwaysShowGranted || isEnabled ? 'granted' : 'revoked'}
    />
  );

  if (isClickable) {
    return (
      <ListItemButton startIcon={startIcon} onClick={onAdd}>
        {permission.label}
      </ListItemButton>
    );
  }

  return (
    <ListItem
      startIcon={startIcon}
      disabled={isDisabled}
      actions={
        shouldShowTrashButton && (
          <LightIconButton aria-label={t`Remove permission`} onClick={onDelete}>
            <IconTrash />
          </LightIconButton>
        )
      }
    >
      {permission.label}
    </ListItem>
  );
};
