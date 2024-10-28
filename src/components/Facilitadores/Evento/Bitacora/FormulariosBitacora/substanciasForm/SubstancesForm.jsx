import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import "./SubstanciesForm.css"; // Asegúrate de importar el CSS

const substances = [
  { id: "cocaina", label: "Cocaína" },
  { id: "marihuana", label: "Marihuana" },
  { id: "anfetaminas", label: "Anfetaminas" },
  { id: "opiaceos", label: "Opiáceos" },
  { id: "mescalina", label: "Mescalina" },
  { id: "psilocibina", label: "Psilocibina" },
  { id: "alcohol", label: "Alcohol" },
];

const SubstancesForm = ({ onNext }) => {
  const formik = useFormik({
    initialValues: {
      comments: "", // Comentarios generales
      ...substances.reduce((acc, substance) => {
        acc[substance.id] = ""; // Inicializa cada sustancia
        return acc;
      }, {}),
    },
    validationSchema: Yup.object({
      comments: Yup.string().optional(),
      ...substances.reduce((acc, substance) => {
        acc[substance.id] = Yup.string().required("Requerido");
        return acc;
      }, {}),
    }),
    onSubmit: (values) => {
      console.log("Formulario de Sustancias enviado:", values);
      onNext(); // Llama a la función onNext para avanzar al siguiente formulario
    },
  });

  return (
    <div className="form-container">
      <h2 className="form-title">¿Has consumido alguna de estas sustancias?</h2>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "grid", gap: 2 }}>
          {substances.map((substance) => (
            <div className="form-field" key={substance.id}>
              <TextField
                select
                name={substance.id}
                label={substance.label}
                value={formik.values[substance.id]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched[substance.id] &&
                  Boolean(formik.errors[substance.id])
                }
                helperText={
                  formik.touched[substance.id] && formik.errors[substance.id]
                    ? formik.errors[substance.id]
                    : ""
                }
              >
                <MenuItem value="si">Sí</MenuItem>
                <MenuItem value="no">No</MenuItem>
                <MenuItem value="">Otro</MenuItem>
              </TextField>
            </div>
          ))}
          <div className="form-field">
            <TextField
              name="comments"
              label="Comentarios adicionales"
              multiline
              rows={4}
              value={formik.values.comments}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.comments && Boolean(formik.errors.comments)}
              helperText={formik.touched.comments && formik.errors.comments}
            />
          </div>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="form-button"
          sx={{ mt: 3 }}
        >
          Siguiente
        </Button>
      </form>
    </div>
  );
};

// Validación de tipos de props
SubstancesForm.propTypes = {
  onNext: PropTypes.func.isRequired, // onNext es una función requerida
};

export default SubstancesForm;
