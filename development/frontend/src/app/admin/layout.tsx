import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function AdminLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  // const router = useRouter();
  // const pathname = usePathname();

  return <main>{children}</main>;
}
