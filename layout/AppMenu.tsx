/* eslint-disable @next/next/no-img-element */

import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import Link from "next/link";
import { AppMenuItem } from "../types/types";

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const model: AppMenuItem[] = [
    {
      label: "Home",
      items: [
        { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/dashboard" },
      ],
    },
    {
      label: "Zone",
      items: [
        {
          label: "Create Zone",
          icon: "pi pi-fw pi-id-card",
          to: "/uikit/formlayout",
          disabled: true,
        },
        {
          label: "Delete Zone",
          icon: "pi pi-fw pi-check-square",
          to: "/uikit/input",
          disabled: true,
        },
        {
          label: "Detail Zone",
          icon: "pi pi-fw pi-bookmark",
          to: "/uikit/floatlabel",
          disabled: true,
        },
        {
          label: "Edit Zone",
          icon: "pi pi-fw pi-exclamation-circle",
          to: "/uikit/invalidstate",
          disabled: true,
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
