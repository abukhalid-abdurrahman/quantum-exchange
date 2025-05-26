import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const sendSignedTransaction = async (req: any) => {
  const res = await axiosInstance.post(`/nft-purchase/send`, req);
  return res.data;
};

export const useSendSignedTransaction = () => {
  return useMutation({
    mutationFn: (req: any) => sendSignedTransaction(req),
  });
};
