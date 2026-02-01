import { axiosAuth } from "@/api/axios"
import type { ApiResponse } from "@/types/api.types"
import type { UploadFileResult } from "@/types/media.types"

class MediaService {
  private _BASE_URL = "/media"

  async uploadFiles(
    files: File[],
    bucketName: string,
  ): Promise<UploadFileResult[]> {
    const formData = new FormData()
    for (const file of files) {
      formData.append("files", file)
    }
    formData.append("bucket_name", bucketName)
    const response = await axiosAuth.post<ApiResponse<UploadFileResult[]>>(
      `${this._BASE_URL}/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    )
    return response.data.data
  }

  async uploadImage(
    blob: Blob,
    bucketName: string,
    filename = "image.jpg",
  ): Promise<string> {
    const file = new File([blob], filename, { type: blob.type })
    const results = await this.uploadFiles([file], bucketName)
    const url = results[0]?.file_url
    if (!url) throw new Error("Upload failed: no URL returned")
    return url
  }
}

export default new MediaService()
