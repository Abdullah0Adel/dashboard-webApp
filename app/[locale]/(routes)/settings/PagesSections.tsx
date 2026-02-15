import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const PagesSections = () => {

    
        const t = useTranslations();
      
          const pathname = usePathname();
          const locale = pathname?.split("/")[1];
        
            const isRTL = locale === "ar";
        
        const [isMainOn, setIsMainOn] = useState(true);
        const [isProductOpen, setIsProductOPen] = useState(true);
        const [isAboutOpen, setIsAboutOpen] = useState(true);
        const [isContact, setIsContact] = useState(true);

        const [isMainSectionOpen, setIsMainSectionOpen] = useState(true);
        const [isFeaturedSection, setIsFeaturedSection] = useState(true);
        const [isCatOpen, setIsCatOpen] = useState(true);
        const [isTestOpen, setIsTestOpen] = useState(true);
    
  return (
    <div 
    dir={isRTL ? "rtl" : "ltr"}
    className='flex flex-col items-start justify-between gap-20 '
    >
    {/* Payment Method */}
    <section className='w-full flex flex-col items-start justify-between gap-7.5  '>
      <h1 className='text-4xl font-bold mb-15'> {t("settings.availablePages")} </h1>

      <div className='w-full flex justify-between items-center  '>
        <div className='flex items-center gap-4 '>
          <h2 className='text-2xl '> {t("settings.main")} </h2>
        </div>
        <div>
          <button
          onClick={() => setIsMainOn(!isMainOn)}
          className={`relative w-20 h-7.5 rounded-full transition-colors duration-300
          ${isMainOn ? 'bg-green-500' : 'bg-gray-400'}
          `}
          >
            <span 
            className={`absolute  -top-0.5 w-8 h-8 bg-white rounded-full shadow-md shadow-gray-400 transition-transform duration-300
            ${isMainOn ?
              isRTL ?
              'translate-x-11' : '-translate-x-11'
              :
              isRTL ?
              '-translate-x-3' : 'translate-x-3'}`}></span>
          </button>
        </div>
      </div>
      {/* ---- */}
            <div className='w-full flex justify-between items-center  '>
        <div className='flex items-center gap-4 '>
          <h2 className='text-2xl '> {t("settings.products")} </h2>
        </div>
        <div>
          <button
          onClick={() => setIsProductOPen(!isProductOpen)}
          className={`relative w-20 h-7.5 rounded-full transition-colors duration-300
          ${isProductOpen ? 'bg-green-500' : 'bg-gray-400'}
          `}
          >
            <span 
            className={`absolute  -top-0.5 w-8 h-8 bg-white rounded-full shadow-md shadow-gray-400 transition-transform duration-300
            ${isProductOpen ?
              isRTL ?
              'translate-x-11' : '-translate-x-11'
              :
              isRTL ?
              '-translate-x-3' : 'translate-x-3'}`}></span>
          </button>
        </div>
      </div>
      {/* ---- */}

      <div className='w-full flex justify-between items-center  '>
        <div className='flex items-center gap-4 '>
          <h2 className='text-2xl '> {t("settings.aboutUs")} </h2>
        </div>
        <div>
          <button
          onClick={() => setIsAboutOpen(!isAboutOpen)}
          className={`relative w-20 h-7.5 rounded-full transition-colors duration-300
          ${isAboutOpen ? 'bg-green-500' : 'bg-gray-400'}
          `}
          >
            <span 
            className={`absolute  -top-0.5 w-8 h-8 bg-white rounded-full shadow-md shadow-gray-400 transition-transform duration-300
            ${isAboutOpen ?
              isRTL ?
              'translate-x-11' : '-translate-x-11'
              :
              isRTL ?
              '-translate-x-3' : 'translate-x-3'}`}></span>
          </button>
        </div>
      </div>
      {/* ---- */}

      <div className='w-full flex justify-between items-center  '>
        <div className='flex items-center gap-4 '>
          <h2 className='text-2xl '> {t("settings.contactUs")} </h2>
        </div>
        <div>
          <button
          onClick={() => setIsContact(!isContact)}
          className={`relative w-20 h-7.5 rounded-full transition-colors duration-300
          ${isContact ? 'bg-green-500' : 'bg-gray-400'}
          `}
          >
            <span 
            className={`absolute  -top-0.5 w-8 h-8 bg-white rounded-full shadow-md shadow-gray-400 transition-transform duration-300
            ${isContact ?
              isRTL ?
              'translate-x-11' : '-translate-x-11'
              :
              isRTL ?
              '-translate-x-3' : 'translate-x-3'}`}></span>
          </button>
        </div>
      </div>
      {/* ---- */}


      
    </section>

        <section className='w-full flex flex-col items-start justify-between gap-7.5  '>
      <h1 className='text-4xl font-bold mb-15'> {t("settings.mainPageSections")} </h1>

      <div className='w-full flex justify-between items-center  '>
        <div className='flex items-center gap-4 '>
          <h2 className='text-2xl '> {t("settings.mainSection")} </h2>
        </div>
        <div>
          <button
          onClick={() => setIsMainSectionOpen(!isMainSectionOpen)}
          className={`relative w-20 h-7.5 rounded-full transition-colors duration-300
          ${isMainSectionOpen ? 'bg-green-500' : 'bg-gray-400'}
          `}
          >
            <span 
            className={`absolute  -top-0.5 w-8 h-8 bg-white rounded-full shadow-md shadow-gray-400 transition-transform duration-300
            ${isMainSectionOpen ?
              isRTL ?
              'translate-x-11' : '-translate-x-11'
              :
              isRTL ?
              '-translate-x-3' : 'translate-x-3'}`}></span>
          </button>
        </div>
      </div>
      {/* ---- */}
            <div className='w-full flex justify-between items-center  '>
        <div className='flex items-center gap-4 '>
          <h2 className='text-2xl '> {t("settings.featuredSection")} </h2>
        </div>
        <div>
          <button
          onClick={() => setIsFeaturedSection(!isFeaturedSection)}
          className={`relative w-20 h-7.5 rounded-full transition-colors duration-300
          ${isFeaturedSection ? 'bg-green-500' : 'bg-gray-400'}
          `}
          >
            <span 
            className={`absolute  -top-0.5 w-8 h-8 bg-white rounded-full shadow-md shadow-gray-400 transition-transform duration-300
            ${isFeaturedSection ?
              isRTL ?
              'translate-x-11' : '-translate-x-11'
              :
              isRTL ?
              '-translate-x-3' : 'translate-x-3'}`}></span>
          </button>
        </div>
      </div>
      {/* ---- */}

      <div className='w-full flex justify-between items-center  '>
        <div className='flex items-center gap-4 '>
          <h2 className='text-2xl '> {t("settings.categories")} </h2>
        </div>
        <div>
          <button
          onClick={() => setIsCatOpen(!isCatOpen)}
          className={`relative w-20 h-7.5 rounded-full transition-colors duration-300
          ${isCatOpen ? 'bg-green-500' : 'bg-gray-400'}
          `}
          >
            <span 
            className={`absolute  -top-0.5 w-8 h-8 bg-white rounded-full shadow-md shadow-gray-400 transition-transform duration-300
            ${isCatOpen ?
              isRTL ?
              'translate-x-11' : '-translate-x-11'
              :
              isRTL ?
              '-translate-x-3' : 'translate-x-3'}`}></span>
          </button>
        </div>
      </div>
      {/* ---- */}

      <div className='w-full flex justify-between items-center  '>
        <div className='flex items-center gap-4 '>
          <h2 className='text-2xl '> {t("settings.testimonials")} </h2>
        </div>
        <div>
          <button
          onClick={() => setIsTestOpen(!isTestOpen)}
          className={`relative w-20 h-7.5 rounded-full transition-colors duration-300
          ${isTestOpen ? 'bg-green-500' : 'bg-gray-400'}
          `}
          >
            <span 
            className={`absolute  -top-0.5 w-8 h-8 bg-white rounded-full shadow-md shadow-gray-400 transition-transform duration-300
            ${isTestOpen ?
              isRTL ?
              'translate-x-11' : '-translate-x-11'
              :
              isRTL ?
              '-translate-x-3' : 'translate-x-3'}`}></span>
          </button>
        </div>
      </div>
      {/* ---- */}


      
    </section>


    {/* Shippment Policies */}
      <div className='w-[75%]'>
        <button className='p-3 rounded-xl flex justify-center items-center bg-[#0088FF] text-white w-full hover:bg-[#006cca] active:scale-95 transition duration-300 '>
          {t("settings.saveSettings")}
        </button>
      </div>



    </div>
  )
}

export default PagesSections
