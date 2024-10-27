import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createSession } from "../../../../redux/eventos/ProgramaSessionSlice";

const SessionesForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Obtiene el id del evento desde la URL
  const eventos = useSelector((state) => state.eventos.eventos); // Accede a los eventos desde Redux
  const selectedEvento = useSelector((state) => state.eventos.selectedEvento); // Obtiene el evento seleccionado si no está en la URL
  const eventoActual =
    eventos.find((evento) => evento.id === Number(id)) ||
    eventos.find((evento) => evento.id === selectedEvento);

  // Verifica si existe el evento y asigna el ID correspondiente
  const eventId = eventoActual ? eventoActual.id : null;

  const formik = useFormik({
    initialValues: {
      name: "",
      time: "",
      meetingLink: "",
      message: "",
      days: "",
      dates: [], // Campo para las fechas
      eventId: eventId || "", // Incluye el eventId aquí
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
      // Envío de los datos del formulario
      dispatch(createSession(values))
        .unwrap()
        .then(() => {
          navigate("/dashboard-facilitador/eventos"); // Redirige tras el éxito
        })
        .catch((error) => {
          console.error("Error al crear la sesión: ", error);
        });
    },
  });

  // Función para agregar una fecha
  const handleAddFecha = () => {
    if (formik.values.dates.length < 6) {
      formik.setFieldValue("dates", [...formik.values.dates, ""]);
    } else {
      alert("Solo se pueden agregar hasta 6 fechas.");
    }
  };

  // Función para eliminar una fecha
  const handleRemoveFecha = (index) => {
    const nuevasFechas = [...formik.values.dates];
    nuevasFechas.splice(index, 1);
    formik.setFieldValue("dates", nuevasFechas);
  };

  // Función para manejar el cambio de una fecha
  const handleFechaChange = (index, value) => {
    const nuevasFechas = [...formik.values.dates];
    nuevasFechas[index] = value;
    formik.setFieldValue("dates", nuevasFechas);
  };

  // Verifica si el evento actual existe
  if (!eventId) {
    return <div>No se encontró el evento. Verifica el ID en la URL.</div>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
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
