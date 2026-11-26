import { isString } from '@sniptt/guards';
import { isPlainObject } from 'roster-shared/utils';

const DEPENDENCY_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
];

export const preserveLocalSdkDependency = ({
  content,
  existingContent,
}: {
  content: string;
  existingContent: string;
}): string => {
  const remotePackageJson: Record<string, unknown> = JSON.parse(content);
  const localPackageJson: Record<string, unknown> = JSON.parse(existingContent);

  if (
    DEPENDENCY_FIELDS.some((field) => {
      const dependencies = remotePackageJson[field];
      return (
        isPlainObject(dependencies) && Object.hasOwn(dependencies, 'roster-sdk')
      );
    })
  ) {
    return content;
  }

  for (const field of DEPENDENCY_FIELDS) {
    const localDependencies = localPackageJson[field];
    if (
      !isPlainObject(localDependencies) ||
      !isString(localDependencies['roster-sdk'])
    ) {
      continue;
    }
    const remoteDependencies = remotePackageJson[field];
    remotePackageJson[field] = {
      ...(isPlainObject(remoteDependencies) ? remoteDependencies : {}),
      'roster-sdk': localDependencies['roster-sdk'],
    };
    return `${JSON.stringify(remotePackageJson, null, 2)}\n`;
  }

  return content;
};
