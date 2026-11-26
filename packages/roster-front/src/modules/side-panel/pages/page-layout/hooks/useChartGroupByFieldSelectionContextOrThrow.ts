import { ChartGroupByFieldSelectionContext } from '@/side-panel/pages/page-layout/contexts/ChartGroupByFieldSelectionContext';
import { useContext } from 'react';
import { doNotTranslate } from 'roster-shared/i18n';
import { isDefined } from 'roster-shared/utils';

export const useChartGroupByFieldSelectionContextOrThrow = () => {
  const context = useContext(ChartGroupByFieldSelectionContext);

  if (!isDefined(context)) {
    throw new Error(
      doNotTranslate(
        'useChartGroupByFieldSelectionContextOrThrow must be used within a chart group-by field selection',
      ),
    );
  }

  return context;
};
