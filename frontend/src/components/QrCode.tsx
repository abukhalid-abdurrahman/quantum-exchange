"use cleint";

import QRCode from "qrcode";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function QRCodeDisplay({ text }: { text: string }) {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (text) {
      const generateQRCode = async () => {
        const url = await QRCode.toDataURL(text);
        setQrCode(url);
      };

      generateQRCode();
    }
  }, [text]);

  return (
    <div className="flex flex-col items-center">
      {qrCode && (
        <Image
          src={qrCode}
          alt="Your virtual account"
          width={150}
          height={150}
        />
      )}
    </div>
  );
}
