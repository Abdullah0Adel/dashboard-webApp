"use client";
import { useState } from "react";
import { Promocodes } from "./types";
import ShippingZonesTable from "./PromocodesTable";
import ZoneModal from "./PromocodesModal";
import { PlusIcon } from "@/app/icons/icons";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import DeleteConfirmModal from "./DeleteConfirmModal";

const initialZones: Promocodes[] = [
  { id: 1, promocode: "welcome20", distype: "prcentage", discount: "20", usage: "45/100", expireDate: "20/1/2026", status:true },
  { id: 2, promocode: "MR2026",    distype: "coin", discount: "50",  usage: "10/20", expireDate: "30/1/2026", status:false },
];

export default function ShippingZonesPage() {



    const t = useTranslations();// eslint-disable-next-line react-hooks/rules-of-hooks
    const pathname = usePathname();
    const locale = pathname?.split("/")[1];
    const isRTL = locale === "ar";
    
  
const [zones, setZones]                   = useState<Promocodes[]>(initialZones);
  const [modalOpen, setModalOpen]           = useState(false);
  const [editTarget, setEditTarget]         = useState<Promocodes | null>(null);
  const [deleteTarget, setDeleteTarget]     = useState<number | null>(null);

  // اضافة
  const handleAdd = () => { setEditTarget(null); setModalOpen(true); };

  // فتح popup التأكيد
  const handleDeleteRequest = (id: number) => setDeleteTarget(id);

  // تأكيد الحذف
  const handleDeleteConfirm = () => {
    if (deleteTarget !== null) {
      setZones(prev => prev.filter(z => z.id !== deleteTarget));
      setDeleteTarget(null);
    }
  };

  const handleEdit = (zone: Promocodes) => { setEditTarget(zone); setModalOpen(true); };

  const handleSave = (data: Omit<Promocodes, "id">) => {
    if (editTarget) {
      setZones(prev => prev.map(z => z.id === editTarget.id ? { ...z, ...data } : z));
    } else {
      setZones(prev => [...prev, { id: Date.now(), ...data }]);
    }
    setModalOpen(false);
    setEditTarget(null);
  };
  
  
  return (
   <div dir={isRTL ? "rtl" : "ltr"}  className="min-h-screen bg-white  flex flex-col gap-6">

      {/* Header */}
      <header className="bg-[#CCE7FF] py-3 px-8 h-30.25 flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{t("promocodes.title")}</h1>
        </div>
        <div>
          <button
            onClick={handleAdd}
            className="py-2 px-5.75 bg-[#0088FF] rounded-lg text-2xl text-white flex items-center gap-2 hover:bg-[#0065be] active:scale-95 transition"
          >
            <PlusIcon />
            {t("products.addNew")}
          </button>
        </div>
      </header>

      {/* Table */}
      <div className="px-10">
      <ShippingZonesTable
        promos={zones}
        onDelete={handleDeleteRequest}
        onEdit={handleEdit}
      />
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <ZoneModal
          initial={editTarget ?? undefined}
          onClose={() => { setModalOpen(false); setEditTarget(null); }}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirm Popup */}
      {deleteTarget !== null && (
        <DeleteConfirmModal
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteTarget(null)}
        />
      )}

    </div>
  );
}
