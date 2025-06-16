import axiosInstance from "@/lib/axiosInstance";
import { LinkWallet } from "@/types/crypto/wallet.type";
import { useMutation } from "@tanstack/react-query";

const linkWallet = async (req: any) => {
  const res = await axiosInstance.post("/linked-accounts", req);
  return res.data;
};

export const useLinkWallet = () => {
  return useMutation({
    mutationFn: (req: LinkWallet) => linkWallet(req),
  });
};
