"use client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

// --- Category Icons ---
const ManIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10" fill="#2196F3">
    <circle cx="12" cy="4" r="2.5" />
    <path d="M10 8.5h4a1 1 0 011 1v5.5H13.5V20h-3v-5H9V9.5a1 1 0 011-1z" />
  </svg>
);
const WomanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10" fill="#2196F3">
    <circle cx="12" cy="4" r="2.5" />
    <path d="M10 8.5h4a1 1 0 011 1v5.5H13.5V20h-3v-5H9V9.5a1 1 0 011-1z" />
    <path d="M8.5 14l-1.5 2h10l-1.5-2z" />
  </svg>
);
const KidsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="#2196F3" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <circle cx="9" cy="10.5" r="1" fill="#2196F3" stroke="none" />
    <circle cx="15" cy="10.5" r="1" fill="#2196F3" stroke="none" />
    <path strokeLinecap="round" d="M9 15s1 1.5 3 1.5 3-1.5 3-1.5" />
    <path strokeLinecap="round" d="M9 6.5C9 6.5 10 5 12 5s3 1.5 3 1.5" />
  </svg>
);
const BabyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="#2196F3" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <circle cx="9" cy="11" r="1" fill="#2196F3" stroke="none" />
    <circle cx="15" cy="11" r="1" fill="#2196F3" stroke="none" />
    <path strokeLinecap="round" d="M9 15s1 1 3 1 3-1 3-1" />
    <path strokeLinecap="round" d="M15 6c1-1 3-.5 3 1" />
  </svg>
);

const iconOptions = [
  { key: "man",   label: "Man",   icon: <ManIcon />   },
  { key: "woman", label: "Woman", icon: <WomanIcon /> },
  { key: "kids",  label: "Kids",  icon: <KidsIcon />  },
  { key: "baby",  label: "Baby",  icon: <BabyIcon />  },
];

type Category = {
  id: number;
  nameAr: string;
  nameEn: string;
  iconKey?: string;
};

const EditModal = ({
  cat,
  onClose,
  onSave,
}: {
  cat: Category;
  onClose: () => void;
  onSave: (nameAr: string, nameEn: string, iconKey: string) => void;
}) => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = useTranslations();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pathname = usePathname();
    const locale = pathname?.split("/")[1];
    const isRTL = locale === "ar";

  const [nameAr, setNameAr] = useState(cat.nameAr);
  const [nameEn, setNameEn] = useState(cat.nameEn);
  const [selectedIcon, setSelectedIcon] = useState(cat.iconKey ?? "man");

  return (
    <div className="  fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div dir={isRTL ? "rtl" : "ltr"} className="w-175 bg-white rounded-2xl shadow-2xl max-w-lg mx-4 overflow-hidden">

        {/* Body */}
        <div className=" p-8 flex flex-col gap-6">

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-start">تعديل التصنيف</h2>

          {/* Arabic Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 text-right">اسم التصنيف</label>
            <input
              dir="rtl"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800"
              placeholder="اسم التصنيف"
            />
          </div>

          {/* English Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 text-start">Category Name</label>
            <input
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800"
              placeholder="Category name"
            />
          </div>

          {/* Icon Selector */}
          <div className="flex flex-col gap-3 justify-start">
            <label className="text-sm font-medium text-gray-700 text-start"> (Icon)الرمز</label>
            <div className="grid grid-cols-2 gap-3">
              {iconOptions.map(({ key, icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedIcon(key)}
                  className={`flex items-center justify-center py-5 rounded-xl border-2 transition-all
                    ${selectedIcon === key
                      ? "border-blue-400 bg-blue-50"
                      : "border-transparent bg-blue-50/60 hover:bg-blue-100/60"
                    }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onSave(nameAr, nameEn, selectedIcon)}
              className="flex-1 py-3 rounded-xl bg-[#0088FF] text-white font-semibold hover:bg-[#0065be] active:scale-95 transition text-lg"
            >
              حفظ التعديل
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 active:scale-95 transition text-lg"
            >
              الغاء
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditModal;