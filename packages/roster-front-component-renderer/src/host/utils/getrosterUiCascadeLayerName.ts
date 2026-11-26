import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'roster-shared/utils';

import { roster_UI_CASCADE_LAYER_NAME } from '@/host/constants/rosterUiCascadeLayerName';

const ANONYMOUS_IMPORT_LAYER_PREFIX = 'anonymous-';

export const getrosterUiCascadeLayerName = (
  layerName: string | null,
): string => {
  if (!isDefined(layerName)) {
    return roster_UI_CASCADE_LAYER_NAME;
  }

  if (!isNonEmptyString(layerName)) {
    const anonymousLayerIdentifier = crypto
      .getRandomValues(new Uint32Array(4))
      .join('-');

    return `${roster_UI_CASCADE_LAYER_NAME}.${ANONYMOUS_IMPORT_LAYER_PREFIX}${anonymousLayerIdentifier}`;
  }

  const isrosterUiLayer =
    layerName === roster_UI_CASCADE_LAYER_NAME ||
    layerName.startsWith(`${roster_UI_CASCADE_LAYER_NAME}.`);

  return isrosterUiLayer
    ? layerName
    : `${roster_UI_CASCADE_LAYER_NAME}.${layerName}`;
};
