"use client";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Frame } from "@shopify/polaris";

export function PolarisService({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider i18n={enTranslations}>
      <Frame>{children}</Frame>
    </AppProvider>
  );
}
