import { isDefined } from 'roster-shared/utils';

export const isRootContainerInteractive = (
  rootContainer: Element | null,
): boolean =>
  isDefined(rootContainer) &&
  rootContainer.getClientRects().length > 0 &&
  getComputedStyle(rootContainer).pointerEvents !== 'none';
