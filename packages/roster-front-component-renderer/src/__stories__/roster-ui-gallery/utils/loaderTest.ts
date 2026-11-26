import { expect, waitFor, within } from 'storybook/test';

import { type rosterUiGalleryPlayFunction } from '@/__stories__/roster-ui-gallery/types/rosterUiGalleryPlayFunction';
import { galleryRenderTest } from '@/__stories__/roster-ui-gallery/utils/galleryRenderTests';

export const loaderTest: rosterUiGalleryPlayFunction = async (context) => {
  await galleryRenderTest(context);
  const canvas = within(context.canvasElement);
  const loader = canvas.getByRole('status', { name: 'Loading results' });

  await waitFor(() =>
    expect(loader).toHaveAttribute('data-ref-tag', 'HTML-SPAN'),
  );
  await expect(loader).toHaveAttribute('data-composed', 'true');
  await expect(loader).toHaveClass('custom-loader');
  await expect(loader).toHaveStyle({ borderColor: 'rgb(18, 52, 86)' });
  await expect(loader.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  const decorativeEntry = within(
    canvas.getByTestId('gallery-item-DecorativeLoader'),
  );

  await expect(decorativeEntry.queryByRole('status')).not.toBeInTheDocument();
};
