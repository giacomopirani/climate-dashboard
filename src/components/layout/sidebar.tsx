import { cn } from "@/lib/utils";
import {
  Atom,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  CloudRain,
  Snowflake,
  Thermometer,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Temperature", href: "/temperature", icon: Thermometer },
  { name: "CO2", href: "/co2", icon: Wind },
  { name: "Methane", href: "/methane", icon: CloudRain },
  { name: "NO2", href: "/no2", icon: Atom },
  { name: "Polar Ice", href: "/polar-ice", icon: Snowflake },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground fixed top-0 left-0 h-screen flex flex-col transition-all duration-300 z-50",
        isOpen ? "w-64 md:w-64" : "w-16",
        isMobile && !isOpen && "-translate-x-full",
        "shadow-lg"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-primary-foreground/10">
        {isOpen && (
          <Link to="/" className="ml-3 flex items-center space-x-2">
            <BarChart2 className="h-6 w-6" />
            <span className="text-sm font-semibold">Home</span>
          </Link>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "ml-auto p-2 rounded-full hover:bg-primary-foreground/10 transition-colors",
            isOpen && "ml-0"
          )}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      <nav className="flex-grow flex flex-col space-y-2 p-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                isActive
                  ? "bg-primary-foreground text-primary"
                  : "hover:bg-primary-foreground/10",
                "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
                !isOpen ? "justify-center" : "justify-start"
              )}
              title={!isOpen ? item.name : ""}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <div className="flex items-center h-10">
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && (
                  <span className="ml-3 whitespace-nowrap">{item.name}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
