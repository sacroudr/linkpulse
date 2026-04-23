// import { redirect } from "next/navigation";
// import { auth } from "../../../lib/auth";
// import { Sidebar } from "../../../components/ui/Sidebar";

// export default async function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await auth();

//   if (!session?.user) {
//     redirect("/login");
//   }

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: "#09090b" }}>
//       <Sidebar userEmail={session.user.email ?? ""} />
//       <main className="ml-56 p-8">{children}</main>
//     </div>
//   );
// }

// import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { auth } from "../../../lib/auth";
import { Sidebar } from "../../../components/ui/Sidebar";
// import { Sidebar } from "@/components/ui/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <Sidebar userEmail={session.user.email ?? ""} />
      <main className="ml-56 p-8">{children}</main>
    </div>
  );
}