import { type ToolCategory } from 'roster-shared/ai';

export type ToolCatalogOptions = {
  categories?: ToolCategory[];
  excludeTools?: Set<string>;
};
