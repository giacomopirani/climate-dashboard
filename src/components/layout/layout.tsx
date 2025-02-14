import { Home } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import logoGlobeDark from "../../assets/globe-track-darkblue.png";
import logoGlobeLight from "../../assets/globe-track-light.png";
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
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logoGlobeLight}
              alt="Logo App"
              className="h-14 dark:hidden"
            />
            <img
              src={logoGlobeDark}
              alt="Logo App"
              className="h-14 hidden dark:block"
            />
            <span className="font-extralight text-xl text-white dark:text-slate-950">
              {" "}
              Global Warming
            </span>
          </Link>
          <div className="flex-grow" />
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Home className="h-8 w-8 cursor-pointer text-white dark:text-blue-950 hover:text-indigo-700 dark:hover:text-indigo-700" />
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
