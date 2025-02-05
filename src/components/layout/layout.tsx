import type { ReactNode } from "react";
import Sidebar from "../layout/sidebar";
import { MobileNavigation } from "./mobile-navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar - nascosta sotto i 1200px */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-grow w-full lg:pl-[60px]">
        {/* Main content con padding-bottom per la navigation bar mobile */}
        <main className="flex-grow p-4 lg:p-8 pb-24 lg:pb-8">
          {" "}
          {/* Aumentato il padding-bottom su mobile */}
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>

        {/* Footer - visibile anche su mobile */}
        <footer className="py-5 w-full text-center text-sm text-muted-foreground  mb-16 lg:mb-0">
          {" "}
          {/* Aggiunto margine inferiore su mobile */}
          <div className="max-w-full mx-auto">
            © 2025 Climate Dashboard. All rights reserved.
          </div>
        </footer>

        {/* Mobile Navigation - visibile sotto i 1200px */}
        <MobileNavigation />
      </div>
    </div>
  );
}
