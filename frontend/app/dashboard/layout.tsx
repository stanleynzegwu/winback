import LeftSidebar from "./components/LeftSidebar";
import Topbar from "./components/Topbar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    // Redirect to the sign-in page if the user is not authenticated
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent("/dashboard")}`);
    //redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
  }

  // Check if the user is an admin
  if (session.user.role !== "admin") {
    // If the user is not an admin, redirect to an access-denied page
    redirect("/access-denied");
  }

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-[#444291]">
      {/* Leftsidebar */}
      <Topbar />
      <LeftSidebar />
      {/* rightSidebar */}
      <div className="w-full max-h-screen min-h-screen overflow-x-hidden overflow-y-auto relative md:p-4 ">
        {children}
      </div>
    </div>
  );
}
