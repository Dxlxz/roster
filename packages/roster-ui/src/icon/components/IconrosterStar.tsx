import IconrosterStarRaw from '@assets/icons/roster-star.svg?react';
import { type IconComponentProps } from '@ui/icon/types/IconComponent';
import { useTheme } from '@ui/theme';

type IconrosterStarProps = Pick<IconComponentProps, 'size' | 'stroke'>;

export const IconrosterStar = (props: IconrosterStarProps) => {
  const theme = useTheme();
  const size = props.size ?? 24;
  const stroke = props.stroke ?? theme.icon.stroke.md;

  return <IconrosterStarRaw height={size} width={size} strokeWidth={stroke} />;
};
