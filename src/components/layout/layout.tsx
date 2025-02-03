import type { ReactNode } from "react";
import Sidebar from "../layout/sidebar";
import { ModeToggle } from "./mode-toggle";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Climate Dashboard</h1>
          <ModeToggle />
        </header>
        <main className="flex-1 overflow-y-auto py-6 px-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
        <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
          © 2025 Climate Dashboard. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
