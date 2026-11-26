import React from 'react';
import { isDefined } from 'roster-shared/utils';
import { LightIconButton } from 'roster-ui/components/input';
import { type IconComponent } from 'roster-ui/icon';

type BubbleMenuIconButtonProps = {
  label: string;
  Icon?: IconComponent;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
};

export const BubbleMenuIconButton = ({
  label,
  Icon,
  disabled = false,
  onClick,
  isActive,
}: BubbleMenuIconButtonProps) => {
  return (
    <LightIconButton
      disabled={disabled}
      aria-pressed={isActive}
      onClick={onClick}
      variant={isActive ? 'soft' : 'ghost'}
      size="sm"
      aria-label={label}
    >
      {isDefined(Icon) && <Icon />}
    </LightIconButton>
  );
};
