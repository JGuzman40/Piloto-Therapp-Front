// EventList.js
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getEventos,
  setSelectedEvento,
} from "../../../redux/eventos/GetEventosSlice"; // Ajusta la importación
import { useEffect } from "react";

const EventList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventos = useSelector((state) => state.eventos.eventos);
  const loading = useSelector((state) => state.eventos.loading);
  const error = useSelector((state) => state.eventos.error);

  useEffect(() => {
    dispatch(getEventos());
  }, [dispatch]);

  const handleSelectEvento = (id) => {
    dispatch(setSelectedEvento(id)); // Marca el evento como seleccionado
    navigate(`/dashboard-facilitador/eventodetail/${id}`);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar eventos: {error}</div>;

  return (
    <div>
      <h2>Eventos</h2>
      {eventos.length === 0 ? (
        <div>No hay eventos disponibles.</div>
      ) : (
        <div className="event-list">
          {eventos.map((evento) => (
            <div className="event-card" key={evento.id}>
              <h3>{evento.eventName}</h3>
              <p>Descripción: {evento.description}</p>
              <img src={evento.eventImage} alt={evento.eventName} />
              <p>Estado: {evento.isActive ? "Activo" : "Inactivo"}</p>
              <button onClick={() => handleSelectEvento(evento.id)}>
                Ver Detalles
              </button>
              {/* Resto de la tarjeta */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
