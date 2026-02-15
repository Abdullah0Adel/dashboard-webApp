import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React from 'react'

const BrsandSection: React.FC = () => {
  const t = useTranslations();

    const pathname = usePathname();
    const locale = pathname?.split("/")[1];
  
      const isRTL = locale === "ar";
    
  return (
    <div>
        <form 
        className='px-5 flex flex-col gap-7.5 items-start '
        >

            {/* Brand Name */}
            <div className="w-[75%] ">
              <label htmlFor="brandName" className="block text-lg font-medium mb-2">
                {t("settings.storeName")}
              </label>
              <input
                type="text"
                id="brandName"
                className="w-full px-4 py-2 border-[0.5px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter brand name"
              />
            </div>
                        <div className="w-[75%]">
              <label htmlFor="brandName" className="block text-lg font-medium mb-2">
                {t("settings.subdomain")}
              </label>
              <input
                type="text"
                id="brandName"
                className="w-full px-4 py-2 border-[0.5px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter brand name"
              />
            </div>
                        <div className="w-[75%]">
              <label htmlFor="brandName" className="block text-lg font-medium mb-2">
                {t("settings.logo")}
              </label>
              <input
                type="text"
                id="brandName"
                className="w-full px-4 py-2 border-[0.5px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter brand name"
              />
            </div>

            <div className='w-[75%]'>
              <button className='p-3 rounded-xl flex justify-center items-center bg-[#0088FF] text-white w-full hover:bg-[#006cca] active:scale-95 transition duration-300 '>
                {t("settings.saveSettings")}
              </button>
            </div>
        </form>
    </div>
  )
}

export default BrsandSection
