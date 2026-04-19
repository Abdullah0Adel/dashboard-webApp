"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ProductPayload } from "@/store/features/products/types";

interface SizeStock {
  size: string;
  stoke: number;
}

interface ColorVariant {
  color: string;
  sizes: SizeStock[];
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductPayload) => void;
}

const availableSizes = ["S", "M", "L", "XL", "XXL"];

const availableColors = [
  { name: "black",     hex: "#000000" },
  { name: "blue",      hex: "#0088FF" },
  { name: "green",     hex: "#00C853" },
  { name: "yellow",    hex: "#FFD600" },
  { name: "red",       hex: "#FF1744" },
  { name: "lightBlue", hex: "#B3E5FC" },
  { name: "purple",    hex: "#9C27B0" },
  { name: "darkBlue",  hex: "#1A237E" },
  { name: "pink",      hex: "#E91E63" },
];

const ProductModal = ({ isOpen, onClose, onSubmit }: ProductModalProps) => {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1];
  const t = useTranslations();
  const isRTL = locale === "ar";

  // ✅ الـ state الجديد
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  // كل color وجواه الـ sizes المختارة مع الـ stock بتاع كل واحدة
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>([]);

  // ✅ لما تختار/تشيل color
  const toggleColor = (colorName: string) => {
    setColorVariants((prev) => {
      const exists = prev.find((c) => c.color === colorName);
      if (exists) {
        // شيل الـ color وكل الـ sizes بتاعته
        return prev.filter((c) => c.color !== colorName);
      } else {
        // ضيف color جديد بـ sizes فاضية
        return [...prev, { color: colorName, sizes: [] }];
      }
    });
  };

  // ✅ لما تختار/تشيل size جوا color معين
  const toggleSize = (colorName: string, size: string) => {
    setColorVariants((prev) =>
      prev.map((c) => {
        if (c.color !== colorName) return c;

        const sizeExists = c.sizes.find((s) => s.size === size);
        return {
          ...c,
          sizes: sizeExists
            ? c.sizes.filter((s) => s.size !== size)
            : [...c.sizes, { size, stoke: 0 }],
        };
      })
    );
  };

  // ✅ لما تعدّل الـ stock لـ size معين جوا color معين
  const updateStoke = (colorName: string, size: string, stoke: number) => {
    setColorVariants((prev) =>
      prev.map((c) => {
        if (c.color !== colorName) return c;
        return {
          ...c,
          sizes: c.sizes.map((s) =>
            s.size === size ? { ...s, stoke } : s
          ),
        };
      })
    );
  };

  const isColorSelected = (colorName: string) =>
    colorVariants.some((c) => c.color === colorName);

  const isSizeSelected = (colorName: string, size: string) =>
    colorVariants
      .find((c) => c.color === colorName)
      ?.sizes.some((s) => s.size === size) ?? false;

  // ✅ الـ submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ProductPayload = {
      name_ar:     formData.name_ar,
      name_en:     formData.name_en,
      description: formData.description,
      price:       Number(formData.price),
      ProductColor: colorVariants,
    };

    onSubmit(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[645px] mx-4 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="sticky top-0 bg-white px-6 py-4 rounded-t-2xl z-10">
            <h2 className="text-2xl font-bold text-start">
              {t("AddNewProduct.title")}
            </h2>
          </div>

          <div className="px-6 py-6 space-y-6">

            {/* Arabic Name */}
            <div className="space-y-2">
              <label className="block text-start text-gray-700 font-medium">
                {t("AddNewProduct.productName")} (عربي)
              </label>
              <input
                type="text"
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                placeholder="اسم المنتج بالعربي"
                className="w-full px-4 py-3 rounded-lg border border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666]"
                required
              />
            </div>

            {/* English Name */}
            <div className="space-y-2">
              <label className="block text-start text-gray-700 font-medium">
                {t("AddNewProduct.productName")} (English)
              </label>
              <input
                type="text"
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                placeholder="Product name in English"
                className="w-full px-4 py-3 rounded-lg border border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666]"
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
                className="w-full px-4 py-3 rounded-lg border border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666]"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="block text-start text-gray-700 font-medium">
                {t("AddNewProduct.price")}
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder={t("AddNewProduct.price")}
                className="w-full px-4 py-3 rounded-lg border border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666]"
                required
              />
            </div>

            {/* Colors + Sizes per Color */}
            <div className="space-y-4">
              <label className="block text-start text-gray-700 font-medium">
                {t("AddNewProduct.colors")}
              </label>

              {/* Color Picker */}
              <div className="flex flex-wrap gap-3">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => toggleColor(color.name)}
                    className={`w-10 h-10 rounded-full transition-all ${
                      isColorSelected(color.name)
                        ? "scale-90 border-4 border-white ring-4 ring-offset-2"
                        : "hover:scale-90"
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      ...(isColorSelected(color.name) && {
                        boxShadow: `0 0 0 4px ${color.hex}`,
                      }),
                    }}
                  />
                ))}
              </div>

              {/* Sizes + Stock لكل color مختار */}
              {colorVariants.length > 0 && (
                <div className="space-y-4 mt-2">
                  {colorVariants.map((variant) => {
                    const colorHex = availableColors.find(
                      (c) => c.name === variant.color
                    )?.hex;

                    return (
                      <div
                        key={variant.color}
                        className="border border-gray-200 rounded-xl p-4 space-y-3"
                      >
                        {/* Color Label */}
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full border"
                            style={{ backgroundColor: colorHex }}
                          />
                          <span className="font-medium text-gray-700 capitalize">
                            {variant.color}
                          </span>
                        </div>

                        {/* Size Buttons */}
                        <div className="flex flex-wrap gap-2">
                          {availableSizes.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => toggleSize(variant.color, size)}
                              className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                                isSizeSelected(variant.color, size)
                                  ? "border-[#0088FF] bg-blue-50 text-[#0088FF]"
                                  : "border-gray-300 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>

                        {/* Stock Input لكل size مختار */}
                        {variant.sizes.length > 0 && (
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {variant.sizes.map((s) => (
                              <div key={s.size} className="space-y-1">
                                <label className="text-xs text-gray-500">
                                  {s.size} — stock
                                </label>
                                <input
                                  type="number"
                                  min={0}
                                  value={s.stoke}
                                  onChange={(e) =>
                                    updateStoke(
                                      variant.color,
                                      s.size,
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-full px-3 py-2 rounded-lg border border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666] text-sm"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-start text-gray-700 font-medium">
                {t("AddNewProduct.category")}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666] bg-white"
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
                placeholder="http://..."
                className="w-full px-4 py-3 rounded-lg border border-[#003666] focus:outline-none focus:ring-2 focus:ring-[#003666]"
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