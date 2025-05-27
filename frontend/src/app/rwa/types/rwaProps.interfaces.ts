import { Params } from "@/types/params.type";

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
