"use client";

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const ProductModal = ({ isOpen, onClose, onSubmit }: ProductModalProps) => {

      const pathname = usePathname();
      const locale = pathname?.split("/")[1];
      const t = useTranslations();
    
      const isRTL = locale === "ar";
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    sizes: [] as string[],
    colors: [] as string[],
    category: '',
    image: '',
  });

  console.log(formData.colors);
  const availableSizes = ['M', 'L', 'XL', 'XXL'];
  const availableColors = [
    { name: 'black', color: '#000000' },
    { name: 'blue', color: '#0088FF' },
    { name: 'green', color: '#00C853' },
    { name: 'yellow', color: '#FFD600' },
    { name: 'red', color: '#FF1744' },
    { name: 'lightBlue', color: '#B3E5FC' },
    { name: 'purple', color: '#9C27B0' },
    { name: 'darkBlue', color: '#1A237E' },
    { name: 'pink', color: '#E91E63' },
  ];

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleColor = (colorName: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(colorName)
        ? prev.colors.filter(c => c !== colorName)
        : [...prev.colors, colorName]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal - Hidden scrollbar but scrollable */}
      <div
       dir={isRTL ? "rtl" : "ltr"}
      className="relative bg-white rounded-2xl shadow-2xl w-full max-w-161.25 mx-4 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="sticky top-0 bg-white px-6 py-4 rounded-t-2xl z-10">
            <h2 className="text-2xl font-bold text-start text-[32px] ">{t("AddNewProduct.title")}</h2>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="block text-start text-gray-700 font-medium">
                {t("AddNewProduct.productName")}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name of product"
                className="w-full px-4 py-3 rounded-lg border border[0.5px] border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666] text-start"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-start text-gray-700 font-medium">
                {t("AddNewProduct.description")}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border[0.5px] border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666] text-start"
                required
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-start text-gray-700 font-medium">
                  {t("AddNewProduct.price")}
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder={t("AddNewProduct.price")}
                  className="w-full px-4 py-3 rounded-lg border border[0.5px] border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666] text-start"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-start text-gray-700 font-medium">
                  {t("AddNewProduct.stock")}
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder={t("AddNewProduct.stock")}
                  className="w-full px-4 py-3 rounded-lg border border[0.5px] border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666] text-start"
                  required
                />
              </div>
            </div>
            
            <div className="mt-6 flex gap-6 w-full ">

            {/* Colors */}
            <div className="space-y-2 w-[50%] ">
              <label className="block text-start text-gray-700 font-medium">
                {t("AddNewProduct.colors")}
              </label>
              <div className="flex flex-wrap gap-3 justify-start items-center">
                <button
                  type="button"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all"
                >
                  +
                </button>
                {availableColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => toggleColor(color.name)}
                      className={`w-10 h-10 rounded-full transition-all ${
                        formData.colors.includes(color.name)
                          ? 'scale-85 border-4 border-white ring-4 ring-offset-2 active:scale-110 transition duration-100 '
                          : '  hover:scale-90 active:scale-110 transition duration-200  '
                      }`}
                      style={{
                        backgroundColor: color.color,
                        ...(formData.colors.includes(color.name) && {
                          boxShadow: `0 0 0 4px ${color.color}`,
                        }),
                      }}
                    />
                ))}
              </div>
              <div className="flex justify-center gap-1 mt-2">
                <div className={`w-2 h-2 rounded-full ${formData.colors.length > 0 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                <div className="w-2 h-2 rounded-full bg-gray-300" />
              </div>
            </div>


                {/* Sizes */}
                <div className="space-y-2 w-[50%]">
<label className="block text-start text-gray-700 font-medium">
  {t("AddNewProduct.sizes")}:
  {formData.sizes.length > 0 && (
    <span className="text-blue-500">
      {" "}
      {formData.sizes.join(", ")}
    </span>
  )}
</label>
              <div className="flex flex-wrap gap-3 justify-start items-center">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-6 py-2 rounded-lg border-2 transition-all ${
                      formData.sizes.includes(size)
                        ? 'border-[#0088FF] bg-blue-50 text-[#0088FF] p-3 flex items-center justify-center active:scale-95 hover:bg-blue-100 hover:border-blue-400'
                        : 'border-gray-300 text-gray-600 hover:border-blue-300 p-3 flex items-center justify-center hover:bg-blue-50 hover:text-blue-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
                </div>


            </div>


            {/* Category */}
            <div className="space-y-2">
              <label className="block text-start text-gray-700 font-medium">
                {t("AddNewProduct.category")}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border[0.5px] border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666] text-start bg-white"
                required
              >
                <option value="">{t("AddNewProduct.selectCategory")}</option>
                <option value="رجالي">{t("AddNewProduct.male")}</option>
                <option value="نسائي">{t("AddNewProduct.female")}</option>
                <option value="اطفال">{t("AddNewProduct.children")}</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="block text-start text-gray-700 font-medium">
                {t("AddNewProduct.imageURL")}
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="http://...................................................."
                className="w-full px-4 py-3 rounded-lg border border[0.5px] border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666] text-start"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl flex gap-3 z-10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
            >
              {t("AddNewProduct.cancel")}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-lg bg-[#0088FF] text-white font-medium hover:bg-[#0065be] transition-all"
            >
                {t("AddNewProduct.addProduct")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;