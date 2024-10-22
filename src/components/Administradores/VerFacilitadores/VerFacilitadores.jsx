import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFacilitadores } from "../../../redux/registerFacilitador/registerFacilitadorSlice"; // Ajusta la ruta si es necesario
import "./VerFacilitadores.css";

const VerFacilitadores = () => {
  const dispatch = useDispatch();

  // Obtener facilitadores y el estado de la solicitud
  const { facilitadores, status, error } = useSelector(
    (state) => state.facilitadores
  );

  // Despachar fetchFacilitadores cuando el componente se monta
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFacilitadores());
    }
  }, [dispatch, status]);

  // Filtrar solo los facilitadores
  const facilitadoresFiltrados = facilitadores.filter(
    (facilitador) => facilitador.role === "facilitador"
  );

  return (
    <div className="ver-facilitadores">
      <h2>Lista de Facilitadores</h2>

      {/* Mostrar diferentes estados de la solicitud */}
      {status === "loading" && <p>Cargando facilitadores...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {/* Mostrar la lista de facilitadores filtrados cuando se cargan */}
      {status === "succeeded" && facilitadoresFiltrados.length > 0 ? (
        <ul className="facilitadores-list">
          {facilitadoresFiltrados.map((facilitador) => (
            <li key={facilitador.id} className="facilitador-item">
              <strong>Nombre:</strong> {facilitador.name} <br />
              <strong>Email:</strong> {facilitador.email} <br />
              <strong>Rol:</strong> {facilitador.role} <br />
              <strong>Activo:</strong> {facilitador.isActive ? "Sí" : "No"}{" "}
              <br />
              {facilitador.imageUrl && (
                <>
                  <strong>Imagen:</strong>
                  <img
                    src={facilitador.imageUrl}
                    alt={`Imagen de ${facilitador.name}`}
                    width="100"
                  />
                  <br />
                </>
              )}
              {/* No mostrar la contraseña hasheada */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay facilitadores registrados.</p>
      )}
    </div>
  );
};

export default VerFacilitadores;
