"use client";
import React, { useState } from "react";

// --- Types ---
type OrderStatus = "مكتمل" | "قيد التنظار" | "تم الشحن";

interface Product {
  name: string;
  price: number;
}

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  address: string;
  products: Product[];
  deliveryFee: number;
  status: OrderStatus;
}

const statusOptions: OrderStatus[] = ["مكتمل", "قيد التنظار", "تم الشحن"];

const statusStyles: Record<OrderStatus, string> = {
  "مكتمل": "bg-green-100 text-green-800",
  "قيد التنظار": "bg-blue-100 text-blue-800",
  "تم الشحن": "bg-yellow-100 text-yellow-800",
};

// --- Product Icon ---
const BoxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0v10l-8 4m0-14L4 7m8 4v10" />
  </svg>
);

// --- Chevron Icon ---
const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// --- OrderDetailsModal ---
export const OrderDetailsPopup = ({
  order,
  onClose,
}: {
  order: OrderDetails;
  onClose: () => void;
}) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const subtotal = order.products.reduce((acc, p) => acc + p.price, 0);
  const total = subtotal + order.deliveryFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Layout */}
      <div  className=" absolute inset-0 bg-[#00000055]"
      onClick={onClose}
      />

      <div dir="rtl" className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">

        {/* Scrollable body */}
        <div className="max-h-[90vh] overflow-y-auto p-7 flex flex-col gap-5">

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-right">
            تفاصيل الطلب : <span className="text-black">#MR123</span>
          </h2>

          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#0088FF] text-right">اسم العميل</label>
              <div className="border border-gray-200 rounded-xl px-4 py-3 text-right text-gray-800 text-sm bg-white">
                {order.customerName}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#0088FF] text-right">الايميل</label>
              <div className="border border-gray-200 rounded-xl px-4 py-3 text-right text-gray-800 text-sm bg-white ltr:text-left" dir="ltr">
                {order.email}
              </div>
            </div>
          </div>

          {/* Row 2: Phone + Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#0088FF] text-right">التليفون</label>
              <div className="border border-gray-200 rounded-xl px-4 py-3 text-right text-gray-800 text-sm bg-white" dir="ltr">
                {order.phone}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#0088FF] text-right">التاريخ</label>
              <div className="border border-gray-200 rounded-xl px-4 py-3 text-right text-gray-800 text-sm bg-white" dir="ltr">
                {order.date}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0088FF] text-right">العنوان</label>
            <div className="border border-gray-200 rounded-xl px-4 py-3 text-right text-gray-800 text-sm bg-white">
              {order.address}
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-[#0088FF] text-right">المنتجات</label>
            <div className="flex flex-col gap-2">
              {order.products.map((product, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-800 text-sm font-medium">{product.price} جنيه</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800 text-sm">{product.name}</span>
                    <BoxIcon />
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mt-1" />

            {/* Pricing Summary */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-gray-800 text-sm font-medium">{subtotal} جنيه</span>
                <span className="text-gray-600 text-sm">: السعر</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-800 text-sm font-medium">{order.deliveryFee} جنيه</span>
                <span className="text-gray-600 text-sm">: التوصيل</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900 text-sm font-bold">{total} جنيه</span>
                <span className="text-gray-600 text-sm">: الكل</span>
              </div>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-2xl px-5 py-3 bg-white hover:bg-gray-50 transition"
            >
              <ChevronDown />
              <span className="text-[#0088FF] font-semibold text-base">حاله الطلب</span>
            </button>

            {dropdownOpen && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-10">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStatus(s); setDropdownOpen(false); }}
                    className={`w-full text-right px-5 py-3 text-sm font-medium hover:bg-gray-50 transition flex items-center justify-between ${
                      status === s ? "bg-blue-50" : ""
                    }`}
                  >
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[s]}`}>{s}</span>
                    {status === s && (
                      <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

