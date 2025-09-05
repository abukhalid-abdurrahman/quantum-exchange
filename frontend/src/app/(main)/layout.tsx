import Header from "@/components/header/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1300px] mx-auto md:px-5">
      <Header />
      {children}
    </div>
  );
}
