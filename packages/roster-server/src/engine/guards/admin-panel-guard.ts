import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { type Observable } from 'rxjs';

import { isServerAdminAccessAllowedFromWorkspace } from 'src/engine/core-modules/impersonation/utils/is-server-admin-access-allowed-from-workspace.util';
import { userIsFullAdmin } from 'src/engine/core-modules/impersonation/utils/user-is-full-admin.util';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';
import { isImpersonating } from 'src/engine/guards/utils/is-impersonating.util';

@Injectable()
export class AdminPanelGuard implements CanActivate {
  constructor(private readonly rosterConfigService: rosterConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    return (
      !isImpersonating(request.impersonationContext) &&
      userIsFullAdmin(request.user) &&
      isServerAdminAccessAllowedFromWorkspace({
        workspaceId: request.workspace?.id,
        serverAdminWorkspaceId: this.rosterConfigService.get(
          'SERVER_ADMIN_WORKSPACE_ID',
        ),
      })
    );
  }
}
