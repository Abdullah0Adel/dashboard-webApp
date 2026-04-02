"use client";
import { useState } from "react";
import { Promocodes } from "./types";

interface PromocodesModalProps {
  initial?: Promocodes;
  onClose: () => void;
  onSave: (data: Omit<Promocodes, "id">) => void;
}

const PromocodesModal = ({ initial, onClose, onSave }: PromocodesModalProps) => {
  const [promocode, setPromocode] = useState(initial?.promocode ?? "");
  const [distype,   setDistype]   = useState(initial?.distype   ?? "percentage");
  const [discount,  setDiscount]  = useState(initial?.discount  ?? "");
  const [usage,     setUsage]     = useState(initial?.usage     ?? "");
  const [expireDate,setExpireDate]= useState(initial?.expireDate ?? "");
  const [status,    setStatus]    = useState(initial?.status    ?? true);

  const handleSave = () => {
    onSave({ promocode, distype, discount, usage, expireDate, status });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div dir="rtl" className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 flex flex-col gap-5">

        <h2 className="text-xl font-bold text-gray-800">
          {initial ? "تعديل الكود" : "إضافة بروموكود"}
        </h2>

        {/* Promocode */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">الكود</label>
          <input
            value={promocode}
            onChange={e => setPromocode(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-right"
            placeholder="مثال: WELCOME20"
            dir="ltr"
          />
        </div>

        {/* Discount Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">نوع الخصم</label>
          <select
            value={distype}
            onChange={e => setDistype(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-right bg-white"
          >
            <option value="percentage">نسبة مئوية (percentage)</option>
            <option value="coin">مبلغ ثابت (coin)</option>
          </select>
        </div>

        {/* Discount Value */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">
            قيمة الخصم {distype === "percentage" ? "(%)" : "(جنيه)"}
          </label>
          <input
            value={discount}
            onChange={e => setDiscount(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-right"
            placeholder={distype === "percentage" ? "20" : "50"}
            type="number"
          />
        </div>

        {/* Usage */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">الاستخدام (مستخدم/إجمالي)</label>
          <input
            value={usage}
            onChange={e => setUsage(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-right"
            placeholder="مثال: 45/100"
            dir="ltr"
          />
        </div>

        {/* Expire Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">تاريخ الانتهاء</label>
          <input
            value={expireDate}
            onChange={e => setExpireDate(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-right"
            placeholder="20/1/2026"
            dir="ltr"
          />
        </div>

        {/* Status Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStatus(prev => !prev)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              status ? "bg-[#0088FF]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                status ? "right-1" : "left-1"
              }`}
            />
          </button>
          <label className="text-sm font-medium text-gray-600">
            الحالة: <span className={status ? "text-green-600" : "text-red-500"}>{status ? "مفعّل" : "معطّل"}</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-[#0088FF] text-white font-semibold hover:bg-[#0065be] active:scale-95 transition"
          >
            حفظ
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 active:scale-95 transition"
          >
            إلغاء
          </button>
        </div>

      </div>
    </div>
  );
};

export default PromocodesModal;