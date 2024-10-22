import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Hook de navegación
import { registerFacilitador } from "../../../redux/registerFacilitador/registerFacilitadorSlice";
import "./RegisterFacilitadorForm.css";

const RegistrarFacilitador = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook para redirigir

  const initialValues = {
    name: "",
    email: "",
    password: "", // El administrador escribirá la contraseña
    role: "facilitador", // Asignar rol directamente
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  const handleSubmit = (values) => {
    dispatch(registerFacilitador(values)); // Acción para crear facilitador
    navigate("/dashboard-administrador/facilitadores"); // Redirigir a la vista de facilitadores
  };

  return (
    <div className="registrar-facilitador">
      <h2>Registrar Facilitador</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form">
          <Field type="text" name="name" placeholder="Nombre" />
          <ErrorMessage name="name" component="div" className="error" />

          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" className="error" />

          <Field type="password" name="password" placeholder="Contraseña" />
          <ErrorMessage name="password" component="div" className="error" />

          <button type="submit">Registrar</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrarFacilitador;
