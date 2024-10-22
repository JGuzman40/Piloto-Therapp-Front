import { Routes, Route } from "react-router-dom";
import SideBarAdmin from "../../components/Administradores/SideBarAdmin/SideBarAdmin";
import VerFacilitadores from "../../components/Administradores/VerFacilitadores/VerFacilitadores";
import RegistrarFacilitador from "../../components/Administradores/RegisterFacilitadorForm/RegisterFacilitadorForm";
import "./DashAdministrador.css"; // Asegúrate de importar los estilos

const DashboardAdmin = () => {
  return (
    <div className="dashboard-admin">
      <SideBarAdmin />
      <div className="dashboard-content">
        <Routes>
          <Route path="facilitadores" element={<VerFacilitadores />} />
          <Route
            path="registrar-facilitador"
            element={<RegistrarFacilitador />}
          />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardAdmin;
