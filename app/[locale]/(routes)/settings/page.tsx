"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react'
import { usePathname } from "next/navigation";

const page = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const locale = pathname?.split("/")[1];
  const t = useTranslations();

    const isRTL = locale === "ar";
  
  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
    >
      <header className='bg-[#CCE7FF] py-3 px-8 h-30.25 flex items-center justify-center '>
        <h1 className='text-3xl font-bold'>{t("settings.title")}</h1>
      </header>

      <section className='p-8'>

        {/* Section Headrer*/}
        <div>
          <h2 className='text-2xl font-semibold mb-6'>{t("settings.header")}</h2>
          
        </div>
      </section>
    </div>
  )
}

export default page
