"use client";
import Link from 'next/link'
import { Cart } from "../../../icons/icons";
import { useTranslations } from 'next-intl';
const Recentorders = () => {
    const t = useTranslations();
    return (
        <div className='w-full p-4 mt-4 rounded-xl shadow-md bg-white'>
            <div className="flex lg:flex-row flex-col items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <Cart />
                    <h2 className="text-lg font-semibold">{t("hero.title2")}</h2>
                </div>
                <Link href="/orders" className="text-[#0088FF] px-4 py-2 rounded-lg">{t("hero.viewAll")}</Link>
            </div>
        </div>
    )
}

export default Recentorders
