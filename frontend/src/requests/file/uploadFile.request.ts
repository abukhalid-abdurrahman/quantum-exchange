import axiosInstanceForFiles from "@/lib/axiosInstanceForFiles";

type UploadFileResponse = {
  data: {
    data: { fileUrl: string };
  };
};

export const uploadFile = async (file: File): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosInstanceForFiles.post("/files/upload", formData);
  return res.data;
};
