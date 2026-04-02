"use client";

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteConfirmModal = ({ onConfirm, onClose }: DeleteConfirmModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div dir="rtl" className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 flex flex-col gap-5 border border-gray-100">

        {/* Title */}
        <div className="flex items-center justify-end gap-2">
          <h2 className="text-xl font-bold text-red-500">حذف منطقه الشحن</h2>
          {/* Trash Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" fill="#FF3B30" />
            <path strokeLinecap="round" strokeLinejoin="round" stroke="white" strokeWidth={2.5}
              d="M6 8h12M10 8V6h4v2M9 12l1 5M15 12l-1 5" />
          </svg>
        </div>

        {/* Message */}
        <p className="text-gray-700 text-base text-right">
          هل تريد حذف منطقه الشحن ؟
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-[#0088FF] text-white font-semibold text-base hover:bg-[#0065be] active:scale-95 transition"
          >
            حذف
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-base hover:bg-gray-50 active:scale-95 transition"
          >
            الغاء
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;