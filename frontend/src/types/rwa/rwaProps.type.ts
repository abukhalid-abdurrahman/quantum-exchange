import { Params } from "@/types/params.type";
import { RwaFiltersParams } from "@/types/rwa/rwa.type";
import { Dispatch, SetStateAction } from "react";

export interface CopyIpfsButtonProps {
  cid: string;
}

export type RwaDataProps = Params;

export interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

export interface RwaPurchaseHistoryProps {
  type: "Buy" | "Sell";
  price: number;
  buyerPublicKey: string;
  transactionDate: string;
}

export interface RwaPurchaseHistoryRowProps {
  row: RwaPurchaseHistoryProps;
}

export interface SellBuyDataProps {
  tokenId: string;
}

export interface FiltersProps {
  setReqParams: Dispatch<SetStateAction<RwaFiltersParams>>;
}

export interface FiltersFormProps {
  setReqParams: Dispatch<SetStateAction<RwaFiltersParams>>;
  setIsFiltersOpen?: Dispatch<SetStateAction<boolean>>;
}
