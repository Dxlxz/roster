import { type SdkClientUrls } from '@/types/SdkClientUrls';
import { FRONT_COMPONENT_SHARED_DEPENDENCIES_IMPORT_SPECIFIER } from 'roster-shared/application';
import { isDefined } from 'roster-shared/utils';

export const buildBlobUrlBySpecifier = ({
  sdkModuleBlobUrls,
  sharedDependenciesModuleBlobUrl,
}: {
  sdkModuleBlobUrls: SdkClientUrls | null;
  sharedDependenciesModuleBlobUrl: string | null;
}): Record<string, string> => ({
  ...(isDefined(sdkModuleBlobUrls)
    ? {
        'roster-client-sdk/core': sdkModuleBlobUrls.core,
        'roster-client-sdk/metadata': sdkModuleBlobUrls.metadata,
      }
    : {}),
  ...(isDefined(sharedDependenciesModuleBlobUrl)
    ? {
        [FRONT_COMPONENT_SHARED_DEPENDENCIES_IMPORT_SPECIFIER]:
          sharedDependenciesModuleBlobUrl,
      }
    : {}),
});
