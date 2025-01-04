import { createI18nServer } from 'next-international/server';

export const { getI18n, getScopedI18n, getCurrentLocale, getStaticParams } = createI18nServer(
  {
    en: () => import('@/locales/en'),
    fr: () => import('@/locales/fr'),
  },
);
