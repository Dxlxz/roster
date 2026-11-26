import { errorHandler } from '@/__stories__/shared/test-utils/createFrontComponentStoryMeta';
import { INTERACTION_TIMEOUT } from '@/__stories__/shared/test-utils/timeouts';
import { type rosterUiGalleryPlayFunction } from '@/__stories__/roster-ui-gallery/types/rosterUiGalleryPlayFunction';
import { expectSliderGalleryMounted } from '@/__stories__/roster-ui-gallery/utils/expectSliderGalleryMounted';
import { expect, waitFor } from 'storybook/test';

export const sliderTest: rosterUiGalleryPlayFunction = async ({
  canvasElement,
}) => {
  const slider = await expectSliderGalleryMounted(canvasElement);

  await waitFor(() => expect(slider).toBeVisible(), {
    timeout: INTERACTION_TIMEOUT,
  });
  expect(errorHandler).not.toHaveBeenCalled();
};
