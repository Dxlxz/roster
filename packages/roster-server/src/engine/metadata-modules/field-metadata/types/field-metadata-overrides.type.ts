import { type APP_LOCALES } from 'roster-shared/translations';

export type FieldMetadataOverrides = {
  isActive?: boolean;
  label?: string | null;
  description?: string | null;
  icon?: string | null;
  translations?: Partial<
    Record<
      keyof typeof APP_LOCALES,
      {
        label?: string | null;
        description?: string | null;
      }
    >
  > | null;
};
