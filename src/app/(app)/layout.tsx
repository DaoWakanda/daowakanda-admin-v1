import { DashboardWrapper } from '@/components/dashboard-wrapper';
import { AuthWrapper } from '@/providers/auth-wrapper';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <DashboardWrapper pageTitle="Overview">{children}</DashboardWrapper>
    </AuthWrapper>
  );
}
