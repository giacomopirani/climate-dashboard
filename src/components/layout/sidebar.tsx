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
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Temperature", href: "/temperature", icon: Thermometer },
  { name: "CO2", href: "/co2", icon: Wind },
  { name: "Methane", href: "/methane", icon: CloudRain },
  { name: "NO2", href: "/no2", icon: Atom },
  { name: "Polar Ice", href: "/polar-ice", icon: Snowflake },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground fixed top-0 left-0 h-screen flex flex-col transition-width duration-300",
        isCollapsed ? "w-16" : "w-44",
        "hidden lg:flex" // Nascondi sotto i 1200px, mostra da l
      )}
    >
      {/* Resto del codice della Sidebar rimane invariato */}
      <div className="flex items-center justify-between h-16 px-4">
        {!isCollapsed && (
          <Link to="/" className="ml-3 flex items-center space-x-2">
            <BarChart2 className="h-6 w-6" />
            <span className="text-sm font-semibold">Home</span>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      <nav className="flex-grow flex flex-col space-y-2 px-4">
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
                isCollapsed ? "justify-center w-full" : ""
              )}
              title={isCollapsed ? item.name : ""}
            >
              <div className="flex items-center h-10 w-30">
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
