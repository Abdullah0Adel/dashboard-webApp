import React from 'react';
import { TrashIcon, EditIcon } from '@/app/icons/icons';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  category,
  price,
  stock,
  rating,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-[80px_1fr_100px_120px_100px_120px_100px] gap-4 items-center py-4 px-6 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Image */}
      <div className="flex justify-center">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <div className="text-right">
        <p className="text-gray-800 font-medium">{name}</p>
      </div>

      {/* Category */}
      <div className="text-right">
        <p className="text-gray-600">{category}</p>
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="text-gray-800">{price} جنيه</p>
      </div>

      {/* Stock */}
      <div className="text-center">
        <p className="text-gray-800 font-semibold">{stock}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center gap-1">
        <span className="text-yellow-500">⭐</span>
        <span className="text-gray-800 font-medium">{rating}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => onEdit?.(id)}
          className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"
          aria-label="تعديل"
        >
          <EditIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete?.(id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
          aria-label="حذف"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;