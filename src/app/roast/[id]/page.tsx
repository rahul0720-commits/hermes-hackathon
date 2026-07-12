import AppShell from "@/components/AppShell";
import RoastView from "@/components/RoastView";

export default function RoastPage({ params }: { params: { id: string } }) {
  return (
    <AppShell active="history" scanline>
      <RoastView id={params.id} />
    </AppShell>
  );
}
