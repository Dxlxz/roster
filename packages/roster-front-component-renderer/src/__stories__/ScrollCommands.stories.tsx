import { type Meta } from '@storybook/react-vite';

import {
  FRONT_COMPONENT_STORY_DEFAULT_ARGS,
  resetFrontComponentStoryMocks,
} from '@/__stories__/shared/test-utils/createFrontComponentStoryMeta';
import { OverflowingListInstancesDecorator } from '@/__stories__/roster-ui-gallery/components/OverflowingListInstancesDecorator';
import { ScrollBoundaryDecorator } from '@/__stories__/roster-ui-gallery/components/ScrollBoundaryDecorator';
import { type rosterUiGalleryStory } from '@/__stories__/roster-ui-gallery/types/rosterUiGalleryStory';
import { createGalleryStory } from '@/__stories__/roster-ui-gallery/utils/createGalleryStory';
import { scrollDetachNoReplayTest } from '@/__stories__/roster-ui-gallery/utils/scrollDetachNoReplayTest';
import { scrollEchoElisionTest } from '@/__stories__/roster-ui-gallery/utils/scrollEchoElisionTest';
import { scrollEventEchoTest } from '@/__stories__/roster-ui-gallery/utils/scrollEventEchoTest';
import { scrollInstancesTest } from '@/__stories__/roster-ui-gallery/utils/scrollInstancesTest';
import { scrollNestedRevealTest } from '@/__stories__/roster-ui-gallery/utils/scrollNestedRevealTest';
import { scrollPageStaysLocalTest } from '@/__stories__/roster-ui-gallery/utils/scrollPageStaysLocalTest';
import { scrollPortalRefreshTest } from '@/__stories__/roster-ui-gallery/utils/scrollPortalRefreshTest';
import { scrollReadAfterWriteTest } from '@/__stories__/roster-ui-gallery/utils/scrollReadAfterWriteTest';
import { scrollRtlRevealTest } from '@/__stories__/roster-ui-gallery/utils/scrollRtlRevealTest';
import { FrontComponentRenderer } from '@/host/components/FrontComponentRenderer';

const meta: Meta<typeof FrontComponentRenderer> = {
  title: 'FrontComponent/Scroll Commands',
  component: FrontComponentRenderer,
  parameters: { layout: 'centered' },
  args: FRONT_COMPONENT_STORY_DEFAULT_ARGS,
  beforeEach: resetFrontComponentStoryMocks,
};

export default meta;

export const NestedRevealReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'react',
  play: scrollNestedRevealTest,
  decorators: [ScrollBoundaryDecorator],
});

export const NestedRevealPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'preact',
  play: scrollNestedRevealTest,
  decorators: [ScrollBoundaryDecorator],
});

export const RtlRevealReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'react',
  play: scrollRtlRevealTest,
});

export const RtlRevealPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'preact',
  play: scrollRtlRevealTest,
});

export const ReadAfterWriteReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'react',
  play: scrollReadAfterWriteTest,
});

export const ReadAfterWritePreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'preact',
  play: scrollReadAfterWriteTest,
});

export const EchoElisionReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'react',
  play: scrollEchoElisionTest,
});

export const EchoElisionPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'preact',
  play: scrollEchoElisionTest,
});

export const EventEchoReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'react',
  play: scrollEventEchoTest,
});

export const EventEchoPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'preact',
  play: scrollEventEchoTest,
});

export const DetachNoReplayReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'react',
  play: scrollDetachNoReplayTest,
});

export const DetachNoReplayPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'preact',
  play: scrollDetachNoReplayTest,
});

export const PortalRefreshReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'react',
  play: scrollPortalRefreshTest,
});

export const PortalRefreshPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'preact',
  play: scrollPortalRefreshTest,
});

export const PageStaysLocalReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'react',
  play: scrollPageStaysLocalTest,
  decorators: [ScrollBoundaryDecorator],
});

export const PageStaysLocalPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'preact',
  play: scrollPageStaysLocalTest,
  decorators: [ScrollBoundaryDecorator],
});

export const InstancesReact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'react',
  play: scrollInstancesTest,
  decorators: [OverflowingListInstancesDecorator],
});

export const InstancesPreact: rosterUiGalleryStory = createGalleryStory({
  frontComponentBundleName: 'scroll-commands',
  runtime: 'preact',
  play: scrollInstancesTest,
  decorators: [OverflowingListInstancesDecorator],
});
