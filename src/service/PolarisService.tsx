"use client";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Frame, Navigation, TopBar } from "@shopify/polaris";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { MenuPolaris } from "@/lib/MenuPolaris";

const logo = {
  width: 124,
  topBarSource:
    "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999",
  contextualSaveBarSource:
    "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999",
  url: "#",
  accessibilityLabel: "Jaded Pixel",
};

export function PolarisService({ children }: { children: React.ReactNode }) {
  const { user } = useContext(UserContext);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const topBarMarkup = user ? (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigationActive}
    />
  ) : null;

  const navigationMarkup = user ? (
    <Navigation location="/seller">
      {MenuPolaris.map((item, i) => {
        return (
          <Navigation.Section
            separator={i > 0}
            title={item.title}
            key={item.title}
            items={item.items.map((x: any) => {
              return {
                ...x,
                url: "/" + user.mainRole.toLowerCase() + x.url,
                subNavigationItems: x.subNavigationItems.map((y: any) => {
                  return {
                    ...y,
                    url: "/" + user.mainRole.toLowerCase() + y.url,
                  };
                }),
              };
            })}
          />
        );
      })}
    </Navigation>
  ) : null;

  return (
    <AppProvider i18n={enTranslations}>
      <Frame
        logo={logo}
        navigation={navigationMarkup}
        topBar={topBarMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
      >
        {children as any}
      </Frame>
    </AppProvider>
  );
}
