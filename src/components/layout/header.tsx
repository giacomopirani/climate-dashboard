import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Climate Dashboard
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/temperature">Temperature</Link>
          </li>
          <li>
            <Link to="/co2">CO2</Link>
          </li>
          <li>
            <Link to="/methane">Methane</Link>
          </li>
          <li>
            <Link to="/no2">NO2</Link>
          </li>
          <li>
            <Link to="/polar-ice">Polar Ice</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
