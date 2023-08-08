import { AnalyticsCohortMinor, ProductsMinor } from "@shopify/polaris-icons";
export const MenuPolaris = [
  {
    title: "Dashboard",
    items: [
      {
        url: "/",
        label: "Dashboard",
        icon: AnalyticsCohortMinor,
        subNavigationItems: [],
      },
    ],
  },
  {
    title: "Applications",
    items: [
      {
        url: "/product",
        label: "Products",
        icon: ProductsMinor,
        subNavigationItems: [
          {
            url: "/products",
            label: "Products",
          },
        ],
      },
    ],
  },
];
