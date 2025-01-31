import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const charts = [
  {
    title: "Temperature",
    description: "Global temperature trends",
    path: "/temperature",
  },
  { title: "CO2", description: "Carbon dioxide levels", path: "/co2" },
  { title: "Methane", description: "Methane concentration", path: "/methane" },
  { title: "NO2", description: "Nitrous oxide levels", path: "/no2" },
  { title: "Polar Ice", description: "Arctic ice extent", path: "/polar-ice" },
];

const Home = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {charts.map((chart) => (
        <Card key={chart.title}>
          <CardHeader>
            <CardTitle>{chart.title}</CardTitle>
            <CardDescription>{chart.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to={chart.path}>View Chart</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Home;
