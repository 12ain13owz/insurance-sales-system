import Footer from "@/app/components/layouts/user/Footer";
import Header from "@/app/components/layouts/user/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}
