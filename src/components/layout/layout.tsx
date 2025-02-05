import { type ReactNode, useEffect, useState } from "react";
import Sidebar from "./sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Overlay scuro quando la sidebar è aperta su mobile */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`flex flex-col flex-grow transition-all duration-300 ${
          isSidebarOpen ? "md:pl-64" : "md:pl-16"
        }`}
      >
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
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
