import { Module } from '@nestjs/common';

import { ApplicationGrantRoleModule } from 'src/engine/core-modules/application/application-grant-role/application-grant-role.module';
import { ApplicationModule } from 'src/engine/core-modules/application/application.module';
import { PermissionTableModule } from 'src/engine/permissions/permission-table/permission-table.module';
import { WorkspaceCacheModule } from 'src/engine/workspace-cache/workspace-cache.module';
import { WorkspaceMigrationModule } from 'src/engine/workspace-manager/workspace-migration/workspace-migration.module';

import { rosterStandardApplicationService } from './services/roster-standard-application.service';

@Module({
  providers: [rosterStandardApplicationService],
  imports: [
    ApplicationGrantRoleModule,
    ApplicationModule,
    PermissionTableModule,
    WorkspaceCacheModule,
    WorkspaceMigrationModule,
  ],
  exports: [rosterStandardApplicationService],
})
export class rosterStandardApplicationModule {}
