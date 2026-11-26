import {
  DOCUMENTATION_DEFAULT_LANGUAGE,
  DOCUMENTATION_SUPPORTED_LANGUAGES,
  type DocumentationSupportedLanguage,
} from 'roster-shared/constants';

const roster_WEBSITE_HREF = 'https://roster.dev';

type rosterWebsitePage = 'terms' | 'privacy-policy';

export const getrosterWebsiteUrl = (
  locale: string,
  page: rosterWebsitePage,
): string => {
  const language = new Intl.Locale(locale).language;

  const isLocalizedWebsitePath =
    language !== DOCUMENTATION_DEFAULT_LANGUAGE &&
    DOCUMENTATION_SUPPORTED_LANGUAGES.some(
      (supportedLanguage: DocumentationSupportedLanguage) =>
        supportedLanguage === language,
    );

  const url = new URL(
    isLocalizedWebsitePath ? `/${language}/${page}` : `/${page}`,
    roster_WEBSITE_HREF,
  );

  return url.toString();
};
