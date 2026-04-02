import React from 'react'

const DeleteModal = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-end gap-3 mb-6">
          <h2 className="text-2xl font-bold text-red-500">حذف تصنيف</h2>
          <div className="text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 9l6 6M15 9l-6 6" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Body */}
        <p className="text-gray-700 text-lg text-center mb-8">
          هل تريد حذف التصنيف ؟
        </p>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-2xl bg-[#0088FF] text-white text-lg font-semibold hover:bg-[#0065be] active:scale-95 transition"
          >
            حذف
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl border border-gray-300 text-gray-600 text-lg font-medium hover:bg-gray-50 active:scale-95 transition"
          >
            الغاء
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
