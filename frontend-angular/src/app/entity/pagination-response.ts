export interface PaginationResponse<T> {
    paginatedItems: T[];
    totalPages: number;
}
