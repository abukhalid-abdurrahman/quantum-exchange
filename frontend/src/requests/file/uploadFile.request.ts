import axiosInstanceForFiles from "@/lib/axiosInstanceForFiles";

export const uploadFile = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosInstanceForFiles.post(`/files/upload`, formData);
  return res.data;
};
