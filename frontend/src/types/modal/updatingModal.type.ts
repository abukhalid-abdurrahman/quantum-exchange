import { Dispatch, SetStateAction } from "react";

export interface UpdatingModalProps {
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  tokenId: string;
  isError: boolean;
  errorMessage: string;
  isSuccessfullyDone: boolean;
  setIsSuccessfullyDone: Dispatch<SetStateAction<boolean>>;
}
