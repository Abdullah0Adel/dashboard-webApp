"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { OrderDetailsPopup } from "./OrderDetailsPopup";

type OrderStatus = "مكتمل" | "قيد التنظار" | "تم الشحن";

interface Order {
  orderNumber: string;
  customerName: string;
  status: OrderStatus;
  orderDate: string;
  amount: string;
}

const statusStyles: Record<OrderStatus, string> = {
  "مكتمل": "bg-[#34C75980] text-black",
  "قيد التنظار": "bg-[#66B8FF] text-black",
  "تم الشحن": "bg-[#FFCC0080] text-black",
};

interface OrdersTableProps {
  orders: Order[];
}

// --- Demo ---
const OrderDetails = {
  orderNumber: "123MR",
  customerName: "مصطفى محمود على",
  email: "Mostafa123@gmail.com",
  phone: "01111111111111",
  date: "1/1/2026",
  address: "6 شارع محمد على , القاهره.",
  products: [
    { name: "تيشرت رجالى قطيفة", price: 400 },
    { name: "تيشرت اطفالى قطيفة", price: 200 },
  ],
  deliveryFee: 50,
  status: "قيد التنظار",
};


const OrdersTable = ({ orders }: OrdersTableProps) => {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname?.split("/")[1];
  const isRTL = locale === "ar";

  const [open, setOpen] = useState(false);

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  return (
    <div className="p-6">


      {/* Search & Filter Bar */}
      <div className="flex flex-row-reverse gap-3 mb-4">
        {/* Status Filter */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white gap-2 cursor-pointer select-none">
          <span className="text-gray-700 text-sm">{t("orders.orderStatus") ?? "حاله الطلب"}</span>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Search Input */}
        <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white gap-2 flex-row-reverse">
          <input
            type="text"
            placeholder={t("orders.searchPlaceholder") ?? "بحث عن طلب,عميل"}
            className="flex-1 text-right bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
            dir="rtl"
          />
          <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </div>
      </div>

            {/* Title */}
      <h2 className="text-right text-2xl font-bold mb-4 text-gray-800">
        {t("orders.allOrders") ?? "جميع الطلبات"}
      </h2>

      {/* Table */}
      <div className="border-[0.5px] border-[#99CFFF] rounded-lg overflow-hidden bg-white p-2">
        <table className="border-separate border-spacing-y-2 w-full text-right  " dir={isRTL ? "rtl" : "ltr"}>
          <thead >
            <tr className="">
              <th className="py-4 px-6 text-[#003666] font-semibold text-xl text-center">{t("orders.orderNumber") ?? "رقم الاوردر"}</th>
              <th className="py-4 px-6 text-[#003666] font-semibold text-xl text-center">{t("orders.clientName") ?? "اسم العميل"}</th>
              <th className="py-4 px-6 text-[#003666] font-semibold text-xl text-center">{t("orders.orderStatus") ?? "حالة الطلب"}</th>
              <th className="py-4 px-6 text-[#003666] font-semibold text-xl text-center">{t("orders.orderDate") ?? "تاريخ الطلب"}</th>
              <th className="py-4 px-6 text-[#003666] font-semibold text-xl text-center">{t("orders.account") ?? "الحساب"}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
          <tr
            key={index}
            className="
              relative
              border-[0.5px]
              border-gray-200
              hover:border-gray-300
              hover:bg-gray-100
              transition duration-300
              cursor-pointer
            "
            onClick={() => setOpen(true)}
            onMouseEnter={() =>
              setTooltip((prev) => ({ ...prev, visible: true }))
            }
            onMouseLeave={() =>
              setTooltip((prev) => ({ ...prev, visible: false }))
            }
            onMouseMove={(e) =>
              setTooltip({
                visible: true,
                x: e.clientX,
                y: e.clientY,
              })
            }
          >
                <td className="py-4 px-6 text-gray-800 text-xl text-center">{order.orderNumber}</td>
                <td className="py-4 px-6 text-gray-800 text-xl text-center">{order.customerName}</td>
                <td className="py-4 px-6 flex items-center justify-center">
                  <span
                    className={` flex items-center justify-center px-2 w-47 py-1.5 rounded-2xl text-lg font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-800 text-xl text-center">{order.orderDate}</td>
                <td className="py-4 px-6 text-gray-800 text-xl text-center">{order.amount}</td>
                {/* Tooltip */}
{tooltip.visible && (
  <div
    className="
      fixed
      pointer-events-none
      z-50
      bg-white
      text-[#003666]
      text-sm
      px-4 py-2
      rounded-xl
      shadow-lg
      border border-gray-200
      transition-all duration-150
    "
    style={{
      top: tooltip.y + 15,
      left: tooltip.x + 15,
    }}
  >
    {t("orders.orderDetails") ?? "تفاصيل الطلب"}
  </div>
)}
              </tr>
            ))}
          </tbody>
        </table>
        {open && (
          <OrderDetailsPopup order={OrderDetails} onClose={() => setOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default OrdersTable;