'use client';

import { useContext } from 'react';
import { type DocumentationSupportedLanguage } from 'roster-shared/constants';

import { LocaleContext } from './locale-context';

export const useLocale = (): DocumentationSupportedLanguage =>
  useContext(LocaleContext);
