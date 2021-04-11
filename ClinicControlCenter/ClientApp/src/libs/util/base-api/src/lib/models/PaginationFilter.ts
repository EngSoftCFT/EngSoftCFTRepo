export interface IPaginationFilter {
  Limit?: number;
  Offset?: number;

  SortBy?: string;
  Asc?: boolean;
}

export class PaginationFilter implements IPaginationFilter {
  Limit: number = 10;
  Offset: number = 0;

  SortBy?: string;
  Asc?: boolean;
}
