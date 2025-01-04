"use client";

import { I18nProviderClient } from "@/locales/client";

interface LangProviderProps {
  params: { locale: string };
  children: React.ReactElement;
}
export const LangProvider = ({
  params: { locale },
  children,
}: LangProviderProps) => {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
};
