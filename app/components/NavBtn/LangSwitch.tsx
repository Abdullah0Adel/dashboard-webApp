"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LangSwitch = ({ langText }: { langText?: string }) => {
    const locale = useLocale();
    const t = useTranslations();
    const pathname = usePathname();
    const router = useRouter();

    const pathnameWithoutLocale =
        pathname.replace(/^\/(ar|en)/, "") || "/";

    const handleLanguageChange = () => {
        const newLocale = locale === "ar" ? "en" : "ar";
        router.push(`/${newLocale}${pathnameWithoutLocale}`);
    };

    useEffect(() => {
        const dir = locale === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = locale;
        document.documentElement.dir = dir;
    }, [locale]);

    return (
        <div
            onClick={handleLanguageChange}
            className="border-2 border-[#99CFFF] rounded-md p-1 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#387aff] hover:border-[#387aff] active:bg-[#387aff] active:text-white transition duration-300 text-black"
        >
            {langText && <span className="font-semibold  lg:flex hidden ">{langText}</span>}
            <img src="/language-svgrepo-com.svg" className="w-6 h-6" alt="language" />
        </div>
    );
};

export default LangSwitch;
