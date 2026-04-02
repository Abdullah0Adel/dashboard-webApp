
"use client";
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React from 'react'

const AddNewCat = ({
  onClose,
}: {
  onClose: () => void;
}) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const t = useTranslations();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const pathname = usePathname();
        const locale = pathname?.split("/")[1];
        const isRTL = locale === "ar";
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
            //   value={nameAr}
            //   onChange={(e) => setNameAr(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800"
              placeholder="اسم التصنيف"
            />
          </div>

          {/* English Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 text-start">Category Name</label>
            <input
            //   value={nameEn}
            //   onChange={(e) => setNameEn(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800"
              placeholder="Category name"
            />
          </div>

          {/* Icon Selector */}
          <div className="flex flex-col gap-3 justify-start">
            <label className="text-sm font-medium text-gray-700 text-start"> (Icon)الرمز</label>
            <div className="grid grid-cols-2 gap-3">
              {/* {iconOptions.map(({ key, icon }) => (
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
              ))} */}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
            //   onClick={() => onSave(nameAr, nameEn, selectedIcon)}
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
  )
}

export default AddNewCat
