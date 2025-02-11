import { BarChart2 } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../layout/sidebar";
import ThemeToggle from "../ui/theme-toggle";
import Footer from "./footer";
import { MobileNavigation } from "./mobile-navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow w-full">
        <header className="bg-secondary-foreground fixed top-0 left-0 right-0 flex items-center p-2 pl-4 z-10">
          <div className="flex-grow" />
          <div className="flex items-center space-x-4">
            <Link to="/">
              <BarChart2 className="h-10 w-10 cursor-pointer text-white dark:text-blue-950 hover:text-teal-700 dark:hover:text-teal-700" />
            </Link>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-grow p-4 lg:p-8 pb-24 lg:pb-8 mt-16">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
        <div className="py-5 w-full text-center text-sm text-muted-foreground mb-16 lg:mb-0">
          <Footer />
        </div>
        <MobileNavigation />
      </div>
    </div>
  );
}
