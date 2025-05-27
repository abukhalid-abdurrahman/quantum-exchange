import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const signUp = async (req: any) => {
  const res = await axiosInstance.post("/auth/register", req);
  return res.data;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (req: any) => signUp(req),
  });
};
