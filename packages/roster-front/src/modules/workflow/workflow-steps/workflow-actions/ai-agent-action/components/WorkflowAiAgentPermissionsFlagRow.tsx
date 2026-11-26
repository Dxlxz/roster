import { ListItemIconContainer } from '@/ui/navigation/list-item/components/ListItemIconContainer';
import { type SettingsRolePermissionsSettingPermission } from '@/settings/roles/role-permissions/permission-flags/types/SettingsRolePermissionsSettingPermission';
import { LightIconButton } from 'roster-ui/components/input';
import { isDefined } from 'roster-shared/utils';
import { ListItemButton } from 'roster-ui/components/navigation';
import { ListItem } from 'roster-ui/primitives/navigation';
import { useTheme } from 'roster-ui/theme';
import { IconTrash } from 'roster-ui/icon';
import { useLingui } from '@lingui/react/macro';

type WorkflowAiAgentPermissionsFlagRowProps = {
  permission: SettingsRolePermissionsSettingPermission;
  isEnabled: boolean;
  readonly: boolean;
  shouldShowDeleteButton?: boolean;
  onAdd?: () => void;
  onDelete?: () => void;
};

export const WorkflowAiAgentPermissionsFlagRow = ({
  permission,
  isEnabled,
  readonly,
  shouldShowDeleteButton = false,
  onAdd,
  onDelete,
}: WorkflowAiAgentPermissionsFlagRowProps) => {
  const { t } = useLingui();
  const theme = useTheme();
  const isClickable = !readonly && !isEnabled && isDefined(onAdd);
  const isDisabled = isEnabled && !shouldShowDeleteButton;
  const shouldShowTrashButton = isEnabled && shouldShowDeleteButton;

  const Icon = permission.Icon;
  const startIcon = (
    <ListItemIconContainer>
      <Icon size={theme.icon.size.md} stroke={theme.icon.stroke.sm} />
    </ListItemIconContainer>
  );

  if (isClickable) {
    return (
      <ListItemButton startIcon={startIcon} onClick={onAdd}>
        {permission.name}
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
      {permission.name}
    </ListItem>
  );
};
