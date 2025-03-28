export default function AdminLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <header> Test</header>
      <main>{children}</main>
    </>
  );
}
