import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rwa Market",
};

export default function RwaMarketLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="xl:px-5 pb-5">{children}</div>;
}
