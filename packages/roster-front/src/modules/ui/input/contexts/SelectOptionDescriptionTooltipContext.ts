import { createContext } from 'react';
import { type Tooltip } from 'roster-ui/primitives/surfaces';

type SelectOptionDescriptionTooltipHandle = ReturnType<
  typeof Tooltip.createHandle<string>
>;

export const SelectOptionDescriptionTooltipContext = createContext<
  SelectOptionDescriptionTooltipHandle | undefined
>(undefined);
