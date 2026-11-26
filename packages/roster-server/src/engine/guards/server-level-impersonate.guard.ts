import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { isServerAdminAccessAllowedFromWorkspace } from 'src/engine/core-modules/impersonation/utils/is-server-admin-access-allowed-from-workspace.util';
import { userCanServerImpersonate } from 'src/engine/core-modules/impersonation/utils/user-can-server-impersonate.util';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { isImpersonating } from 'src/engine/guards/utils/is-impersonating.util';

@Injectable()
export class ServerLevelImpersonateGuard implements CanActivate {
  constructor(private readonly rosterConfigService: rosterConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    return (
      !isImpersonating(request.impersonationContext) &&
      userCanServerImpersonate(request.user) &&
      isServerAdminAccessAllowedFromWorkspace({
        workspaceId: request.workspace?.id,
        serverAdminWorkspaceId: this.rosterConfigService.get(
          'SERVER_ADMIN_WORKSPACE_ID',
        ),
      })
    );
  }
}
