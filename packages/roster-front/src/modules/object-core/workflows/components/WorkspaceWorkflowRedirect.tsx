import { useQuery } from '@apollo/client/react';
import { Navigate } from 'react-router-dom';
import { AppPath } from 'roster-shared/types';
import { getAppPath, isDefined } from 'roster-shared/utils';
import { Loader } from 'roster-ui/primitives/feedback';

import { WorkspaceRouteUnavailable } from '@/ui/layout/page/components/WorkspaceRouteUnavailable';
import { useApolloCoreClient } from '@/object-metadata/hooks/useApolloCoreClient';
import { GetCoreWorkflowLegacyMappingDocument } from '~/generated/graphql';

export const WorkspaceWorkflowRedirect = ({
  workspaceWorkflowId,
}: {
  workspaceWorkflowId: string;
}) => {
  const client = useApolloCoreClient();
  const { data, loading, error } = useQuery(
    GetCoreWorkflowLegacyMappingDocument,
    {
      client,
      variables: { workspaceWorkflowId },
      fetchPolicy: 'network-only',
    },
  );

  if (loading) {
    return <Loader />;
  }
  if (isDefined(error) || !isDefined(data?.coreWorkflow)) {
    return <WorkspaceRouteUnavailable />;
  }

  return (
    <Navigate
      replace
      to={getAppPath(AppPath.WorkflowCoreShowPage, {
        coreWorkflowId: data.coreWorkflow.id,
      })}
    />
  );
};
