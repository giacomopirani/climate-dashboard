import { BrowserRouter as Router } from "react-router-dom";
import "./app.css";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
