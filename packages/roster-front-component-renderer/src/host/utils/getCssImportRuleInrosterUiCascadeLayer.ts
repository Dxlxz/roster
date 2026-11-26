import { isNonEmptyString } from '@sniptt/guards';

import { getrosterUiCascadeLayerName } from '@/host/utils/getrosterUiCascadeLayerName';

export const getCssImportRuleInrosterUiCascadeLayer = (
  cssRule: CSSImportRule,
): string => {
  const layerName = getrosterUiCascadeLayerName(cssRule.layerName);
  const supportsClause = isNonEmptyString(cssRule.supportsText)
    ? ` supports(${cssRule.supportsText})`
    : '';
  const mediaClause = isNonEmptyString(cssRule.media.mediaText)
    ? ` ${cssRule.media.mediaText}`
    : '';

  return `@import url(${CSS.escape(cssRule.href)}) layer(${layerName})${supportsClause}${mediaClause};`;
};
