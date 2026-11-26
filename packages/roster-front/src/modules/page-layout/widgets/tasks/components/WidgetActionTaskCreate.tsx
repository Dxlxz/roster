import { WidgetActionActivityCreate } from '@/page-layout/widgets/components/WidgetActionActivityCreate';
import { StandardObjectNameSingular } from 'roster-shared/types';

export const WidgetActionTaskCreate = () => (
  <WidgetActionActivityCreate
    activityObjectNameSingular={StandardObjectNameSingular.Task}
  />
);
