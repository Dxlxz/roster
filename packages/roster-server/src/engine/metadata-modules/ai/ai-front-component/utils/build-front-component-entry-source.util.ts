import { PageLayoutType } from 'roster-shared/types';
import { z } from 'zod';

import { FRONT_COMPONENT_WRAPPER_NAME } from 'src/engine/metadata-modules/ai/ai-front-component/constants/front-component-wrapper-name.constant';
import { FrontComponentBuildException } from 'src/engine/metadata-modules/ai/ai-front-component/exceptions/front-component-build.exception';
import { type FrontComponentBuildInput } from 'src/engine/metadata-modules/ai/ai-front-component/types/front-component-build-input.type';

const frontComponentEntryOptionsSchema = z.object({
  pageLayoutType: z.enum([
    PageLayoutType.DASHBOARD,
    PageLayoutType.RECORD_PAGE,
  ]),
});

export const buildFrontComponentEntrySource = ({
  componentId,
  name,
  source,
  pageLayoutType,
}: FrontComponentBuildInput): string => {
  const parsedOptions = frontComponentEntryOptionsSchema.safeParse({
    pageLayoutType,
  });

  if (!parsedOptions.success) {
    throw new FrontComponentBuildException({
      message: parsedOptions.error.message,
      code: 'INVALID_SETTINGS',
    });
  }

  return `import { useSyncExternalStore as userosterSyncExternalStore } from 'react';
import { defineFrontComponent } from 'roster-sdk/define';
import {
  THEME_DARK as roster_THEME_DARK,
  THEME_LIGHT as roster_THEME_LIGHT,
  ThemeProvider as rosterThemeProvider,
} from 'roster-ui/theme';
import { PageLayoutType as rosterPageLayoutType } from 'roster-shared/types';
import 'roster-ui/style.css';
import 'roster-ui/theme-light.css';
${source}
const roster_DARK_COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
function subscribeTorosterColorScheme(onColorSchemeChange: () => void) {
  const mediaQueryList = window.matchMedia(roster_DARK_COLOR_SCHEME_QUERY);
  mediaQueryList.addEventListener('change', onColorSchemeChange);
  return () => mediaQueryList.removeEventListener('change', onColorSchemeChange);
}
function getrosterColorScheme(): 'light' | 'dark' {
  return window.matchMedia(roster_DARK_COLOR_SCHEME_QUERY).matches ? 'dark' : 'light';
}
function ${FRONT_COMPONENT_WRAPPER_NAME}() {
  const colorScheme = userosterSyncExternalStore(subscribeTorosterColorScheme, getrosterColorScheme);
  return (
    <rosterThemeProvider colorScheme={colorScheme} theme={colorScheme === 'dark' ? roster_THEME_DARK : roster_THEME_LIGHT}>
      <Component />
    </rosterThemeProvider>
  );
}
export default defineFrontComponent({
  universalIdentifier: ${JSON.stringify(componentId)},
  name: ${JSON.stringify(name)},
  component: ${FRONT_COMPONENT_WRAPPER_NAME},
  widgetAvailability: { pageLayoutType: rosterPageLayoutType.${parsedOptions.data.pageLayoutType} },
});
`;
};
