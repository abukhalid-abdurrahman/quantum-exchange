import ProfileSidebar from "@/app/profile/components/ProfileSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen bg-background-website">
      <div className="max-w-[1300px] min-h-screen mx-auto w-full md:px-5">
        <div className="">
          <ProfileSidebar />
        </div>

        {children}
      </div>
    </div>
  );
}
