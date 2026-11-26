import { type PageLayoutWidget } from '@/page-layout/types/PageLayoutWidget';
import { reindexWidgetsToVerticalListPositions as reindexWidgets } from 'roster-shared/utils';

export const reindexWidgetsToVerticalListPositions = (
  widgets: PageLayoutWidget[],
): PageLayoutWidget[] =>
  reindexWidgets(widgets).map((widget) => ({
    ...widget,
    position: {
      ...widget.position,
      __typename: 'PageLayoutWidgetVerticalListPosition',
    },
  }));
