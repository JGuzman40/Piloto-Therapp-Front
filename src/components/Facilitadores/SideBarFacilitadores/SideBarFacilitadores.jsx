import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../../redux/login/LoginUsersSlice";
import "./SideBarFacilitadores.css";

const SideBarFacilitador = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);

  const facilitadorName = user ? user.name : "Facilitador";
  const [showEventosOptions, setShowEventosOptions] = useState(false);

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
          <Link to="/dashboard-facilitador/eventos/ver">
            <button className="sidebar-sub-btn">Ver Eventos</button>
          </Link>
          <Link to="/dashboard-facilitador/eventos/crear">
            <button className="sidebar-sub-btn">Crear Evento</button>
          </Link>
          <Link to="/dashboard-facilitador/participantes/registrar">
            <button className="sidebar-sub-btn">Registrar Participante</button>
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
