/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SwapiPageResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: any;
  next: string;
  results: SwapiPagination[];
}

export interface SwapiPagination {
  uid: string;
  name: string;
  url: string;
}
