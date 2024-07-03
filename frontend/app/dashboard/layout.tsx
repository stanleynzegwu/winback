export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex">
      {/* Leftsidebar */}
      <div className="left-sidebar fixed w-[20%] h-screen min-w-[200px] bg-yellow-200">
        left sidebar
      </div>
      {/* rightSidebar */}
      <div className="flex-1 w-full ml-[20%]">{children}</div>
    </div>
  );
}
