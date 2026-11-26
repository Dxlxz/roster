import {
  isWorkspaceProvisioned,
  type WorkspaceActivationStatus,
} from 'roster-shared/workspace';

export const hasProvisionedSignUpDestination = (
  availableWorkspacesForSignUp: {
    workspace: { activationStatus: WorkspaceActivationStatus };
  }[],
): boolean =>
  availableWorkspacesForSignUp.some(({ workspace }) =>
    isWorkspaceProvisioned(workspace),
  );
