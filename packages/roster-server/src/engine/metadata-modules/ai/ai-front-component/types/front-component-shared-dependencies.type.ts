import { type SharedDependenciesBuildContext } from 'roster-shared/front-component-build';

export type FrontComponentSharedDependencies =
  SharedDependenciesBuildContext & {
    source: string;
    typeReferences: string;
    checksum: string;
  };
