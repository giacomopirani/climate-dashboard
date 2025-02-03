import { Link } from "react-router-dom";
import { ModeToggle } from "../layout/mode-toggle";

const Header = () => {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Climate Dashboard
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/temperature" className="hover:underline">
                Temperature
              </Link>
            </li>
            <li>
              <Link to="/co2" className="hover:underline">
                CO2
              </Link>
            </li>
            <li>
              <Link to="/methane" className="hover:underline">
                Methane
              </Link>
            </li>
            <li>
              <Link to="/no2" className="hover:underline">
                NO2
              </Link>
            </li>
            <li>
              <Link to="/polar-ice" className="hover:underline">
                Polar Ice
              </Link>
            </li>
          </ul>
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
