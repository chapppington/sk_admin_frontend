export interface IWarehouseFile {
  oid: string
  file_url: string
  file_name: string | null
  created_at: string
  updated_at: string
}

export interface IWarehouseFilePayload {
  file_url: string
  file_name?: string | null
}
