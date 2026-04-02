"use client";
import { useState } from "react";
import { PlusIcon } from "@/app/icons/icons";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import CategoriesTable from "./CategoriesTable";
import AddNewCat from "./AddNewCat";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname();
  const locale = pathname?.split("/")[1];
  const isRTL = locale === "ar";
  

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [addNewCat, setAddNewCat] = useState(false);


  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="h-screen flex flex-col">

      {/* Categories Header */}
      <header className="bg-[#CCE7FF] py-3 px-8 h-30.25 flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{t("categories.title")}</h1>
          <p className="text-2xl font-semibold text-[#666666]">{t("categories.subTitle")}</p>
        </div>
        <div>
          <button
            onClick={() => setAddNewCat(true)}
            className="py-1 px-5 bg-[#0088FF] rounded-lg text-white flex items-center gap-2 hover:bg-[#0065be] active:scale-95 transition"
          >
            <PlusIcon />
            {t("products.addNew")}
          </button>
        </div>
      </header>

      <section className="p-8 flex-1 overflow-y-auto">
        <CategoriesTable />
      </section>

      {addNewCat && (
        <AddNewCat 
        onClose={() => setAddNewCat(false)}
        />
      )}

    </div>
  );
};

export default page;