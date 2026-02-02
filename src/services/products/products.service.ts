import { axiosAuth } from "@/api/axios"
import type {
  ApiResponse,
  ListPaginatedResponse,
} from "@/types/api.types"
import type {
  IProduct,
  IProductCreate,
  IProductsListParams,
  IProductUpdate,
} from "@/types/products.types"

class ProductsService {
  private _BASE_URL = "/products"

  async fetchProducts(params?: IProductsListParams) {
    const response = await axiosAuth.get<
      ApiResponse<ListPaginatedResponse<IProduct>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async fetchProductById(oid: string) {
    const response = await axiosAuth.get<ApiResponse<IProduct>>(
      `${this._BASE_URL}/${oid}`,
    )
    return { data: response.data.data }
  }

  async createProduct(payload: IProductCreate) {
    const response = await axiosAuth.post<ApiResponse<IProduct>>(
      this._BASE_URL,
      payload,
    )
    return { data: response.data.data }
  }

  async updateProduct(oid: string, payload: IProductUpdate) {
    const response = await axiosAuth.put<ApiResponse<IProduct>>(
      `${this._BASE_URL}/${oid}`,
      payload,
    )
    return { data: response.data.data }
  }

  async patchProductOrder(oid: string, order: number) {
    const response = await axiosAuth.patch<ApiResponse<IProduct>>(
      `${this._BASE_URL}/${oid}/order`,
      { order },
    )
    return { data: response.data.data }
  }

  async deleteProduct(oid: string) {
    await axiosAuth.delete(`${this._BASE_URL}/${oid}`)
  }
}

export default new ProductsService()
