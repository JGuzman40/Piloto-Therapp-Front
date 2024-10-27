import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventos } from "../../../../redux/eventos/GetEventosSlice";
import { getSessions } from "../../../../redux/eventos/GetProgramacionSesionSlice";

const EventDetail = () => {
  const { id } = useParams(); // Obtiene el ID del evento de la URL
  const dispatch = useDispatch();

  // Accede a los estados de eventos y sesiones
  const eventos = useSelector((state) => state.eventos.eventos);
  const sessions = useSelector((state) => state.sessions.sessions); // Ajusta si tu estado es diferente
  const loading = useSelector((state) => state.eventos.loading);

  // Encuentra el evento actual por ID
  const eventoActual = eventos.find((evento) => evento.id === Number(id));

  useEffect(() => {
    if (!eventos.length) dispatch(getEventos()); // Carga los eventos si no están ya cargados
    if (eventoActual) dispatch(getSessions(eventoActual.id)); // Carga las sesiones del evento actual
  }, [dispatch, eventos, eventoActual]);

  if (loading) return <div>Cargando el evento...</div>;

  if (!eventoActual) return <div>No se encontró el evento con ID {id}.</div>;

  // Filtra las sesiones para mostrar solo las que pertenecen al evento actual
  const sessionsFiltradas = sessions.filter(
    (session) => session.eventId === eventoActual.id
  );

  return (
    <div>
      <h2>Detalles del Evento: {eventoActual.eventName}</h2>
      <p>Descripción: {eventoActual.description}</p>
      <img src={eventoActual.eventImage} alt={eventoActual.eventName} />
      <p>Estado: {eventoActual.isActive ? "Activo" : "Inactivo"}</p>

      {/* Muestra la programación de sesiones */}
      <h3>Programación de Sesiones</h3>
      {sessionsFiltradas.length > 0 ? (
        sessionsFiltradas.map((session) => (
          <div key={session.id}>
            <h4>{session.name}</h4>
            <p>Hora: {session.time}</p>
            <p>
              Enlace: <a href={session.meetingLink}>{session.meetingLink}</a>
            </p>
            <p>Mensaje: {session.message}</p>
            <p>Días: {session.days}</p>
            <p>Fechas: {session.dates.join(", ")}</p>
          </div>
        ))
      ) : (
        <p>No hay sesiones programadas para este evento.</p>
      )}
    </div>
  );
};

export default EventDetail;
