"use client";
import { Products } from '@/app/icons/icons';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Stockalert = () => {
  const t = useTranslations();

  return (
    <section className="w-full bg-[#FF383C26] p-4 rounded-xl mt-4">
      <div className="flex justify-between w-full">
        <nav className="flex items-center gap-2"><Image loading='lazy' src="/alert-triangle-svgrepo-com.svg" width={30} height={30} alt="stockalert" />
          <h2 className="text-lg font-semibold">{t("stockAlert.title")}</h2>
        </nav>
        <Link href="/alerts" className=" text-[#FF383C] px-4 py-2 rounded-lg">{t("stockAlert.viewAll")}</Link>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2">
            <Products />
            <p className="font-semibold">{t("stockAlert.title")}</p>
          </nav>
          <nav>
            <p className="font-semibold">8 pice</p>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Stockalert
