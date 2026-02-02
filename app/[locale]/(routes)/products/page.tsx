"use client";

import { PlusIcon, SearchIcon } from '@/app/icons/icons';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ProductCard from './productCard';
import ProductModal from './ProductModal';

// Sample data - replace with your actual data
const sampleProducts = [
  {
    id: '1',
    image: '/products/shirt1.jpg',
    name: 'تيشرت رجالي قطن',
    category: 'رجالي',
    price: 400,
    stock: 20,
    rating: 4.5,
  },
  {
    id: '2',
    image: '/products/shirt2.jpg',
    name: 'تيشرت رجالي قطن',
    category: 'رجالي',
    price: 400,
    stock: 20,
    rating: 4.5,
  },
  {
    id: '3',
    image: '/products/shirt3.jpg',
    name: 'تيشرت رجالي قطن',
    category: 'رجالي',
    price: 400,
    stock: 20,
    rating: 4.5,
  },
  {
    id: '4',
    image: '/products/shirt4.jpg',
    name: 'تيشرت رجالي قطن',
    category: 'رجالي',
    price: 400,
    stock: 20,
    rating: 4.5,
  },
  {
    id: '5',
    image: '/products/shirt5.jpg',
    name: 'تيشرت رجالي قطن',
    category: 'رجالي',
    price: 400,
    stock: 20,
    rating: 4.5,
  },
];

const Page = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const locale = pathname?.split("/")[1];
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isRTL = locale === "ar";

  const handleEdit = (id: string) => {
    console.log('Edit product:', id);
    // Add your edit logic here
  };

  const handleDelete = (id: string) => {
    console.log('Delete product:', id);
    // Add your delete logic here
  };

return (
  <div className="flex flex-col h-screen">
    <header className="bg-[#CCE7FF] py-3 px-8 h-30.25 flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        {t("products.title")}
      </h1>
    </header>

    <section className='flex-1 overflow-y-auto'>
      {/* Product Search */}
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="p-4 flex gap-4 justify-between items-center"
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="بحث عن منتج"
            className="w-full py-3 pr-12 pl-4 rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-right placeholder:text-gray-400"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 cursor-pointer">
            <SearchIcon className="h-5.75 w-5.75" />
          </span>
        </div>

        <button 
        onClick={() => setIsModalOpen(true)}
        className="py-1 px-5 bg-[#0088FF] rounded-lg text-white flex items-center gap-2 hover:bg-[#0065be] active:scale-95 transition">
          <PlusIcon />
          {t("products.addNew")}
        </button>
      </div>

      {/* Product Table */}
      <div dir={isRTL ? "rtl" : "ltr"} className="px-4 pb-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[80px_1fr_100px_120px_100px_120px_100px] gap-4 items-center py-4 px-6 bg-gray-50 border-b font-semibold text-gray-700">
            <div className="text-center">صوره</div>
            <div className="text-right">الاسم</div>
            <div className="text-right">التصنيف</div>
            <div className="text-right">السعر</div>
            <div className="text-center">المخزون</div>
            <div className="text-center">التقييم</div>
            <div className="text-center">الاكشن</div>
          </div>

          {/* Table Body */}
          <div>
            {sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Add Product Popup */}
          <ProductModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={(data) => console.log(data)}
          /> 
        </div>
      </div>
    </section>
  </div>
);
};

export default Page;