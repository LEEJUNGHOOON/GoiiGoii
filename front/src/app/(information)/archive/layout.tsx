export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <div className="text-black text-center text-4xl bold mt-10">
        <h1>Archive</h1>
      </div>
      {children}
    </div>
  );
}
