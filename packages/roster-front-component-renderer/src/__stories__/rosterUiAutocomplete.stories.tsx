import { type Meta } from '@storybook/react-vite';

import {
  FRONT_COMPONENT_STORY_DEFAULT_ARGS,
  resetFrontComponentStoryMocks,
} from '@/__stories__/shared/test-utils/createFrontComponentStoryMeta';
import { type rosterUiGalleryStory } from '@/__stories__/roster-ui-gallery/types/rosterUiGalleryStory';
import { autocompleteCompositionTest } from '@/__stories__/roster-ui-gallery/utils/autocompleteCompositionTest';
import { autocompleteDismissalTest } from '@/__stories__/roster-ui-gallery/utils/autocompleteDismissalTest';
import { autocompleteEmptyTest } from '@/__stories__/roster-ui-gallery/utils/autocompleteEmptyTest';
import { autocompleteInputTest } from '@/__stories__/roster-ui-gallery/utils/autocompleteInputTest';
import { autocompletePartsTest } from '@/__stories__/roster-ui-gallery/utils/autocompletePartsTest';
import { createGalleryStory } from '@/__stories__/roster-ui-gallery/utils/createGalleryStory';
import { FrontComponentRenderer } from '@/host/components/FrontComponentRenderer';

const meta: Meta<typeof FrontComponentRenderer> = {
  title: 'FrontComponent/roster UI Autocomplete',
  component: FrontComponentRenderer,
  parameters: { layout: 'centered' },
  args: FRONT_COMPONENT_STORY_DEFAULT_ARGS,
  beforeEach: resetFrontComponentStoryMocks,
};

export default meta;

export const InputReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-autocomplete',
  runtime: 'react',
  play: autocompleteInputTest,
});

export const InputPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-autocomplete',
  runtime: 'preact',
  play: autocompleteInputTest,
});

export const CompositionReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-autocomplete',
  runtime: 'react',
  play: autocompleteCompositionTest,
});

export const CompositionPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-autocomplete',
  runtime: 'preact',
  play: autocompleteCompositionTest,
});

export const EmptyReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-autocomplete',
  runtime: 'react',
  play: autocompleteEmptyTest,
});

export const EmptyPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-autocomplete',
  runtime: 'preact',
  play: autocompleteEmptyTest,
});

export const PartsReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-autocomplete-parts',
  runtime: 'react',
  play: autocompletePartsTest,
});

export const PartsPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-autocomplete-parts',
  runtime: 'preact',
  play: autocompletePartsTest,
});

export const DismissalReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-autocomplete-parts',
  runtime: 'react',
  play: autocompleteDismissalTest,
});

export const DismissalPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'roster-ui-autocomplete-parts',
  runtime: 'preact',
  play: autocompleteDismissalTest,
});
