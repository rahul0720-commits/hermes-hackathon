import AppShell from "@/components/AppShell";
import InputTerminal from "@/components/InputTerminal";

export default function Home() {
  return (
    <AppShell active="analyze">
      <InputTerminal />
    </AppShell>
  );
}
