export type RwasRequestParams = {
  assetType?: string | null;
  priceMin?: number | null;
  priceMax?: number | null;
  sortBy?: string | null;
  sortOrder?: string | null;
  pageSize: number;
  pageNumber: number;
};
