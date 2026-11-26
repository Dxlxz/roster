import { errorHandler } from '@/__stories__/shared/test-utils/createFrontComponentStoryMeta';
import { type rosterUiGalleryPlayFunction } from '@/__stories__/roster-ui-gallery/types/rosterUiGalleryPlayFunction';
import { expectAssertionToKeepFailing } from '@/__stories__/roster-ui-gallery/utils/expectAssertionToKeepFailing';
import { expectSliderGalleryMounted } from '@/__stories__/roster-ui-gallery/utils/expectSliderGalleryMounted';
import { expect } from 'storybook/test';

export const sliderHiddenEdgeThumbTest: rosterUiGalleryPlayFunction = async ({
  canvasElement,
}) => {
  const slider = await expectSliderGalleryMounted(canvasElement);

  await expectAssertionToKeepFailing(() => expect(slider).toBeVisible());
  expect(errorHandler).not.toHaveBeenCalled();
};
