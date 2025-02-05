import type { ReactNode } from "react";
import Sidebar from "../layout/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="h-auto min-h-screen" />
      <div className="flex flex-col flex-grow">
        <main className="flex-grow p-8">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
        <footer className="py-5 text-center text-sm text-muted-foreground bg-[#0F172A]">
          <div className="max-w-full mx-auto">
            © 2025 Climate Dashboard. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
