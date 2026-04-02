"use client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import EditModal from "./EditModal";
import { EditIcon, TrashIcon } from "@/app/icons/icons";
import DeleteModal from "./DeleteModal";

// --- Icons ---


// --- Category Icons ---
const WomanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
    <circle cx="12" cy="4" r="2" />
    <path d="M10 8h4a1 1 0 011 1v5h-1.5v5h-3v-5H9V9a1 1 0 011-1z" />
    <path d="M9 13l-1.5 2h9L15 13" />
  </svg>
);
const ManIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
    <circle cx="12" cy="4" r="2" />
    <path d="M10 8h4a1 1 0 011 1v5h-1.5v5h-3v-5H9V9a1 1 0 011-1z" />
  </svg>
);
const KidsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
    <path strokeLinecap="round" d="M9 15s1 1.5 3 1.5 3-1.5 3-1.5" />
    <path strokeLinecap="round" d="M9 6.5C9 6.5 10 5 12 5s3 1.5 3 1.5" />
  </svg>
);
const BabyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
    <path strokeLinecap="round" d="M9 15s1 1 3 1 3-1 3-1" />
    <path strokeLinecap="round" d="M15 6c1-1 3-.5 3 1" />
  </svg>
);

// --- Types ---
type Category = {
  id: number;
  nameAr: string;
  nameEn: string;
  icon: React.ReactNode;
};

  // eslint-disable-next-line react-hooks/rules-of-hooks


const initialCategories: Category[] = [
  { id: 1, nameAr: "حريمى",    nameEn: "Woman", icon: <WomanIcon /> },
  { id: 2, nameAr: "رجالى",    nameEn: "Man",   icon: <ManIcon />  },
  { id: 3, nameAr: "اطفالى",   nameEn: "Kids",  icon: <KidsIcon /> },
  { id: 4, nameAr: "طفل رضيع", nameEn: "Baby",  icon: <BabyIcon /> },
];

// --- CategoriesTable Component ---
const CategoriesTable = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname();
  const locale = pathname?.split("/")[1];
  const isRTL = locale === "ar";

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editTarget, setEditTarget] = useState<null | Category>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<null | number>(null);

  const openDelete = (id: number) => {
    setDeleteTargetId(id);
    setDeleteOpen(true);
  }
  const handleDelete = () => {
    if (deleteTargetId !== null) {
      setCategories((prev) => prev.filter((c) => c.id !== deleteTargetId));
    }
    setDeleteTargetId(null);
    setDeleteOpen(false);
  };

  const handleEdit = (cat: Category) => {
    setEditTarget(cat);
    setModalOpen(true);
  };

  const handleSave = (nameAr: string, nameEn: string) => {
    if (editTarget) {
      setCategories((prev) =>
        prev.map((c) => c.id === editTarget.id ? { ...c, nameAr, nameEn } : c)
      );
    }
    setEditTarget(null);
    setModalOpen(false);
  };


  return (
    <>
        {/* Filter bar */}
        <div className="px-6 py-4  flex justify-start">
          <span className=" font-medium text-2xl  px-3 py-1 rounded-full">
            جميع الفئات
          </span>
        </div>
      {/* Table Card */}
      <div
      dir={isRTL ? "rtl" : "ltr" }
      className="bg-[#E5F3FF80] rounded-2xl shadow-sm border border-[#99CFFF] overflow-hidden">


        {/* Table */}
        <table className="w-full text-start">
          <thead>
            <tr className="bg-[#E5F3FF80] border-b border-[#99CFFF] ">
              <th className="py-4 px-6 text-2xl font-semibold text-[#003666] text-center">رمز</th>
              <th className="py-4 px-6 text-2xl font-semibold text-[#003666] text-center">الاسم</th>
              <th className="py-4 px-6 text-2xl font-bold text-[#003666] text-center">name</th>
              <th className="py-4 px-6 text-2xl font-semibold text-[#003666] text-center">الاكشن</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className={`border-t border-none hover:bg-blue-50/40 transition-colors`}
              >
                {/* Icon */}
                <td className="py-4 px-6 text-gray-800 flex items-center justify-center ">
                  {cat.icon}
                </td>

                                {/* Arabic Name */}
                <td className="py-4 px-6 text-gray-700 font-medium text-center">
                  {cat.nameAr}
                </td>


                                {/* English Name */}
                <td className="py-4 px-6 text-center text-gray-700 font-medium">
                  {cat.nameEn}
                </td>


                {/* Actions */}
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-5 ">
                    <button
                      onClick={() => handleEdit(cat)}
                      className=" text-blue-600   hover:text-blue-400 active:scale-90 transition h-9 w-9"
                      title="تعديل"
                    >
                      <EditIcon/>
                    </button>
                    <button
                      onClick={() => openDelete(cat.id)}
                      className=" text-red-400  hover:text-red-600 active:scale-90 transition h-9 w-9"
                      title="حذف"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>





              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="py-16 text-center text-gray-400 text-sm">
                  لا توجد فئات.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {modalOpen && editTarget && (
        <EditModal
          cat={editTarget}
          onClose={() => { setModalOpen(false); setEditTarget(null); }}
          onSave={handleSave}
        />
      )}

      {/* Delete Modal */}
      {deleteOpen && (
        <DeleteModal
        onClose={() => {setDeleteOpen(false); setDeleteTargetId(null);}}
        onConfirm={handleDelete}
        />
      )}

      {/* Add New Modal */}


    </>
  );
};

// --- Edit Modal ---
// const EditModal = ({
//   cat,
//   onClose,
//   onSave,
// }: {
//   cat: Category;
//   onClose: () => void;
//   onSave: (nameAr: string, nameEn: string) => void;
// }) => {
//   const [nameAr, setNameAr] = useState(cat.nameAr);
//   const [nameEn, setNameEn] = useState(cat.nameEn);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
//         <h2 className="text-xl font-bold text-gray-800 mb-6 text-right">تعديل الفئة</h2>
//         <div className="flex flex-col gap-4">
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-medium text-gray-600 text-right">الاسم (عربي)</label>
//             <input
//               dir="rtl"
//               value={nameAr}
//               onChange={(e) => setNameAr(e.target.value)}
//               className="border border-gray-200 rounded-xl px-4 py-2.5 text-right focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-medium text-gray-600 text-right">Name (English)</label>
//             <input
//               value={nameEn}
//               onChange={(e) => setNameEn(e.target.value)}
//               className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             />
//           </div>
//         </div>
//         <div className="flex gap-3 mt-8 justify-end">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition font-medium"
//           >
//             إلغاء
//           </button>
//           <button
//             onClick={() => onSave(nameAr, nameEn)}
//             className="px-6 py-2 rounded-xl bg-[#0088FF] text-white hover:bg-[#0065be] active:scale-95 transition font-medium"
//           >
//             حفظ
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default CategoriesTable;