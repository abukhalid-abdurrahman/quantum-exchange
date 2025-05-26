import axiosInstance from "@/lib/axiosInstance";
import { RwasReq } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getRwasMe = async (reqParams: RwasReq) => {
  const res = await axiosInstance.get("/rwa/me", {
    params: {
      PageSize: reqParams.pageSize,
      PageNumber: reqParams.pageNumber,
    },
  });
  return res.data;
};

export const useGetRwasMe = (reqParams: any, token: string) => {
  return useQuery({
    queryKey: ["rwas", "me", reqParams, token],
    queryFn: () => getRwasMe(reqParams),
  });
};
