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
        <h1 className='text-3xl font-bold'>الاعدادات</h1>
      </header>
    </div>
  )
}

export default page
