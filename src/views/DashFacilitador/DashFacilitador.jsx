import { Routes, Route } from "react-router-dom";
import SideBarFacilitador from "../../components/Facilitadores/SideBarFacilitadores/SideBarFacilitadores";
import Participantes from "../../components/Facilitadores/Participantes/Participantes";
import RegisterEventForm from "../../components/Facilitadores/registerEventoForm/RegisterEventForm";
import EventList from "../../components/Facilitadores/Evento/Eventos";
import EventDetail from "../../components/Facilitadores/Evento/EventoDetails/EventoDetail";
import SessionesForm from "../../components/Facilitadores/Evento/Sesiones/SessionesForm";
import ContenidoForm from "../../components/Facilitadores/Evento/EventoContenido/ContenidoForm";
import BitacoraForm from "../../components/Facilitadores/Evento/Bitacora/BitacoraForm";
import "./DashFacilitador.css";

const DashboardFacilitador = () => {
  return (
    <div className="dashboard-facilitador">
      <SideBarFacilitador />
      <div className="dashboard-content">
        <Routes>
          <Route path="eventoform" element={<RegisterEventForm />} />
          <Route path="eventos" element={<EventList />} />
          <Route path="eventodetail/:id" element={<EventDetail />} />
          <Route path="eventodetail/:id/sesiones" element={<SessionesForm />} />
          <Route
            path="eventodetail/:id/contenido"
            element={<ContenidoForm />}
          />
          <Route path="eventodetail/:id/bitacora" element={<BitacoraForm />} />
          <Route
            path="eventodetail/:id/participantes"
            element={<Participantes />}
          />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardFacilitador;
