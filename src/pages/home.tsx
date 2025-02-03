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
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mx-auto">
      {features.map((feature) => (
        <Card key={feature.name} className="flex flex-col border shadow-lg">
          <CardHeader>
            <feature.icon className="h-8 w-8 text-primary mb-2" />
            <CardTitle>{feature.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button asChild className="w-full">
              <Link to={feature.href}>View Chart</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
