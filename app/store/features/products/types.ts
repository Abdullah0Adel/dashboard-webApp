export interface ProductSize {
  id: number
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL'
  stoke: number
}

export interface ProductColor {
  id: number
  color: string
  sizes: ProductSize[]
}

export interface ProductImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  url: string
  width: number
  height: number
}

export interface Product {
  id: number
  documentId: string
  name_ar: string
  name_en: string
  description: string
  price: number
  publishedAt: string
  createdAt: string
  updatedAt: string
  thumnail: ProductImage
  images: ProductImage[]
  ProductColor: ProductColor[]
  colors: null
}

// لما بتبعت POST أو PUT
export interface ProductPayload {
  name_ar: string
  name_en: string
  description: string
  price: number
  thumnail?: number        // Strapi بيستقبل الـ id بس مش الـ object
  images?: number[]
  ProductColor?: {
    color: string
    sizes: {
      size: string
      stoke: number
    }[]
  }[]
}