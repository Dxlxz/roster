import { isNonEmptyString } from '@sniptt/guards';
import { isDefined, isNonEmptyArray } from 'roster-shared/utils';

import { roster_UI_CASCADE_LAYER_NAME } from '@/host/constants/rosterUiCascadeLayerName';
import { getCssImportRuleInrosterUiCascadeLayer } from '@/host/utils/getCssImportRuleInrosterUiCascadeLayer';
import { getrosterUiCascadeLayerName } from '@/host/utils/getrosterUiCascadeLayerName';

export const wrapCssInrosterUiCascadeLayer = (cssText: string): string => {
  const parsingDocument = document.implementation.createHTMLDocument('');
  const styleElement = parsingDocument.createElement('style');
  styleElement.textContent = cssText;
  parsingDocument.head.appendChild(styleElement);

  if (!isDefined(styleElement.sheet)) {
    return '';
  }

  const layeredRules: string[] = [];
  const rulesToWrap: string[] = [];

  const flushRulesToWrap = () => {
    if (!isNonEmptyArray(rulesToWrap)) {
      return;
    }

    layeredRules.push(
      `@layer ${roster_UI_CASCADE_LAYER_NAME} {\n${rulesToWrap.splice(0).join('\n')}\n}`,
    );
  };

  const { cssRules } = styleElement.sheet;

  for (let ruleIndex = 0; ruleIndex < cssRules.length; ruleIndex += 1) {
    const cssRule = cssRules[ruleIndex];

    if (cssRule instanceof CSSImportRule) {
      flushRulesToWrap();
      layeredRules.push(getCssImportRuleInrosterUiCascadeLayer(cssRule));
      continue;
    }

    if (cssRule instanceof CSSLayerStatementRule) {
      flushRulesToWrap();
      const layerNames = cssRule.nameList.map(getrosterUiCascadeLayerName);
      layeredRules.push(`@layer ${layerNames.join(', ')};`);
      continue;
    }

    const isrosterUiLayerBlock =
      cssRule instanceof CSSLayerBlockRule &&
      isNonEmptyString(cssRule.name) &&
      getrosterUiCascadeLayerName(cssRule.name) === cssRule.name;

    if (cssRule instanceof CSSNamespaceRule || isrosterUiLayerBlock) {
      flushRulesToWrap();
      layeredRules.push(cssRule.cssText);
      continue;
    }

    rulesToWrap.push(cssRule.cssText);
  }

  flushRulesToWrap();

  return layeredRules.join('\n');
};
