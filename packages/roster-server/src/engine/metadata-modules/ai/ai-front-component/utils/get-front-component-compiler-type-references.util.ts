import {
  collectFrontComponentTypeReferences,
  FRONT_COMPONENT_REACT_IMPORTS,
} from 'roster-shared/front-component-build';

let typeReferences: Record<string, string> | undefined;

export const getFrontComponentCompilerTypeReferences = () => {
  typeReferences ??= collectFrontComponentTypeReferences({
    directory: __dirname,
    dependencies: [
      ...FRONT_COMPONENT_REACT_IMPORTS,
      'roster-shared/types',
      'roster-shared/utils',
      'roster-shared/translations',
      'roster-shared/application',
    ],
    shouldIncludeLibraries: true,
  });
  return typeReferences;
};
