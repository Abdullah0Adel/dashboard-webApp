import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React from 'react'

interface ProductDeleteProps {
  id: string;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDelete: React.FC<ProductDeleteProps> = ({ id, onDelete, isOpen, onClose }) => {


  const pathname = usePathname();
  const locale = pathname?.split("/")[1];
  const t = useTranslations();
  
  const isRTL = locale === "ar";
  
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
  
    >
      {/* BackDrop */}
      <div
      className='absolute inset-0 bg-[#00000020] backdrop-blur-sm'
      onClick={onClose}
      />

      {/* Modal */}
      <div 
      dir={isRTL ? "rtl" : "ltr" }
      className='flex flex-col justify-between items-start gap-8 w-187.5 z-10 rounded-lg bg-white py-12 px-8 shadow-lg'>

        {/* Header */}
        <div className='flex gap-4  '>
        <h1 className='text-[32px] font-bold text-[#FF383C] '> {t("DeleteProduct.title")} </h1>
        </div>

        {/* Confirm */}
        <p> {t("DeleteProduct.confirmation")} </p>

        <div className='w-full flex justify-between items-center gap-5 '>
          <button
          className='p-4 h-16.25 bg-white w-1/2 rounded-lg text-[#0088FF] font-medium text-[20px] border border-[#0088FF] hover:bg-[#0088ff2a] active:scale-95 transition duration-300 '
          onClick={onClose}
          > 
            {t("DeleteProduct.cancel")} 
          </button>

          <button
          className='p-4 h-16.25 bg-[#0088FF] w-1/2 rounded-lg text-white font-medium text-[20px] hover:bg-[#004c8f]  active:scale-95 transition duration-300 '
          onClick={() => onDelete(id)}
          >
             {t("DeleteProduct.delete")} 
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDelete
