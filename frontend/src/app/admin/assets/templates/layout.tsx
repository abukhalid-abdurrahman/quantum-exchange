import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset templates",
  description: "",
};

export default async function TypesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
