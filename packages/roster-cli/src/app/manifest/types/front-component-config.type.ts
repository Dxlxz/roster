import { type FrontComponentManifest } from 'roster-shared/application';

export type FrontComponentType = { name: string };

export type FrontComponentConfig = Omit<
  FrontComponentManifest,
  | 'sourceComponentPath'
  | 'builtComponentPath'
  | 'builtComponentChecksum'
  | 'componentName'
  | 'usesSdkClient'
> & {
  component: FrontComponentType;
};
