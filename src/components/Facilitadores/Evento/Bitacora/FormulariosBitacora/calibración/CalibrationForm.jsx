// src/components/Facilitadores/Evento/Bitacora/FormulariosBitacora/CalibrationForm.jsx

import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import "./CalibrationForm.css";

const CalibrationForm = ({ onNext, onPrevious, onSave }) => {
  const formik = useFormik({
    initialValues: {
      dailyDose: "",
      date: "",
      initialDose: "",
      assigned: "",
      intake: "",
      rest: "",
      day: "", // Puedes personalizar el nombre para cada día
    },
    validationSchema: Yup.object({
      dailyDose: Yup.string().required("La dosis diaria es requerida"),
      date: Yup.date().required("La fecha es requerida").nullable(),
      initialDose: Yup.string().required("La dosis inicial es requerida"),
      assigned: Yup.string().required("El campo asignado es requerido"),
      intake: Yup.string().required("El campo de toma es requerido"),
      rest: Yup.string().required("El campo de descanso es requerido"),
      day: Yup.string().required("El día es requerido"),
    }),
    onSubmit: (values) => {
      console.log("Formulario de Calibración enviado:", values);
      onSave(values); // Aquí puedes manejar el guardado
      onNext(); // Llama a la función onNext para avanzar al siguiente formulario
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Calibración de Dosis</h2>
      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField
          name="dailyDose"
          label="Dosis Diaria"
          type="number"
          value={formik.values.dailyDose}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.dailyDose && Boolean(formik.errors.dailyDose)}
          helperText={formik.touched.dailyDose && formik.errors.dailyDose}
        />

        <TextField
          name="date"
          label="Fecha"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
        />

        <TextField
          name="initialDose"
          label="Dosis Inicial"
          type="number"
          value={formik.values.initialDose}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.initialDose && Boolean(formik.errors.initialDose)
          }
          helperText={formik.touched.initialDose && formik.errors.initialDose}
        />

        <TextField
          name="assigned"
          label="Asignado"
          value={formik.values.assigned}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.assigned && Boolean(formik.errors.assigned)}
          helperText={formik.touched.assigned && formik.errors.assigned}
        />

        <TextField
          name="intake"
          label="Toma"
          value={formik.values.intake}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.intake && Boolean(formik.errors.intake)}
          helperText={formik.touched.intake && formik.errors.intake}
        />

        <TextField
          name="rest"
          label="Descanso"
          value={formik.values.rest}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rest && Boolean(formik.errors.rest)}
          helperText={formik.touched.rest && formik.errors.rest}
        />

        <TextField
          name="day"
          label="Día"
          value={formik.values.day}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.day && Boolean(formik.errors.day)}
          helperText={formik.touched.day && formik.errors.day}
        />
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={onPrevious} // Llama a la función onPrevious para retroceder
          sx={{ marginRight: 2 }}
        >
          Anterior
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Siguiente
        </Button>
      </Box>
      <Typography sx={{ marginTop: 2 }}>¿Cómo calibrar tu dosis?</Typography>
      <Button
        variant="text"
        color="secondary"
        onClick={() => console.log("Ver instrucciones de calibración")}
      >
        Ver
      </Button>
    </form>
  );
};

// Validación de tipos de props
CalibrationForm.propTypes = {
  onNext: PropTypes.func.isRequired, // onNext es una función requerida
  onPrevious: PropTypes.func.isRequired, // onPrevious es una función requerida
  onSave: PropTypes.func.isRequired, // onSave es una función requerida
};

export default CalibrationForm;
