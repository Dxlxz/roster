import { type APP_LOCALES } from 'roster-shared/translations';

export type TranslationOverrideEntry = {
  locale: keyof typeof APP_LOCALES;
  property: string;
  value?: string | null;
};
