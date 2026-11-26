import { defineFrontComponent } from 'roster-sdk/define';
import 'roster-ui/style.css';
import { CollapsibleExample } from './collapsible-example';
import { ThemeProvider } from 'roster-ui/theme';
import { SeparatorExample } from './separator-example';
import { ResizeHandleExample } from './resize-handle-example';
import { AnimatedIconCrossfadeExample } from './animated-icon-crossfade-example';

import {
  ComponentGallery,
  type GalleryEntry,
} from '../shared/front-components/component-gallery';

const LAYOUT_ENTRIES: GalleryEntry[] = [
  {
    name: 'Collapsible',
    node: <CollapsibleExample />,
  },
  {
    name: 'AnimatedIconCrossfade',
    node: <AnimatedIconCrossfadeExample />,
  },
  {
    name: 'Separator',
    node: <SeparatorExample />,
  },
  {
    name: 'ResizeHandle',
    node: <ResizeHandleExample />,
  },
];

const LayoutGallery = () => (
  <ThemeProvider colorScheme="light">
    <ComponentGallery
      title="roster-ui/primitives/layout"
      entries={LAYOUT_ENTRIES}
    />
  </ThemeProvider>
);

export default defineFrontComponent({
  universalIdentifier: 'test-20ui0-0000-0000-0000-000000000103',
  name: 'roster-ui-layout-gallery',
  description:
    'Renders every roster-ui/primitives/layout component in the sandbox',
  component: LayoutGallery,
});
