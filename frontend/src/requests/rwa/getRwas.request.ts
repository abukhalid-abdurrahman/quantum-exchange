import axiosInstance from "@/lib/axiosInstance";
import { RwasReq } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getRwas = async (reqParams: RwasReq) => {
  const res = await axiosInstance.get("/rwa", {
    params: {
      AssetType: reqParams.assetType,
      PriceMin: reqParams.priceMin,
      PriceMax: reqParams.priceMax,
      SortBy: reqParams.sortBy,
      SortOrder: reqParams.sortOrder,
      PageSize: reqParams.pageSize,
      PageNumber: reqParams.pageNumber,
    },
  });
  return res.data;
};

export const useGetRwas = (reqParams: any) => {
  return useQuery({
    queryKey: ["rwas", reqParams],
    queryFn: () => getRwas(reqParams),
  });
};
