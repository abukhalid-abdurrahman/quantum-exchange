import { uploadFile } from "@/requests/file/uploadFile.request";

export const handleUploadFile = async (file: File): Promise<string> => {
  try {
    const res = await uploadFile(file);
    return res.data.data.fileUrl;
  } catch (error) {
    console.error("Upload failed", error);
    return "File upload failed";
  }
};
