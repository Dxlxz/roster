import { errorHandler } from '@/__stories__/shared/test-utils/createFrontComponentStoryMeta';
import { expectFrontComponentMounted } from '@/__stories__/shared/test-utils/matchers/expectFrontComponentMounted';
import { type rosterUiGalleryPlayFunction } from '@/__stories__/roster-ui-gallery/types/rosterUiGalleryPlayFunction';
import { expect, within } from 'storybook/test';

export const sliderRangeTest: rosterUiGalleryPlayFunction = async ({
  canvasElement,
}) => {
  const canvas = within(canvasElement);
  await expectFrontComponentMounted(canvas);
  const priceRange = within(canvas.getByRole('group', { name: 'Price range' }));
  const [minimumThumb, maximumThumb] = priceRange.getAllByRole('slider', {
    hidden: true,
  });

  expect(minimumThumb).toHaveAttribute('aria-label', 'Minimum price');
  expect(minimumThumb).toHaveValue('20');
  expect(maximumThumb).toHaveAttribute('aria-label', 'Maximum price');
  expect(maximumThumb).toHaveValue('80');
  expect(priceRange.getByRole('status')).toHaveTextContent('20 – 80');
  expect(errorHandler).not.toHaveBeenCalled();
};
