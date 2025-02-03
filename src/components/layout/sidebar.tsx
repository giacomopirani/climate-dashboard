import { cn } from "@/lib/utils";
import {
  Atom,
  BarChart2,
  CloudRain,
  Snowflake,
  Thermometer,
  Wind,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Temperature", href: "/temperature", icon: Thermometer },
  { name: "CO2", href: "/co2", icon: Wind },
  { name: "Methane", href: "/methane", icon: CloudRain },
  { name: "NO2", href: "/no2", icon: Atom },
  { name: "Polar Ice", href: "/polar-ice", icon: Snowflake },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow border-r bg-background">
        <div className="flex h-16 items-center px-4 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <BarChart2 className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Climate Data</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/5",
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
                )}
              >
                <item.icon
                  className={cn(
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-primary",
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
