export interface UploadBookResponse {
    message: string
}

export interface UploadBookPayload {
    data: FormData,
    token: string
}