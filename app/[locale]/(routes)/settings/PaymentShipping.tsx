import { CashOnDelivery, Visa } from '@/app/icons/icons';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const PaymentShipping = () => {

    const t = useTranslations();
  
      const pathname = usePathname();
      const locale = pathname?.split("/")[1];
    
        const isRTL = locale === "ar";
        const [isOn, setISOn] = useState(true)
        const [isVisaOn, setISVisaOn] = useState(true)
  return (
    <>
    <div 
    dir={isRTL ? "rtl" : "ltr"}
    className='flex flex-col items-start justify-between gap-20 '
    >
    {/* Payment Method */}
    <section className='w-full flex flex-col items-start justify-between gap-7.5  '>
      <h1 className='text-4xl font-bold mb-15'> {t("settings.paymentMethod")} </h1>
      <div className='w-full flex justify-between items-center  '>
        <div className='flex items-center gap-4 '>
          <CashOnDelivery className='w-12'/>
          <h2 className='text-2xl '> {t("settings.cashOnDelivery")} </h2>
        </div>
        <div>
          <button
          onClick={() => setISOn(!isOn)}
          className={`relative w-20 h-7.5 rounded-full transition-colors duration-300
          ${isOn ? 'bg-green-500' : 'bg-gray-400'}
          `}
          >
            <span 
            className={`absolute  -top-0.5 w-8 h-8 bg-white rounded-full shadow-md shadow-gray-400 transition-transform duration-300
            ${isOn ?
              isRTL ?
              'translate-x-11' : '-translate-x-11'
              :
              isRTL ?
              '-translate-x-3' : 'translate-x-3'
            }
            `}></span>
          </button>
        </div>
      </div>
      {/* ---- */}
      <div className='w-full flex justify-between items-center  '>
        <div className='flex items-center gap-4 '>
          <Visa className='w-12'/>
          <h2 className='text-2xl '> {t("settings.electronicPayment")} </h2>
        </div>
        <div>
          <button
          onClick={() => setISVisaOn(!isVisaOn)}
          className={`relative w-20 h-7.5 rounded-full transition-colors duration-300
          ${isVisaOn ? 'bg-green-500' : 'bg-gray-400'}
          `}
          >
            <span 
            className={`absolute  -top-0.5 w-8 h-8 bg-white rounded-full shadow-md shadow-gray-400 transition-transform duration-300
            ${isVisaOn ?
              isRTL ?
              'translate-x-11' : '-translate-x-11'
              :
              isRTL ?
              '-translate-x-3' : 'translate-x-3'
            }            `}></span>
          </button>
        </div>
      </div>
    </section>

    {/* Shippment Policies */}
    <section className='w-full flex flex-col items-start justify-between gap-7.5  '>
      <h1 className='text-4xl font-bold mb-15'> {t("settings.shippingPolicies")} </h1>

      <div className='w-full flex flex-col items-start justify-between gap-10 '>
        <div className='w-full flex flex-col gap-7.5 justify-between items-start '>
          <label className='w-full text-[#003666] text-2xl '>{t("settings.shippingPoliciesAR")}</label>
          <input 
          type="text" 
          placeholder='نشحن خلال يوم إلى ثلاثة أيام عمل. شحن مجاني للطلبات التي تزيد قيمتها عن 100 جنيه'
          className='w-full border-[0.5px] border-[#003666] rounded-lg p-3  '
          />
        </div>
        
        <div className='w-full flex flex-col gap-7.5 justify-between items-start '>
          <label className='w-full text-[#003666] text-2xl '>{t("settings.shippingPoliciesEN")}</label>
          <input 
          type="text" 
          placeholder='نشحن خلال يوم إلى ثلاثة أيام عمل. شحن مجاني للطلبات التي تزيد قيمتها عن 100 جنيه'
          className='w-full border-[0.5px] border-[#003666] rounded-lg p-3  '
          />
        </div>
      </div>

      <div className='w-[75%]'>
        <button className='p-3 rounded-xl flex justify-center items-center bg-[#0088FF] text-white w-full hover:bg-[#006cca] active:scale-95 transition duration-300 '>
          {t("settings.saveSettings")}
        </button>
      </div>

    </section>


    </div>
    </>
  )
}

export default PaymentShipping
