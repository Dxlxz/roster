import { type PageLayoutTabManifest } from 'roster-shared/application';

export type PageLayoutTabConfig = Omit<
  PageLayoutTabManifest,
  'pageLayoutUniversalIdentifier'
> & {
  pageLayoutUniversalIdentifier: string;
};
