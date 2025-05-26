import axiosInstance from "@/lib/axiosInstance"
import { useMutation } from "@tanstack/react-query"

const signIn = async (req: any) => {
  const res = await axiosInstance.post(`/auth/login`, req)
  return res.data
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: (req: any) => signIn(req),
  })
}