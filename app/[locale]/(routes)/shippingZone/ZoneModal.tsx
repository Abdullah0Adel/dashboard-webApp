"use client";
import { useState } from "react";
import { ShippingZone } from "./types";

interface ZoneModalProps {
  initial?: ShippingZone;
  onClose: () => void;
  onSave: (data: Omit<ShippingZone, "id">) => void;
}

const ZoneModal = ({ initial, onClose, onSave }: ZoneModalProps) => {
  const [nameAr, setNameAr] = useState(initial?.nameAr ?? "");
  const [nameEn, setNameEn] = useState(initial?.nameEn ?? "");
  const [cost,   setCost]   = useState(initial?.cost ?? 0);
  const [days,   setDays]   = useState(initial?.days ?? 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div dir="rtl" className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 flex flex-col gap-5">

        <h2 className="text-xl font-bold text-gray-800">
          {initial ? "تعديل منطقة الشحن" : "إضافة منطقة شحن"}
        </h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">اسم المنطقه</label>
          <input value={nameAr} onChange={e => setNameAr(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-right"
            placeholder="مثال: القاهره" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Zone name</label>
          <input value={nameEn} onChange={e => setNameEn(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="e.g. cairo" dir="ltr" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">تكلفه الشحن (جنيه)</label>
          <input type="number" value={cost} onChange={e => setCost(Number(e.target.value))}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-right"
            placeholder="50" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">تسليم خلال (يوم)</label>
          <input type="number" value={days} onChange={e => setDays(Number(e.target.value))}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-right"
            placeholder="1" />
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={() => onSave({ nameAr, nameEn, cost, days })}
            className="flex-1 py-2.5 rounded-xl bg-[#0088FF] text-white font-semibold hover:bg-[#0065be] active:scale-95 transition">
            حفظ
          </button>
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 active:scale-95 transition">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoneModal;