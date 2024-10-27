import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventos } from "../../../../redux/eventos/GetEventosSlice"; // Asegúrate de importar la acción

const EventDetail = () => {
  const { id } = useParams(); // Obtén el ID del evento de la URL
  const dispatch = useDispatch();

  // Accedemos al estado de eventos y el estado de carga
  const eventos = useSelector((state) => state.eventos.eventos);
  const loading = useSelector((state) => state.eventos.loading);

  // Busca el evento actual una vez que loading es false y eventos está disponible
  const eventoActual = eventos.find((evento) => evento.id === Number(id));

  useEffect(() => {
    if (!eventos.length) {
      // Solo despacha la acción si no hay eventos cargados
      dispatch(getEventos());
    }
  }, [dispatch, eventos]);

  // Muestra un mensaje de carga si el estado está cargando
  if (loading) return <div>Cargando el evento...</div>;

  // Si el evento no se encuentra, muestra un mensaje de error
  if (!eventoActual) return <div>No se encontró el evento con ID {id}.</div>;

  return (
    <div>
      <h2>Detalles del Evento: {eventoActual.eventName}</h2>
      <p>Descripción: {eventoActual.description}</p>
      <img src={eventoActual.eventImage} alt={eventoActual.eventName} />
      <p>Estado: {eventoActual.isActive ? "Activo" : "Inactivo"}</p>
      {/* Aquí puedes agregar más secciones o detalles sobre el evento */}
    </div>
  );
};

export default EventDetail;
