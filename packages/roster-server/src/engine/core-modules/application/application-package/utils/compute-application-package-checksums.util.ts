import {
  computeDependencyFileChecksum,
  computePackageJsonChecksum,
} from 'roster-shared/application';
import { isDefined } from 'roster-shared/utils';

export const computeApplicationPackageChecksums = ({
  packageJsonContent,
  yarnLockContent,
}: {
  packageJsonContent: string;
  yarnLockContent: string | null;
}): { packageJsonChecksum: string; yarnLockChecksum: string | null } => ({
  packageJsonChecksum: computePackageJsonChecksum(packageJsonContent),
  yarnLockChecksum: isDefined(yarnLockContent)
    ? computeDependencyFileChecksum(yarnLockContent)
    : null,
});
