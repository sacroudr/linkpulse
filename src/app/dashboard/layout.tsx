import { redirect } from "next/navigation";
import { auth } from "../../../lib/auth";
import { DashboardShell } from "../../../components/ui/DashboardShell";

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
    <DashboardShell
      userEmail={session.user.email ?? ""}
      userName={session.user.name ?? undefined}
    >
      {children}
    </DashboardShell>
  );
}
