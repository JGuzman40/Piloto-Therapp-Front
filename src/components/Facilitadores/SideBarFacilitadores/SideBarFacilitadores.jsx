import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../../redux/login/LoginUsersSlice";
import "./SideBarFacilitadores.css";

const SideBarFacilitador = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const selectedEvento = useSelector((state) => state.eventos.selectedEvento);

  // Obtener el nombre del facilitador de Redux o localStorage si Redux no tiene el nombre disponible
  const facilitadorName =
    user?.name || localStorage.getItem("facilitadorNombre") || "Facilitador";

  // Almacenar el nombre en localStorage si el usuario está autenticado
  useEffect(() => {
    if (user?.name) {
      localStorage.setItem("facilitadorNombre", user.name);
    }
  }, [user]);

  const [showEventosOptions, setShowEventosOptions] = useState(false);
  const [showCrearEventoOptions, setShowCrearEventoOptions] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
              <Link
                to={`/dashboard-facilitador/eventodetail/${selectedEvento}/sesiones`}
              >
                <button className="sidebar-sub-btn">Programar Sesiones</button>
              </Link>
              <Link
                to={`/dashboard-facilitador/eventodetail/${selectedEvento}/contenido`}
              >
                <button className="sidebar-sub-btn">Contenido</button>
              </Link>
              <Link
                to={`/dashboard-facilitador/eventodetail/${selectedEvento}/bitacora`}
              >
                <button className="sidebar-sub-btn">Bitácora</button>
              </Link>
              <Link
                to={`/dashboard-facilitador/eventodetail/${selectedEvento}/participantes/registrar`}
              >
                <button className="sidebar-sub-btn">
                  Registrar Participante
                </button>
              </Link>
            </div>
          )}
        </div>
      )}

      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default SideBarFacilitador;
