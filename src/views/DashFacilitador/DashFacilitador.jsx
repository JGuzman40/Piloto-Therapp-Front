import { Routes, Route } from "react-router-dom";
import SideBarFacilitador from "../../components/Facilitadores/SideBarFacilitadores/SideBarFacilitadores"; // Asegúrate de que la ruta sea correcta
import Eventos from "../../components/Facilitadores/Eventos/Eventos"; // Asegúrate de importar el componente adecuado
import Participantes from "../../components/Facilitadores/Participantes/Participantes"; // Asegúrate de importar el componente adecuado
import "./DashFacilitador.css"; // Asegúrate de importar los estilos

const DashboardFacilitador = () => {
  return (
    <div className="dashboard-facilitador">
      <SideBarFacilitador />
      <div className="dashboard-content">
        <h1>Facilitadores</h1>
        <Routes>
          <Route path="eventos" element={<Eventos />} />
          <Route path="participantes" element={<Participantes />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardFacilitador;
