import { Routes, Route } from "react-router-dom";
import SideBarFacilitador from "../../components/Facilitadores/SideBarFacilitadores/SideBarFacilitadores"; // Asegúrate de que la ruta sea correcta
import Participantes from "../../components/Facilitadores/Participantes/Participantes"; // Asegúrate de importar el componente adecuado
import RegisterEventForm from "../../components/Facilitadores/registerEventoForm/RegisterEventForm";
import EventList from "../../components/Facilitadores/Evento/Eventos";
import EventDetail from "../../components/Facilitadores/Evento/EventoDetails/EventoDetail";
import SessionesForm from "../../components/Facilitadores/Evento/Sesiones/SessionesForm";
import "./DashFacilitador.css"; // Asegúrate de importar los estilos

const DashboardFacilitador = () => {
  return (
    <div className="dashboard-facilitador">
      <SideBarFacilitador />
      <div className="dashboard-content">
        <Routes>
          <Route path="eventoform" element={<RegisterEventForm />} />
          <Route path="eventos" element={<EventList />} />
          <Route path="eventodetail/:id" element={<EventDetail />} />
          <Route path="participantes" element={<Participantes />} />
          <Route path="sesiones" element={<SessionesForm />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardFacilitador;
