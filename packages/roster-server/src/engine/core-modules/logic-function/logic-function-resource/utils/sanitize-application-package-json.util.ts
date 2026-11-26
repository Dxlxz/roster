import { isDefined } from 'roster-shared/utils';

const BUILD_TIME_SDK_PACKAGES = ['roster-sdk', 'roster-client-sdk'];

// roster-sdk is build-time only and roster-client-sdk is injected at runtime,
// so neither is resolved by the layer install; lifecycle scripts are not needed
// to populate node_modules. Both are dropped from the app-supplied manifest.
export const sanitizeApplicationPackageJson = (
  packageJsonRaw: string,
): string => {
  const { scripts: _scripts, ...packageJson } = JSON.parse(packageJsonRaw) as {
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
  };

  if (isDefined(packageJson.dependencies)) {
    packageJson.dependencies = Object.fromEntries(
      Object.entries(packageJson.dependencies).filter(
        ([packageName]) => !BUILD_TIME_SDK_PACKAGES.includes(packageName),
      ),
    );
  }

  return `${JSON.stringify(packageJson, null, 2)}\n`;
};
