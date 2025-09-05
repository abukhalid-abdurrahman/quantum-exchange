import AdminSidebar from "@/app/admin/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
