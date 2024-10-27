import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createEvento } from "../../../redux/eventos/CreateEventoSlice"; // Ajusta la ruta según tu estructura
import { useNavigate } from "react-router-dom";

const RegisterEventForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Para redirigir después de la creación del evento

  const initialValues = {
    eventType: "", // Cambiado de type a eventType
    eventName: "", // Cambiado de name a eventName
    eventImage: "", // Cambiado de imageUrl a eventImage
    isActive: true,
    description: "",
  };

  const validationSchema = Yup.object({
    eventType: Yup.string().required("Tipo de evento es requerido"), // Cambiado de type a eventType
    eventName: Yup.string().required("Nombre del evento es requerido"), // Cambiado de name a eventName
    eventImage: Yup.string()
      .url("URL de imagen inválida")
      .required("Imagen del evento es requerida"), // Cambiado de imageUrl a eventImage
    description: Yup.string().required("Descripción es requerida"),
  });

  const handleSubmit = async (values) => {
    dispatch(createEvento(values)); // Despacha la acción para crear el evento
    navigate("/dashboard-facilitador/eventos/ver"); // Redirige a la vista de eventos
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="eventType">Tipo de Evento</label>
          <Field as="select" name="eventType">
            <option value="">Selecciona un tipo de evento</option>
            <option value="Seminario">Seminario</option>
            <option value="Taller">Taller</option>
            <option value="Curso">Curso</option>
            <option value="Sesión personal">Sesión personal</option>
            <option value="Sesión grupal">Sesión grupal</option>
            <option value="Programa Microdosis">Programa Microdosis</option>
            <option value="Registro terapéutico">Registro terapéutico</option>
            <option value="Conferencia">Conferencia</option>
            <option value="Clase magistral">Clase magistral</option>
            <option value="Sesión de mediación">Sesión de mediación</option>
            <option value="Terapia de pareja">Terapia de pareja</option>
            <option value="Círculo de escucha">Círculo de escucha</option>
            <option value="Mindfulness">Mindfulness</option>
          </Field>
          <ErrorMessage name="eventType" component="div" />
        </div>

        <div>
          <label htmlFor="eventName">Nombre del Evento</label>
          <Field type="text" name="eventName" />
          <ErrorMessage name="eventName" component="div" />
        </div>

        <div>
          <label htmlFor="eventImage">Imagen del Evento (URL)</label>
          <Field type="text" name="eventImage" />
          <ErrorMessage name="eventImage" component="div" />
        </div>

        <div>
          <label htmlFor="isActive">Estado (Is Active)</label>
          <Field type="checkbox" name="isActive" />
        </div>

        <div>
          <label htmlFor="description">Descripción</label>
          <Field as="textarea" name="description" />
          <ErrorMessage name="description" component="div" />
        </div>

        <button type="submit">Crear Evento</button>
      </Form>
    </Formik>
  );
};

export default RegisterEventForm;
