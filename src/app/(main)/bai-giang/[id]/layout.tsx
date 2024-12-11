export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4>Đây là page id</h4>
      {children}
    </div>
  );
}
