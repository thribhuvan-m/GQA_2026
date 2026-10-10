import { RevealController } from "@/components/motion/reveal-controller";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-enter">
      {children}
      <RevealController />
    </div>
  );
}
