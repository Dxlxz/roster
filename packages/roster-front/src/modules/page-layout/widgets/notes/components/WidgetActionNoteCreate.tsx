import { WidgetActionActivityCreate } from '@/page-layout/widgets/components/WidgetActionActivityCreate';
import { StandardObjectNameSingular } from 'roster-shared/types';

export const WidgetActionNoteCreate = () => (
  <WidgetActionActivityCreate
    activityObjectNameSingular={StandardObjectNameSingular.Note}
  />
);
