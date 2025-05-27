import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const changePassword = async (req: any) => {
  const res = await axiosInstance.post("/auth/change-password", req);
  return res.data;
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (req: any) => changePassword(req),
  });
};