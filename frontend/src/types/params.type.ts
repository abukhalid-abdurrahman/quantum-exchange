export interface Params {
  params: { value: string };
}

export interface SearchParams {
  searchParams: Promise<{
    signin?: string;
    signup?: string;
  }>;
}
