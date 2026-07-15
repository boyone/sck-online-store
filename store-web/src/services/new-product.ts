import axiosShoppingMallApi from '@/utils/axios'
import { handleServiceError } from '@/utils/helper'

// ------------------------------------------------

type NewProductRequest = {
  'product-name': string
  'product-brand': string
  'product-price': number
  'product-stock': number
}

export type NewProductServiceResponse = {
  data?: unknown
  message?: string
}

const createNewProductService = async (
  product: NewProductRequest
): Promise<NewProductServiceResponse> => {
  try {
    const { data } = await axiosShoppingMallApi.post(`/api/v1/product`, product)
    return { data }
  } catch (error) {
    return handleServiceError(error)
  }
}

export default createNewProductService
