"use client";
import { useState } from "react";
import {
  Cart,
  ControlPanel,
  DefaultLogo,
  Logout,
  Products,
  Promocode,
  Settings,
  Shipping
} from "../icons/icons";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LangSwitch from "./NavBtn/LangSwitch";

interface ArrowIconProps {
  isCollapsed: boolean;
  isRTL: boolean;
}
// Arrow Icon Component
const ArrowIcon = ({ isCollapsed, isRTL }: ArrowIconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-300 ${isCollapsed
      ? (isRTL ? "rotate-180" : "rotate-0")
      : (isRTL ? "rotate-0" : "rotate-180")
      }`}
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const locale = pathname?.split("/")[1];
  const t = useTranslations();

  const isRTL = locale === "ar";

  const navLinks = [
    {
      href: `/${locale}`,
      label: t("navbar.board"),
      icon: <ControlPanel />,
    },
    {
      href: `/${locale}/products`,
      label: t("navbar.Products"),
      icon: <Products />,
    },
    {
      href: `/${locale}/orders`,
      label: t("navbar.orders"),
      icon: <Cart />,
    },
    {
      href: `/${locale}/promocodes`,
      label: t("navbar.promocodes"),
      icon: <Promocode />,
    },
    {
      href: `/${locale}/shippingZone`,
      label: t("navbar.shippingZone"),
      icon: <Shipping />,
    },
    {
      href: `/${locale}/settings`,
      label: t("navbar.settings"),
      icon: <Settings />,
    },
  ];

  return (
    <aside
      className={`
        h-screen bg-[#CCE7FF] border-r
        lg:flex flex-col
        transition-all duration-300
        hidden
        ${isCollapsed ? "w-20" : "w-70"}
        ${isRTL ? "border-l border-r-0 border-[#99CFFF]" : ""}
      `}
      dir={isRTL ? "rtl" : "ltr"}
    >

      {/* ===== Header ===== */}
      <div className={`flex items-center gap-3 px-6 py-5 border-b border-[#99CFFF] ${isCollapsed ? "justify-center px-2" : ""}`}>
        {!isCollapsed ? (
          <>
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-100">
              <DefaultLogo />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">
                {t("navbar.board")}
              </span>
              <span className="text-xs text-slate-500">
                {t("navbar.user")}
              </span>
            </div>
          </>
        ) : (
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-100">
            <DefaultLogo />
          </div>
        )}
      </div>


      {/* ===== Toggle Button ===== */}
      <div className={`px-4 py-3 ${isCollapsed ? "px-2" : ""}`}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            flex items-center justify-center
            w-full p-2 rounded-lg
            bg-blue-100 hover:bg-blue-200
            text-blue-600
            transition-all duration-200
          `}
          title={isCollapsed ? "توسيع القائمة" : "تصغير القائمة"}
        >
          <ArrowIcon isCollapsed={isCollapsed} isRTL={isRTL} />
        </button>
      </div>

      {/* ===== Nav ===== */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-100"
                    }
                    ${isCollapsed ? "justify-center px-2" : ""}
                  `}
                  title={isCollapsed ? link.label : ""}
                >
                  <span className="text-lg">{link.icon}</span>
                  {!isCollapsed && (
                    <span className="text-sm">{link.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ===== Footer ===== */}
      <div className={`border-t border-[#99CFFF] px-4 py-4 space-y-3 ${isCollapsed ? "px-2" : ""}`}>
        {!isCollapsed ? (
          <>
            <LangSwitch />
            <button
              className="
                w-full flex items-center justify-center gap-2
                px-4 py-2 rounded-lg
                text-red-600 border border-red-200
                hover:bg-red-50
                active:bg-red-600 active:text-white
                transition
              "
            >
              <Logout />
              <span className="text-sm">{t("navbar.logout")}</span>
            </button>
          </>
        ) : (
          <>
          <button
            className="
              w-full flex items-center justify-center
              p-2 rounded-lg
              text-red-600 border border-red-200
              hover:bg-red-50
              active:bg-red-600 active:text-white
              transition
            "
            title="تسجيل الخروج"
          >
            <Logout />
          </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default Navbar;