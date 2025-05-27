import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const buyRwa = async (req: string) => {
  const res = await axiosInstance.post("/nft-purchase", req);
  return res.data;
};

export const useBuyRwa = () => {
  return useMutation({
    mutationFn: (req: any) => buyRwa(req),
  });
};
