import { useEffect, useState } from "react";

export const useNetAmount = (price: number, royalty: number) => {
  const [netAmount, setNetAmount] = useState<number | string>("");

  useEffect(() => {
    if (price && royalty) {
      setNetAmount(() => {
        return (royalty * price) / 100;
      });
    } else {
      setNetAmount("");
    }
  }, [price, royalty]);

  return netAmount;
};
