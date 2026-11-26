import { getrosterWebsiteUrl } from '@/auth/utils/getrosterWebsiteUrl';

describe('getrosterWebsiteUrl', () => {
  it.each([
    ['ar-SA', 'ar'],
    ['cs-CZ', 'cs'],
    ['de-DE', 'de'],
    ['es-ES', 'es'],
    ['fr-FR', 'fr'],
    ['it-IT', 'it'],
    ['ja-JP', 'ja'],
    ['ko-KR', 'ko'],
    ['pt-BR', 'pt'],
    ['pt-PT', 'pt'],
    ['ro-RO', 'ro'],
    ['ru-RU', 'ru'],
    ['tr-TR', 'tr'],
    ['zh-CN', 'zh'],
    ['zh-TW', 'zh'],
  ])('uses the localized roster website path for %s', (locale, language) => {
    expect(getrosterWebsiteUrl(locale, 'privacy-policy')).toBe(
      `https://roster.dev/${language}/privacy-policy`,
    );
  });

  it('uses the default roster website path for English', () => {
    expect(getrosterWebsiteUrl('en', 'terms')).toBe('https://roster.dev/terms');
  });

  it('uses English for the pseudo locale', () => {
    expect(getrosterWebsiteUrl('pseudo-en', 'terms')).toBe(
      'https://roster.dev/terms',
    );
  });
});
