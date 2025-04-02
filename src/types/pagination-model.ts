// Generic Paginated Response Interface
export interface PaginatedResponse<T> {
  statusCode: number;
  message: string;
  data: T[];
  totalPages: number;
  currentPage: number;
}
