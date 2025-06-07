import { useEffect, useState } from "react";

export const useExistedNetAmount = (data: any) => {
  const [netAmount, setNetAmount] = useState<number | string>("");

  useEffect(() => {
    if (data?.data?.price && data?.data?.royalty) {
      setNetAmount((data.data.royalty * data.data.price) / 100);
    } else {
      setNetAmount("");
    }
  }, [data]);

  return netAmount;
};
