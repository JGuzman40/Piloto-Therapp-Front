import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // Importa Link
import { logout } from "../../../redux/login/LoginUsersSlice"; // Asegúrate de que la ruta sea correcta
import "./SideBarAdmin.css";

const SideBarAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);

  // Verificar si existe el usuario y obtener el nombre
  const adminName = user ? user.name : "Administrador"; // Fallback si no hay nombre
  const [showFacilitadoresOptions, setShowFacilitadoresOptions] =
    useState(false);

  const toggleFacilitadoresOptions = () => {
    setShowFacilitadoresOptions(!showFacilitadoresOptions);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Despachar acción de logout
  };

  return (
    <div className="sidebar-admin">
      <h2>Hola, {adminName}</h2>
      <button className="sidebar-btn" onClick={toggleFacilitadoresOptions}>
        Facilitadores
      </button>
      {showFacilitadoresOptions && (
        <div className="facilitadores-options">
          <Link to="/dashboard-administrador/facilitadores">
            <button className="sidebar-sub-btn">Ver Facilitadores</button>
          </Link>
          <Link to="/dashboard-administrador/registrar-facilitador">
            <button className="sidebar-sub-btn">Registrar Facilitador</button>
          </Link>
        </div>
      )}
      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default SideBarAdmin;
