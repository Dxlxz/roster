import {
  CLIENT_CONFIG_BOOTSTRAP_ELEMENT_ID,
  IFRAME_MEDIA_PERMISSIONS_BOOTSTRAP_ELEMENT_ID,
} from 'roster-shared/constants';
import { type IframeMediaPermission } from 'roster-shared/types';

import { serializeJsonForHtmlScript } from 'src/engine/core-modules/frontend/utils/serialize-json-for-html-script.util';

export const renderFrontendHtml = ({
  template,
  clientConfig,
  iframeMediaPermissions,
}: {
  template: string;
  clientConfig: object;
  iframeMediaPermissions: IframeMediaPermission[];
}): string =>
  template
    .replace(
      /<!-- BEGIN: roster Config -->[\s\S]*?<!-- END: roster Config -->/,
      '<script id="roster-env-config">window._env_ = {};</script>',
    )
    .replace(
      '</head>',
      () =>
        `<script id="${CLIENT_CONFIG_BOOTSTRAP_ELEMENT_ID}" type="application/json">${serializeJsonForHtmlScript(clientConfig)}</script>` +
        `<script id="${IFRAME_MEDIA_PERMISSIONS_BOOTSTRAP_ELEMENT_ID}" type="application/json">${serializeJsonForHtmlScript(iframeMediaPermissions)}</script></head>`,
    );
