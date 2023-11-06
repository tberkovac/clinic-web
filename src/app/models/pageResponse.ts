export interface PageResponse<T> {
    data: T[],
    page: number,
    pageSize: number,
    numberOfElements: number
}