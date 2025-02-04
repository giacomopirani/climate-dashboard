import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "../src/components/layout/layout";
import { ThemeProvider } from "../src/components/ui/theme-provider";
import CO2 from "../src/pages/co2";
import Home from "../src/pages/home";
import Methane from "../src/pages/methane";
import NO2 from "../src/pages/no2";
import PolarIce from "../src/pages/polar-ice/polar-ice";
import Temperature from "../src/pages/temperature/temperature";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/temperature" element={<Temperature />} />
            <Route path="/co2" element={<CO2 />} />
            <Route path="/methane" element={<Methane />} />
            <Route path="/no2" element={<NO2 />} />
            <Route path="/polar-ice" element={<PolarIce />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
