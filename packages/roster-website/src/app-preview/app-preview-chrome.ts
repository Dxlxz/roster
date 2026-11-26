import { THEME_COMMON } from 'roster-ui/theme';

// Product layout facts the mockup mirrors that aren't part of roster-ui's
// theme. The spacing base and nav-item height derive from roster-ui's spacing
// unit; the header height, drawer width and record-table row height are
// roster-front layout constants (AppHeaderHeight / NavigationDrawerConstraints
// / RecordTableRowHeight).
export const APP_PREVIEW_CHROME = {
  spacingBasePx: THEME_COMMON.spacingMultiplicator,
  appHeaderHeightPx: 48,
  navigationItemHeightPx: THEME_COMMON.spacingMultiplicator * 7,
  navigationDrawerWidthPx: 220,
  navigationDrawerPaddingPx: THEME_COMMON.spacingMultiplicator * 2,
  recordTableRowHeightPx: 32,
};
