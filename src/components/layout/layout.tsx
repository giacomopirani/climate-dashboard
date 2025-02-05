import type { ReactNode } from "react";
import Sidebar from "../layout/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col flex-grow h-screen overflow-y-auto pl-[60px] md:pl-[60px]">
        <main className="flex-grow p-8 md:pl-[60px]">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>

        <footer className="py-5 w-full text-center text-sm text-muted-foreground bg-[#0F172A]">
          <div className="max-w-full mx-auto">
            © 2025 Climate Dashboard. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
