import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createSession } from "../../../../redux/eventos/ProgramaSessionSlice";
import { useEffect } from "react";

const SessionesForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const eventos = useSelector((state) => state.eventos.eventos);
  const selectedEvento = useSelector((state) => state.eventos.selectedEvento);

  const eventoActual =
    eventos.find((evento) => evento.id === Number(id)) ||
    eventos.find((evento) => evento.id === selectedEvento);

  const eventId = eventoActual ? eventoActual.id : null;

  const formik = useFormik({
    initialValues: {
      name: "",
      time: "",
      meetingLink: "",
      message: "",
      days: "",
      dates: [],
      eventId: eventId || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es requerido"),
      time: Yup.string().required("La hora es requerida"),
      meetingLink: Yup.string().required(
        "El enlace de la reunión es requerido"
      ),
      days: Yup.string().required("Los días son requeridos"),
      dates: Yup.array()
        .of(Yup.string().required("La fecha es requerida"))
        .min(1, "Debe agregar al menos una fecha")
        .max(6, "No puede agregar más de 6 fechas"),
    }),
    onSubmit: (values) => {
      if (eventId) {
        values.eventId = eventId;
        dispatch(createSession(values))
          .unwrap()
          .then(() => {
            navigate(`/dashboard-facilitador/eventodetail/${eventId}`);
          })
          .catch((error) => {
            console.error("Error al crear la sesión: ", error);
          });
      } else {
        console.error("No se encontró el ID del evento");
      }
    },
  });

  // Actualiza eventId solo si es necesario
  useEffect(() => {
    if (eventId && formik.values.eventId !== eventId) {
      formik.setFieldValue("eventId", eventId);
    }
  }, [eventId, formik.values.eventId, formik]);

  // Funciones de manejo de fechas
  const handleAddFecha = () => {
    if (formik.values.dates.length < 6) {
      formik.setFieldValue("dates", [...formik.values.dates, ""]);
    } else {
      alert("Solo se pueden agregar hasta 6 fechas.");
    }
  };

  const handleRemoveFecha = (index) => {
    const nuevasFechas = [...formik.values.dates];
    nuevasFechas.splice(index, 1);
    formik.setFieldValue("dates", nuevasFechas);
  };

  const handleFechaChange = (index, value) => {
    const nuevasFechas = [...formik.values.dates];
    nuevasFechas[index] = value;
    formik.setFieldValue("dates", nuevasFechas);
  };

  if (!eventId) {
    return <div>No se encontró el evento. Verifica el ID en la URL.</div>;
  }

  return (
    <form onSubmit={formik.handleSubmit} key={eventId}>
      <h2>Programar Sesiones para: {eventoActual?.eventName}</h2>

      <div>
        <label htmlFor="name">Nombre de la Sesión</label>
        <input id="name" type="text" {...formik.getFieldProps("name")} />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="time">Hora</label>
        <input id="time" type="time" {...formik.getFieldProps("time")} />
        {formik.touched.time && formik.errors.time ? (
          <div>{formik.errors.time}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="meetingLink">Enlace de la reunión</label>
        <input
          id="meetingLink"
          type="text"
          {...formik.getFieldProps("meetingLink")}
        />
        {formik.touched.meetingLink && formik.errors.meetingLink ? (
          <div>{formik.errors.meetingLink}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="message">Mensaje</label>
        <textarea id="message" {...formik.getFieldProps("message")}></textarea>
      </div>

      <div>
        <label htmlFor="days">Días</label>
        <input id="days" type="text" {...formik.getFieldProps("days")} />
        {formik.touched.days && formik.errors.days ? (
          <div>{formik.errors.days}</div>
        ) : null}
      </div>

      <h3>Fechas</h3>
      {formik.values.dates.map((fecha, index) => (
        <div key={index}>
          <label htmlFor={`date-${index}`}>Fecha {index + 1}</label>
          <input
            id={`date-${index}`}
            type="date"
            value={fecha}
            onChange={(e) => handleFechaChange(index, e.target.value)}
          />
          <button type="button" onClick={() => handleRemoveFecha(index)}>
            Eliminar Fecha
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddFecha}>
        Añadir otra fecha
      </button>

      <button type="submit">Programar Sesiones</button>
    </form>
  );
};

export default SessionesForm;
