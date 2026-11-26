import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { isServerAdminAccessAllowedFromWorkspace } from 'src/engine/core-modules/impersonation/utils/is-server-admin-access-allowed-from-workspace.util';
import { userHasAdminPrivileges } from 'src/engine/core-modules/impersonation/utils/user-has-admin-privileges.util';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { isImpersonating } from 'src/engine/guards/utils/is-impersonating.util';

// Read-only admin-panel lookups (user/recent-users search) are available to
// full admins as well as impersonators: managing server-admin access requires
// finding users, and a full admin is the higher privilege.
@Injectable()
export class AdminPanelOrImpersonateGuard implements CanActivate {
  constructor(private readonly rosterConfigService: rosterConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    return (
      !isImpersonating(request.impersonationContext) &&
      userHasAdminPrivileges(request.user) &&
      isServerAdminAccessAllowedFromWorkspace({
        workspaceId: request.workspace?.id,
        serverAdminWorkspaceId: this.rosterConfigService.get(
          'SERVER_ADMIN_WORKSPACE_ID',
        ),
      })
    );
  }
}
