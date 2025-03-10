import { Atom, CloudRain, Snowflake, Thermometer, Wind } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Temperature", href: "/temperature", icon: Thermometer },
  { name: "CO2", href: "/co2", icon: Wind },
  { name: "Methane", href: "/methane", icon: CloudRain },
  { name: "NO2", href: "/no2", icon: Atom },
  { name: "Polar Ice", href: "/polar-ice", icon: Snowflake },
];

export function MobileNavigation() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground border-t xl:hidden z-50">
      <nav className="flex justify-between items-center h-14">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center h-full flex-1 ${
                isActive
                  ? "bg-primary-foreground text-primary"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1 truncate w-full text-center px-1">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
