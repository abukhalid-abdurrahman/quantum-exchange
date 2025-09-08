import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset types",
  description: "",
};

export default async function TypesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
