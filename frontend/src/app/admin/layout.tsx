import AdminSidebar from "@/app/admin/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="max-w-[1300px] w-full mx-auto pt-12.5 pb-7.5">
        {children}
      </div>
    </div>
  );
}
