import { Atom, CloudRain, Snowflake, Thermometer, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const features = [
  {
    name: "Global Temperature",
    description: "Track global temperature trends and anomalies over time.",
    href: "/temperature",
    icon: Thermometer,
  },
  {
    name: "CO2 Levels",
    description: "Monitor atmospheric carbon dioxide concentration.",
    href: "/co2",
    icon: Wind,
  },
  {
    name: "Methane Concentration",
    description: "Analyze atmospheric methane levels and their impact.",
    href: "/methane",
    icon: CloudRain,
  },
  {
    name: "NO2 Measurements",
    description: "Study nitrous oxide concentrations in the atmosphere.",
    href: "/no2",
    icon: Atom,
  },
  {
    name: "Polar Ice Extent",
    description: "Track changes in Arctic and Antarctic ice coverage.",
    href: "/polar-ice",
    icon: Snowflake,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-10 px-6">
      <div className="text-center mb-12">
        <h1
          className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-800 
                bg-clip-text text-transparent animate-brightness-pulse"
        >
          Climate Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-lg max-w-lg mx-auto mt-4">
          Real-time climate data at your fingertips. <br /> Explore trends,
          monitor emissions, and track environmental changes.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols- max-w-[1200px] w-full">
        {features.map((feature) => (
          <Card
            key={feature.name}
            className="relative flex flex-col border border-gray-300 dark:border-gray-700 shadow-lg 
                      bg-white/90 dark:bg-gray-800/90 rounded-xl overflow-hidden transition-all 
                      duration-300 group hover:scale-[1.07] hover:shadow-indigo-500/50"
          >
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500 transition-all duration-300 rounded-xl pointer-events-none"></div>

            <CardHeader className="flex flex-row items-center gap-4 p-6 text-left">
              <div className="p-3 rounded-lg bg-indigo-500/20 dark:bg-indigo-400/20 transition-all group-hover:scale-125">
                <feature.icon className="h-10 w-10 text-indigo-600 dark:text-indigo-300" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                {feature.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="px-6 pb-4 text-left">
              <p className="text-md text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </CardContent>

            <CardFooter className="mt-auto p-6 relative z-9">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white 
                          shadow-lg hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all 
                          duration-300 rounded-lg py-3 text-lg font-semibold"
              >
                <Link to={feature.href}>View Chart</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
