"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import OrdersTable from "./OrdersTable";

const mockOrders = [
  { orderNumber: "#200MR", customerName: "مصطفى محمود", status: "مكتمل" as const,    orderDate: "1/1/2025", amount: "500 جنيه" },
  { orderNumber: "#200MR", customerName: "جهاد ناصر",   status: "قيد التنظار" as const, orderDate: "1/1/2025", amount: "500 جنيه" },
  { orderNumber: "#200MR", customerName: "مصطفى محمود", status: "تم الشحن" as const,  orderDate: "1/1/2025", amount: "500 جنيه" },
  { orderNumber: "#200MR", customerName: "كيان مصطفى", status: "مكتمل" as const,    orderDate: "1/1/2025", amount: "500 جنيه" },
  { orderNumber: "#200MR", customerName: "مصطفى محمود", status: "قيد التنظار" as const, orderDate: "1/1/2025", amount: "500 جنيه" },
  { orderNumber: "#200MR", customerName: "مصطفى محمود", status: "تم الشحن" as const,  orderDate: "1/1/2025", amount: "500 جنيه" },
];

const Page = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname?.split("/")[1];
  const isRTL = locale === "ar";

  return (
    <div>
      <header className="bg-[#CCE7FF] py-3 px-8 h-30.25 flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          {t("orders.title")}
        </h1>
      </header>

      <div dir={isRTL ? "rtl" : "ltr"}>
        <OrdersTable orders={mockOrders} />
      </div>
    </div>
  );
};

export default Page;