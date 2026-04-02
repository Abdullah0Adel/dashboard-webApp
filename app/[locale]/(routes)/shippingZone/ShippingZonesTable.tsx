"use client";

import { EditIcon, TrashIcon } from "@/app/icons/icons";
import { ShippingZone } from "./types";

interface ShippingZonesTableProps {
  zones: ShippingZone[];
  onDelete: (id: number) => void;
  onEdit: (zone: ShippingZone) => void;
}

const ShippingZonesTable = ({ zones, onDelete, onEdit }: ShippingZonesTableProps) => (
  <div className="border-2  border-[#99CFFF] rounded-2xl overflow-hidden bg-white">
    <table className="w-full text-right">
      <thead>
        <tr className="">
          <th className="py-5 px-6 text-center text-base font-bold text-gray-700">اسم المنطقه</th>
          <th className="py-5 px-6 text-center text-base font-bold text-[#0088FF]">zone name</th>
          <th className="py-5 px-6 text-center text-base font-bold text-gray-700">تكلفه الشحن</th>
          <th className="py-5 px-6 text-center text-base font-bold text-gray-700">تسليم خلال</th>
          <th className="py-5 px-6 text-center text-base font-bold text-gray-700">الاكشن</th>
        </tr>
      </thead>
      <tbody>
        {zones.map(zone => (
          <tr key={zone.id} className="  hover:bg-blue-50/40 transition-colors">
            <td className="py-4 px-6 text-center text-gray-800 text-base">{zone.nameAr}</td>
            <td className="py-4 px-6 text-center text-gray-800 text-base font-medium">{zone.nameEn}</td>
            <td className="py-4 px-6 text-center text-gray-800 text-base">{zone.cost} جنيه</td>
            <td className="py-4 px-6 text-center text-gray-800 text-base">{zone.days} يوم</td>
            <td className="py-4 px-6">
              <div className="flex justify-center items-center gap-8">
                <button onClick={() => onEdit(zone)} className="cursor-pointer hover:opacity-75 active:scale-90 transition w-8 h-8 text-[#0088FF] ">
                  <EditIcon />
                </button>
                <button onClick={() => onDelete(zone.id)} className="cursor-pointer hover:opacity-75 active:scale-90 transition w-8 h-8 text-[#FF383C] ">
                  <TrashIcon />
                </button>
              </div>
            </td>
          </tr>
        ))}
        {zones.length === 0 && (
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

export default ShippingZonesTable;