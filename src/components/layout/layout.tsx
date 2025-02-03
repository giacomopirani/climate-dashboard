import type { ReactNode } from "react";
import Sidebar from "../layout/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-8">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <div className="max-w-full mx-auto">
          © 2025 Climate Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
