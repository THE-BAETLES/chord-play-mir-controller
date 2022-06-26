export interface IAwsUploadService<T> {
    upload(payload: T): void
}

