import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { setSelectedEvento } from "../../../redux/eventos/GetEventosSlice";
import { logout } from "../../../redux/login/LoginUsersSlice";
import "./SideBarFacilitadores.css";

const SideBarFacilitador = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.login.user);
  const selectedEvento = useSelector((state) => state.eventos.selectedEvento);

  const facilitadorName = user ? user.name : "Facilitador";
  const [showEventosOptions, setShowEventosOptions] = useState(false);
  const [showCrearEventoOptions, setShowCrearEventoOptions] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSelectEvento = (id) => {
    dispatch(setSelectedEvento(id)); // Marca el evento como seleccionado
    navigate(`/dashboard-facilitador/eventodetail/${id}`);
  };

  // Verifica si el usuario está en la página de detalles del evento
  const isEventoDetailPage = location.pathname.includes(
    `/eventodetail/${selectedEvento}`
  );

  return (
    <div className="sidebar-facilitador">
      <h2>Hola, {facilitadorName}</h2>

      <button
        className="sidebar-btn"
        onClick={() => setShowEventosOptions(!showEventosOptions)}
      >
        Eventos
      </button>
      {showEventosOptions && (
        <div className="facilitador-options">
          <Link to="/dashboard-facilitador/eventos">
            <button className="sidebar-sub-btn">Ver Eventos</button>
          </Link>
          <button
            className="sidebar-sub-btn"
            onClick={() => setShowCrearEventoOptions(!showCrearEventoOptions)}
          >
            Crear
          </button>
          {showCrearEventoOptions && (
            <div className="crear-evento-options">
              <Link to="/dashboard-facilitador/eventoform">
                <button className="sidebar-sub-btn">Evento</button>
              </Link>
              <Link to="/dashboard-facilitador/sesiones">
                <button className="sidebar-sub-btn">Programar Sesiones</button>
              </Link>
              <Link to="/dashboard-facilitador/contenido">
                <button className="sidebar-sub-btn">Contenido</button>
              </Link>
              <Link to="/dashboard-facilitador/bitacora">
                <button className="sidebar-sub-btn">Bitácora</button>
              </Link>
              <Link to="/dashboard-facilitador/participantes/registrar">
                <button className="sidebar-sub-btn">
                  Registrar Participante
                </button>
              </Link>
            </div>
          )}
        </div>
      )}

      {!isEventoDetailPage && selectedEvento && (
        <div className="event-options">
          <h3>Opciones del Evento Seleccionado</h3>
          <Link to={`/dashboard-facilitador/eventodetail/${selectedEvento}`}>
            <button
              onClick={() => handleSelectEvento(selectedEvento)}
              className="sidebar-sub-btn"
            >
              Detalles del Evento
            </button>
          </Link>
          <Link
            to={`/dashboard-facilitador/eventos/${selectedEvento}/sesiones`}
          >
            <button className="sidebar-sub-btn">Programar Sesiones</button>
          </Link>
          <Link
            to={`/dashboard-facilitador/eventos/${selectedEvento}/contenido`}
          >
            <button className="sidebar-sub-btn">Contenido</button>
          </Link>
          <Link
            to={`/dashboard-facilitador/eventos/${selectedEvento}/bitacora`}
          >
            <button className="sidebar-sub-btn">Bitácora</button>
          </Link>
        </div>
      )}

      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default SideBarFacilitador;
