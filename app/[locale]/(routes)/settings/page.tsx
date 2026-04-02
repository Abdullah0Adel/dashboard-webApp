"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react'
import { usePathname } from "next/navigation";
import BrsandSection from './BrsandSection';
import PaymentShipping from './PaymentShipping';
import PagesSections from './PagesSections';

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isCollapsed, setIsCollapsed] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeSelection, setActiveSelection] = useState<"brand" | "payment&Shipping" | "pages&sections">("brand");

  console.log("Active Selection:", activeSelection);
  const pathname = usePathname();
  const locale = pathname?.split("/")[1];

    const isRTL = locale === "ar";
  
  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="h-screen flex flex-col"
    >
      <header className='bg-[#CCE7FF] py-3 px-8 h-30.25 flex items-center justify-center '>
        <h1 className='text-3xl font-bold'>{t("settings.title")}</h1>
      </header>

      <section className='p-8 flex-1 overflow-y-auto'>

        {/* Section Headrer*/}
        <div>
          <h2 className='text-2xl font-semibold mb-6'>{t("settings.header")}</h2>
          
          <div className='w-full flex gap-8 border border-[#006DCC] rounded-lg px-7.5 py-3 my-12 '>

            <button 
            onClick={() => setActiveSelection("brand")}
            className={`
            w-full px-5 py-1 rounded-md  h-13 text-2xl cursor-pointer   active:scale-95 transition duration-300 
            ${activeSelection === "brand" ? "bg-[#99CFFF] hover:bg-[#80c2fb]" : "bg-[#E5F3FF] hover:bg-[#CCE7FF]"}
            `}>
              {t("settings.brand")}
            </button>

            <button 
            onClick={() => setActiveSelection("payment&Shipping")}
            className={`
            w-full px-5 py-1 rounded-md  h-13 text-2xl cursor-pointer  active:scale-95 transition duration-300 
            ${activeSelection === "payment&Shipping" ? "bg-[#99CFFF] hover:bg-[#80c2fb]" : "bg-[#E5F3FF] hover:bg-[#CCE7FF]"}
            `}>
              {t("settings.Payment&Shipping")}
            </button>

            <button 
            
            onClick={() => setActiveSelection("pages&sections")}
            className={`
            w-full px-5 py-1 rounded-md  h-13 text-2xl cursor-pointer  active:scale-95 transition duration-300 
            ${activeSelection === "pages&sections" ? "bg-[#99CFFF] hover:bg-[#80c2fb]" : "bg-[#E5F3FF] hover:bg-[#CCE7FF]"}
            `}>
              {t("settings.pages&sections")}
            </button>
          </div>
        </div>

        {/* Section Content */}
        <div className="mt-8">
          {activeSelection === "brand" && (
            <>
            <BrsandSection />
            </>
          )}
          {activeSelection === "payment&Shipping" && (
            <>
            <PaymentShipping />
            </>
          )}
          {activeSelection === "pages&sections" && (
            <>
            <PagesSections />
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default page
