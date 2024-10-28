import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import "./MedicalForm.css";

const medicalConditions = [
  { id: "fobia", label: "Fobias" },
  { id: "insomnio", label: "Insomnio" },
  { id: "toc", label: "Trastorno obsesivo compulsivo" },
  { id: "depresion", label: "Tratamiento por depresión" },
  { id: "suicidio", label: "Intento de suicidio" },
  { id: "alimenticios", label: "Trastornos alimenticios" },
  { id: "esquizofrenia", label: "Esquizofrenia" },
  { id: "abuso", label: "Tocamientos indebidos o abuso sexual" },
  { id: "cardiopatias", label: "Cardiopatías" },
  { id: "diabetes", label: "Diabetes" },
  { id: "colesterol", label: "Colesterol elevado" },
  { id: "depresionGeneral", label: "Depresión" },
  { id: "ansiedad", label: "Ansiedad" },
  { id: "estres", label: "Estrés" },
  { id: "asma", label: "Asma" },
  { id: "adicciones", label: "Adicciones" },
  { id: "otras", label: "Otras" },
];

const MedicalForm = ({ onNext }) => {
  const formik = useFormik({
    initialValues: medicalConditions.reduce((acc, condition) => {
      acc[condition.id] = "";
      return acc;
    }, {}),
    validationSchema: Yup.object(
      medicalConditions.reduce((acc, condition) => {
        acc[condition.id] = Yup.string().required("Requerido");
        return acc;
      }, {})
    ),
    onSubmit: (values) => {
      console.log("Formulario de Condiciones Médicas enviado:", values);
      onNext();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <h2 className="form-title">Condiciones Médicas</h2>
      <Box className="form-content">
        {medicalConditions.map((condition) => (
          <Accordion key={condition.id} className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${condition.id}-content`}
              id={`${condition.id}-header`}
            >
              <Typography className="accordion-title">
                {condition.label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                select
                fullWidth
                name={condition.id}
                label={`¿Padece ${condition.label.toLowerCase()}?`}
                value={formik.values[condition.id]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched[condition.id] &&
                  Boolean(formik.errors[condition.id])
                }
                helperText={
                  formik.touched[condition.id] && formik.errors[condition.id]
                }
                className="form-field"
              >
                <MenuItem value="si">Sí</MenuItem>
                <MenuItem value="no">No</MenuItem>
                <MenuItem value="otro">Otro</MenuItem>
              </TextField>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="form-button"
      >
        Siguiente
      </Button>
    </form>
  );
};

MedicalForm.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default MedicalForm;
