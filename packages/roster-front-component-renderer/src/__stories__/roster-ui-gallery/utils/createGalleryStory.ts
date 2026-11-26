import { type rosterUiGalleryPlayFunction } from '@/__stories__/roster-ui-gallery/types/rosterUiGalleryPlayFunction';
import { type rosterUiGalleryStory } from '@/__stories__/roster-ui-gallery/types/rosterUiGalleryStory';
import { getBuiltStoryComponentPathForRender } from '@/__stories__/utils/getBuiltStoryComponentPathForRender';

type CreateGalleryStoryOptions = {
  frontComponentBundleName: string;
  runtime: 'react' | 'preact';
  play?: rosterUiGalleryPlayFunction;
  decorators?: rosterUiGalleryStory['decorators'];
};

export const createGalleryStory = ({
  frontComponentBundleName,
  runtime,
  play,
  decorators,
}: CreateGalleryStoryOptions): rosterUiGalleryStory => ({
  args: {
    componentUrl: getBuiltStoryComponentPathForRender(
      `${frontComponentBundleName}.front-component`,
      runtime,
    ),
  },
  play,
  decorators,
});
