"use client";

import { EditIcon, TrashIcon } from "@/app/icons/icons";
import { Promocodes } from "./types";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface PromocodesTableTableProps {
  promos: Promocodes[];
  onDelete: (id: number) => void;
  onEdit: (zone: Promocodes) => void;
}

const PromocodesTable = ({ promos, onDelete, onEdit }: PromocodesTableTableProps) => {
      const t = useTranslations();// eslint-disable-next-line react-hooks/rules-of-hooks
      // const pathname = usePathname();
      // const locale = pathname?.split("/")[1];
      // const isRTL = locale === "ar";
  return (
  <div className="border-2  border-[#99CFFF] rounded-2xl overflow-hidden bg-white">
    <table className="w-full text-right">
      <thead>
        <tr className="">
          <th className="py-5 px-6 text-center text-base font-bold text-gray-700"> {t("promocodes.codes")} </th>
          <th className="py-5 px-6 text-center text-base font-bold text-[#0088FF]"> {t("promocodes.disccount")} </th>
          <th className="py-5 px-6 text-center text-base font-bold text-gray-700"> {t("promocodes.usage")} </th>
          <th className="py-5 px-6 text-center text-base font-bold text-gray-700"> {t("promocodes.expireDate")} </th>
          <th className="py-5 px-6 text-center text-base font-bold text-gray-700"> {t("promocodes.status")} </th>
          <th className="py-5 px-6 text-center text-base font-bold text-gray-700"> {t("promocodes.Action")} </th>
        </tr>
      </thead>
      <tbody>
        {promos.map(promo => (
          <tr key={promo.id} className="  hover:bg-blue-50/40 transition-colors">
            <td className="py-4 px-6 text-center text-gray-800 text-base">{promo.promocode}</td>
            <td className="py-4 px-6 text-center text-gray-800 text-base">{promo.discount} 
              </td>
            <td className="py-4 px-6 text-center text-gray-800 text-base">{promo.usage} يوم</td>
            <td className="py-4 px-6 text-center text-gray-800 text-base">{promo.expireDate} يوم</td>
            <td className="py-4 px-6 text-center text-gray-800 text-base">{promo.status} يوم</td>
            <td className="py-4 px-6">
              <div className="flex justify-center items-center gap-8">
                <button onClick={() => onEdit(promo)} className="cursor-pointer hover:opacity-75 active:scale-90 transition w-8 h-8 text-[#0088FF] ">
                  <EditIcon />
                </button>
                <button onClick={() => onDelete(promo.id)} className="cursor-pointer hover:opacity-75 active:scale-90 transition w-8 h-8 text-[#FF383C] ">
                  <TrashIcon />
                </button>
              </div>
            </td>
          </tr>
        ))}
        {promos.length === 0 && (
          <tr>
            <td colSpan={5} className="py-16 text-center text-gray-400 text-sm">
              لا توجد مناطق شحن. أضف منطقة جديدة.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
};

export default PromocodesTable;