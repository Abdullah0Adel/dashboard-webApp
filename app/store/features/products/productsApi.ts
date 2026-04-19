import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product, ProductPayload } from './types'

const POPULATE = [
  'populate[ProductColor][populate]=sizes',
  'populate=thumnail',
  'populate=images',
].join('&')

export const productsApi = createApi({
  reducerPath: 'productsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL + '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),

  tagTypes: ['Product'],

  endpoints: (builder) => ({

    // ✅ GET all products
    getProducts: builder.query<Product[], void>({
      query: () => `/products?${POPULATE}`,
      transformResponse: (response: { data: Product[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ documentId }) => ({
                type: 'Product' as const,
                id: documentId,
              })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    // ✅ GET single product
    getProductById: builder.query<Product, string>({
      query: (documentId) => `/products/${documentId}?${POPULATE}`,
      transformResponse: (response: { data: Product }) => response.data,
      providesTags: (_, __, documentId) => [{ type: 'Product', id: documentId }],
    }),

    // ✅ POST — add product
    addProduct: builder.mutation<Product, ProductPayload>({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: { data: newProduct },
      }),
      transformResponse: (response: { data: Product }) => response.data,
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    // ✅ PUT — update product
    updateProduct: builder.mutation<
      Product,
      { documentId: string; data: Partial<ProductPayload> }
    >({
      query: ({ documentId, data }) => ({
        url: `/products/${documentId}`,
        method: 'PUT',
        body: { data },
      }),
      transformResponse: (response: { data: Product }) => response.data,
      invalidatesTags: (_, __, { documentId }) => [{ type: 'Product', id: documentId }],
    }),

    // ✅ DELETE product
    deleteProduct: builder.mutation<void, string>({
      query: (documentId) => ({
        url: `/products/${documentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, documentId) => [
        { type: 'Product', id: documentId },
        { type: 'Product', id: 'LIST' },
      ],
    }),

  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi