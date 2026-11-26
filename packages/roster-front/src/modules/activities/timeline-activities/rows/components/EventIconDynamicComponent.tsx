import { ObjectMetadataIcon } from '@/object-metadata/components/ObjectMetadataIcon';
import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { isDefined } from 'roster-shared/utils';
import { useIcons } from 'roster-ui/icon/provider';
import { useTheme } from 'roster-ui/theme';

export const EventIconDynamicComponent = ({
  eventIcon,
  linkedObjectMetadataItem,
}: {
  eventIcon: string | null;
  linkedObjectMetadataItem: EnrichedObjectMetadataItem | null;
}) => {
  const { getIcon } = useIcons();
  const theme = useTheme();

  if (!isDefined(eventIcon)) {
    return <ObjectMetadataIcon objectMetadataItem={linkedObjectMetadataItem} />;
  }

  const EventIcon = getIcon(eventIcon);

  return <EventIcon size={theme.icon.size.md} />;
};
