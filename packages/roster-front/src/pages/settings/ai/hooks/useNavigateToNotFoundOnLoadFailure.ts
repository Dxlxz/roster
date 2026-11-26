import { type ErrorLike } from '@apollo/client';
import { useEffect } from 'react';
import { AppPath } from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';
import { useToast } from 'roster-ui/components/feedback';

import { getToastOptionsFromError } from '@/error-handler/utils/getToastOptionsFromError';
import { useNavigateApp } from '~/hooks/useNavigateApp';

export const useNavigateToNotFoundOnLoadFailure = ({
  hasFailedToLoad,
  error,
  notFoundMessage,
}: {
  hasFailedToLoad: boolean;
  error?: ErrorLike;
  notFoundMessage: string;
}) => {
  const navigateApp = useNavigateApp();
  const { enqueueToast } = useToast();

  useEffect(() => {
    if (!hasFailedToLoad) {
      return;
    }

    enqueueToast(
      isDefined(error)
        ? getToastOptionsFromError({ error })
        : { status: 'error', children: notFoundMessage },
    );
    navigateApp(AppPath.NotFound);
  }, [hasFailedToLoad, error, notFoundMessage, enqueueToast, navigateApp]);
};
