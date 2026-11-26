import { TRANSLATABLE_PROPERTIES_BY_METADATA_NAME } from 'roster-shared/i18n';
import { type AllMetadataName } from 'roster-shared/metadata';

// widened from the shared literal so any metadata name can index it
export const ALL_TRANSLATABLE_PROPERTIES_BY_METADATA_NAME: Partial<
  Record<AllMetadataName, readonly string[]>
> = TRANSLATABLE_PROPERTIES_BY_METADATA_NAME;
