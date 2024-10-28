import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material";
import PropTypes from "prop-types";
import "./GeneralForm.css"; // Importa el archivo CSS

const GeneralForm = ({ onNext }) => {
  const formik = useFormik({
    initialValues: {
      fechaHoy: "",
      fechaNacimiento: "",
      peso: "",
      talla: "",
    },
    validationSchema: Yup.object({
      fechaHoy: Yup.date().required("Requerido"),
      fechaNacimiento: Yup.date().required("Requerido"),
      peso: Yup.number()
        .required("Requerido")
        .positive("El peso debe ser positivo"),
      talla: Yup.number()
        .required("Requerido")
        .positive("La talla debe ser positiva"),
    }),
    onSubmit: (values) => {
      console.log("Formulario General enviado:", values);
      onNext(); // Llama a la función onNext para avanzar al siguiente formulario
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <h2 className="form-title">Información General</h2>
      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="Fecha de hoy (día/mes/año)"
          type="date"
          name="fechaHoy"
          value={formik.values.fechaHoy}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fechaHoy && Boolean(formik.errors.fechaHoy)}
          helperText={formik.touched.fechaHoy && formik.errors.fechaHoy}
          className="form-field"
        />
        <TextField
          label="Fecha de nacimiento (día/mes/año)"
          type="date"
          name="fechaNacimiento"
          value={formik.values.fechaNacimiento}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.fechaNacimiento &&
            Boolean(formik.errors.fechaNacimiento)
          }
          helperText={
            formik.touched.fechaNacimiento && formik.errors.fechaNacimiento
          }
          className="form-field"
        />
        <TextField
          label="Peso (kg)"
          type="number"
          name="peso"
          value={formik.values.peso}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.peso && Boolean(formik.errors.peso)}
          helperText={formik.touched.peso && formik.errors.peso}
          className="form-field"
        />
        <TextField
          label="Talla (m)"
          type="number"
          name="talla"
          value={formik.values.talla}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.talla && Boolean(formik.errors.talla)}
          helperText={formik.touched.talla && formik.errors.talla}
          className="form-field"
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        className="form-button"
      >
        Siguiente
      </Button>
    </form>
  );
};

// Validación de tipos de props
GeneralForm.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default GeneralForm;
