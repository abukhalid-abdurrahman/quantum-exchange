import axiosInstance from "@/lib/axiosInstance"
import { useMutation } from "@tanstack/react-query"

const createOrder = async (req: any) => {
  const res = await axiosInstance.post(`/orders`, req)
  return res.data
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (req: any) => createOrder(req),
  })
}