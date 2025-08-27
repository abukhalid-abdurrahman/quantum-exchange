import Link from "next/link";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen bg-background-website">
      <div className="max-w-[1300px] min-h-screen mx-auto w-full md:px-5 flex flex-col justify-between">
        <header className="pt-[29px]">
          <Link href="/" className="text-2xl font-black">
            Quantum Street
          </Link>
        </header>
        {children}
        <div className=""></div>
      </div>
    </div>
  );
}
