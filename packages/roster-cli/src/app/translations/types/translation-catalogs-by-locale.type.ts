import { type AppLocale } from 'roster-shared/translations';

export type TranslationCatalogsByLocale = Partial<
  Record<AppLocale, Record<string, string>>
>;
