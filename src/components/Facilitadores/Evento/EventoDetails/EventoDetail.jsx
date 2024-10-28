import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventos } from "../../../../redux/eventos/GetEventosSlice";
import { getSessions } from "../../../../redux/eventos/GetProgramacionSesionSlice";
import { getSegments } from "../../../../redux/eventos/SegmentsEventosSlice";

const EventDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Accede a los estados de eventos, sesiones, segmentos y bitácora
  const eventos = useSelector((state) => state.eventos.eventos);
  const sessions = useSelector((state) => state.sessions.sessions);
  const segmentos = useSelector((state) => state.segmentos.segmentos);
  const bitacora = useSelector((state) => state.bitacora.bitacora); // Suponiendo que tienes este selector
  const loadingEventos = useSelector((state) => state.eventos.loading);
  const loadingSegmentos = useSelector((state) => state.segmentos.loading);
  const loadingBitacora = useSelector((state) => state.bitacora.loading); // Suponiendo que tienes este estado de carga

  const eventoActual = eventos.find((evento) => evento.id === Number(id));

  useEffect(() => {
    if (!eventos.length) dispatch(getEventos());
    if (eventoActual) {
      dispatch(getSessions(eventoActual.id));
      dispatch(getSegments(eventoActual.id));
      // Asegúrate de que esta llamada esté aquí
    }
  }, [dispatch, eventos, eventoActual]);

  if (loadingEventos || loadingSegmentos || loadingBitacora)
    return <div>Cargando el evento...</div>;
  if (!eventoActual) return <div>No se encontró el evento con ID {id}.</div>;

  const sessionsFiltradas = sessions.filter(
    (session) => session.eventId === eventoActual.id
  );
  const segmentsFiltrados = segmentos.filter(
    (segment) => segment.eventId === eventoActual.id
  );

  console.log("sessionsFiltradas:", sessionsFiltradas); // Verifica datos de sesiones
  console.log("segmentsFiltrados:", segmentsFiltrados); // Verifica datos de segmentos

  return (
    <div>
      <h2>Detalles del Evento: {eventoActual.eventName}</h2>
      <p>Descripción: {eventoActual.description}</p>
      <img src={eventoActual.eventImage} alt={eventoActual.eventName} />
      <p>Estado: {eventoActual.isActive ? "Activo" : "Inactivo"}</p>

      {bitacora && <h6 style={{ color: "green" }}>Bitácora Activa</h6>}

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

      <h3>Segmentos de Contenido</h3>
      {segmentsFiltrados.length > 0 ? (
        segmentsFiltrados.map((segment) => (
          <div key={segment.id}>
            <h4>{segment.name}</h4>
            <p>Temas: {segment.topics}</p>
            <p>Archivos: {segment.files.join(", ")}</p>
          </div>
        ))
      ) : (
        <p>No hay segmentos añadidos para este evento.</p>
      )}
    </div>
  );
};

export default EventDetail;
