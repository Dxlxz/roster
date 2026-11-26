import { type Meta } from '@storybook/react-vite';

import {
  FRONT_COMPONENT_STORY_DEFAULT_ARGS,
  resetFrontComponentStoryMocks,
} from '@/__stories__/shared/test-utils/createFrontComponentStoryMeta';
import { type rosterUiGalleryStory } from '@/__stories__/roster-ui-gallery/types/rosterUiGalleryStory';
import { ScrollBoundaryDecorator } from '@/__stories__/roster-ui-gallery/components/ScrollBoundaryDecorator';
import { autocompleteFilterResetTest } from '@/__stories__/roster-ui-gallery/utils/autocompleteFilterResetTest';
import { autocompleteNestedRevealTest } from '@/__stories__/roster-ui-gallery/utils/autocompleteNestedRevealTest';
import { autocompleteRevealTest } from '@/__stories__/roster-ui-gallery/utils/autocompleteRevealTest';
import { createAutocompleteLongInputTest } from '@/__stories__/roster-ui-gallery/utils/createAutocompleteLongInputTest';
import { createGalleryStory } from '@/__stories__/roster-ui-gallery/utils/createGalleryStory';
import { selectAlignedOpenTest } from '@/__stories__/roster-ui-gallery/utils/selectAlignedOpenTest';
import { selectRevealTest } from '@/__stories__/roster-ui-gallery/utils/selectRevealTest';
import { tabsOverflowTest } from '@/__stories__/roster-ui-gallery/utils/tabsOverflowTest';
import { FrontComponentRenderer } from '@/host/components/FrontComponentRenderer';

const meta: Meta<typeof FrontComponentRenderer> = {
  title: 'FrontComponent/roster UI Scrolling',
  component: FrontComponentRenderer,
  parameters: { layout: 'centered' },
  args: FRONT_COMPONENT_STORY_DEFAULT_ARGS,
  beforeEach: resetFrontComponentStoryMocks,
};

export default meta;

export const AutocompleteRevealReact: rosterUiGalleryStory = createGalleryStory(
  {
    frontComponentBundleName: 'roster-ui-autocomplete-scrolling',
    runtime: 'react',
    play: autocompleteRevealTest,
  },
);

export const AutocompleteRevealPreact: rosterUiGalleryStory =
  createGalleryStory({
    frontComponentBundleName: 'roster-ui-autocomplete-scrolling',
    runtime: 'preact',
    play: autocompleteRevealTest,
  });

export const AutocompleteNestedRevealReact: rosterUiGalleryStory =
  createGalleryStory({
    frontComponentBundleName: 'roster-ui-autocomplete-scrolling',
    runtime: 'react',
    play: autocompleteNestedRevealTest,
    decorators: [ScrollBoundaryDecorator],
  });

export const AutocompleteNestedRevealPreact: rosterUiGalleryStory =
  createGalleryStory({
    frontComponentBundleName: 'roster-ui-autocomplete-scrolling',
    runtime: 'preact',
    play: autocompleteNestedRevealTest,
    decorators: [ScrollBoundaryDecorator],
  });

export const AutocompleteFilterResetReact: rosterUiGalleryStory =
  createGalleryStory({
    frontComponentBundleName: 'roster-ui-autocomplete-scrolling',
    runtime: 'react',
    play: autocompleteFilterResetTest,
  });

export const AutocompleteFilterResetPreact: rosterUiGalleryStory =
  createGalleryStory({
    frontComponentBundleName: 'roster-ui-autocomplete-scrolling',
    runtime: 'preact',
    play: autocompleteFilterResetTest,
  });

export const AutocompleteLongInputReact: rosterUiGalleryStory =
  createGalleryStory({
    frontComponentBundleName: 'roster-ui-autocomplete-scrolling',
    runtime: 'react',
    play: createAutocompleteLongInputTest({ isTrusted: false }),
  });

export const AutocompleteLongInputPreact: rosterUiGalleryStory =
  createGalleryStory({
    frontComponentBundleName: 'roster-ui-autocomplete-scrolling',
    runtime: 'preact',
    play: createAutocompleteLongInputTest({ isTrusted: false }),
  });

export const AutocompleteTrustedLongInputReact: rosterUiGalleryStory = {
  ...createGalleryStory({
    frontComponentBundleName: 'roster-ui-autocomplete-scrolling',
    runtime: 'react',
    play: createAutocompleteLongInputTest({ isTrusted: true }),
  }),
  tags: ['!dev'],
};

export const AutocompleteTrustedLongInputPreact: rosterUiGalleryStory = {
  ...createGalleryStory({
    frontComponentBundleName: 'roster-ui-autocomplete-scrolling',
    runtime: 'preact',
    play: createAutocompleteLongInputTest({ isTrusted: true }),
  }),
  tags: ['!dev'],
};

export const SelectRevealReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-select-scrolling',
  runtime: 'react',
  play: selectRevealTest,
});

export const SelectRevealPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-select-scrolling',
  runtime: 'preact',
  play: selectRevealTest,
});

export const SelectAlignedOpenReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-select-scrolling',
  runtime: 'react',
  play: selectAlignedOpenTest,
});

export const SelectAlignedOpenPreact: rosterUiGalleryStory = createGalleryStory(
  {
    frontComponentBundleName: 'roster-ui-select-scrolling',
    runtime: 'preact',
    play: selectAlignedOpenTest,
  },
);

export const TabsOverflowReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-tabs-scrolling',
  runtime: 'react',
  play: tabsOverflowTest,
});

export const TabsOverflowPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-tabs-scrolling',
  runtime: 'preact',
  play: tabsOverflowTest,
});
