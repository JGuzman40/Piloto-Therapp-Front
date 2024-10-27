import { Routes, Route } from "react-router-dom";
import LandingTherapp from "../src/views/LandingTherapp/LandingTherapp";
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import DashboardAdmin from "./views/DashAdmin/DashAdministrador";
import DashboardFacilitador from "./views/DashFacilitador/DashFacilitador";
import "./index.css"; // Asegúrate de que este archivo contenga tus estilos CSS

function App() {
  return (
    <div className="app-container">
      {" "}
      {/* Contenedor principal */}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingTherapp />} />
          <Route
            path="/dashboard-administrador/*"
            element={<DashboardAdmin />}
          />
          <Route
            path="/dashboard-facilitador/*"
            element={<DashboardFacilitador />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
