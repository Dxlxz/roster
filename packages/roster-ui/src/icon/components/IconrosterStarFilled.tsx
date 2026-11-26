import IconrosterStarFilledRaw from '@assets/icons/roster-star-filled.svg?react';
import { type IconComponentProps } from '@ui/icon/types/IconComponent';
import { useTheme } from '@ui/theme';

type IconrosterStarFilledProps = Pick<IconComponentProps, 'size' | 'stroke'>;

export const IconrosterStarFilled = (props: IconrosterStarFilledProps) => {
  const theme = useTheme();
  const size = props.size ?? 24;
  const stroke = props.stroke ?? theme.icon.stroke.md;

  return (
    <IconrosterStarFilledRaw height={size} width={size} strokeWidth={stroke} />
  );
};
