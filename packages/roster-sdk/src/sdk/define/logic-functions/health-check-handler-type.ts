import type { ApplicationHealthCheckResult } from 'roster-shared/application';

export type HealthCheckHandler = () =>
  | ApplicationHealthCheckResult
  | Promise<ApplicationHealthCheckResult>;

export type UserHealthCheckHandler = (parameters: {
  userWorkspaceId: string;
}) => ReturnType<HealthCheckHandler>;
