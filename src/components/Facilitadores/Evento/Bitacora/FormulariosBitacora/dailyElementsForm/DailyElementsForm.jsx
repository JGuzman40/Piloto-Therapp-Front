import { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  MenuItem,
  Select,
} from "@mui/material";

const DailyElementForm = ({ onNext, onPrevious, onSave }) => {
  const [showCards, setShowCards] = useState(false);

  const formik = useFormik({
    initialValues: {
      day: "",
      hadChanges: "",
      habitualChanges: "",
      foodImpact: "",
      dreams: "",
      medicalChanges: "",
      sexualEnergyChanges: "",
      generalReflection: "",
      selectedOption: "",
    },
    validationSchema: Yup.object({
      day: Yup.string().required("Selecciona el día de la bitácora"),
      hadChanges: Yup.string().required("Indica si hubo cambios"),
      habitualChanges: Yup.string().when("hadChanges", {
        is: "yes",
        then: Yup.string().required("Este campo es requerido"),
      }),
      foodImpact: Yup.string().when("hadChanges", {
        is: "yes",
        then: Yup.string().required("Este campo es requerido"),
      }),
      dreams: Yup.string(),
      medicalChanges: Yup.string(),
      sexualEnergyChanges: Yup.string(),
      generalReflection: Yup.string().when("hadChanges", {
        is: "yes",
        then: Yup.string().required("Este campo es requerido"),
      }),
      selectedOption: Yup.string().when("hadChanges", {
        is: "yes",
        then: Yup.string().required("Debes seleccionar una opción"),
      }),
    }),
    onSubmit: (values) => {
      console.log("Formulario Diario enviado:", values);
      onSave(values);
      onNext();
    },
  });

  const handleChangesResponse = (event) => {
    const value = event.target.value;
    formik.setFieldValue("hadChanges", value);
    setShowCards(value === "yes");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h2">Bitácora Diaria</Typography>

      {/* Selector de Día */}
      <Box sx={{ marginTop: 2, marginBottom: 4 }}>
        <Typography variant="body1">
          Selecciona el día de la bitácora:
        </Typography>
        <FormControl fullWidth>
          <Select
            name="day"
            value={formik.values.day}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Día
            </MenuItem>
            {[...Array(30)].map((_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                Día {index + 1}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.day && formik.errors.day && (
            <Typography variant="caption" color="error">
              {formik.errors.day}
            </Typography>
          )}
        </FormControl>
      </Box>

      {/* Pregunta sobre cambios */}
      <Typography variant="body1">¿Tuviste cambios hoy?</Typography>
      <FormControl>
        <RadioGroup
          name="hadChanges"
          value={formik.values.hadChanges}
          onChange={handleChangesResponse}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Sí" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      {/* Cards adicionales si hubo cambios */}
      {showCards && (
        <Box sx={{ display: "grid", gap: 2, marginBottom: 4 }}>
          <Typography variant="body1">
            🧩 ¿Has hecho, sentido o pensado algo distinto a lo habitual?
          </Typography>
          <TextField
            name="habitualChanges"
            label="Escribe aquí..."
            multiline
            rows={3}
            value={formik.values.habitualChanges}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.habitualChanges &&
              Boolean(formik.errors.habitualChanges)
            }
            helperText={
              formik.touched.habitualChanges && formik.errors.habitualChanges
            }
          />

          {/* Más preguntas en formato de card */}
          <Typography variant="body1">
            🥦 ¿Ha tenido impacto o ha impactado el cuidado de la alimentación y
            energía en tu proceso hoy?
          </Typography>
          <TextField
            name="foodImpact"
            label="Escribe aquí..."
            multiline
            rows={3}
            value={formik.values.foodImpact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.foodImpact && Boolean(formik.errors.foodImpact)
            }
            helperText={formik.touched.foodImpact && formik.errors.foodImpact}
          />

          {/* Ejemplo de selección adicional */}
          <Typography variant="body1">Selecciona una opción:</Typography>
          <FormControl
            error={
              formik.touched.selectedOption &&
              Boolean(formik.errors.selectedOption)
            }
          >
            <RadioGroup
              name="selectedOption"
              value={formik.values.selectedOption}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="opcion1"
                control={<Radio />}
                label="Opción 1"
              />
              <FormControlLabel
                value="opcion2"
                control={<Radio />}
                label="Opción 2"
              />
            </RadioGroup>
            {formik.touched.selectedOption && formik.errors.selectedOption && (
              <Typography variant="caption" color="error">
                {formik.errors.selectedOption}
              </Typography>
            )}
          </FormControl>

          {/* Más campos adicionales */}
          <Typography variant="body1">
            🧚‍♂️ ¿Tuviste sueños o sincronicidades que desees describir?
          </Typography>
          <TextField
            name="dreams"
            label="Escribe aquí..."
            multiline
            rows={3}
            value={formik.values.dreams}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Typography variant="body1">
            🚦 Si es tu caso, ¿has experimentado algún cambio respecto a tu
            padecimiento?
          </Typography>
          <TextField
            name="medicalChanges"
            label="Escribe aquí..."
            multiline
            rows={3}
            value={formik.values.medicalChanges}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Typography variant="body1">
            🎨 ¿Observas algún cambio en tu energía sexual?
          </Typography>
          <TextField
            name="sexualEnergyChanges"
            label="Escribe aquí..."
            multiline
            rows={3}
            value={formik.values.sexualEnergyChanges}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Box>
      )}

      {/* Botones de navegación y guardar */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={onPrevious}>
          Anterior
        </Button>
        <Button type="submit" variant="contained">
          Siguiente
        </Button>
      </Box>
    </form>
  );
};

DailyElementForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default DailyElementForm;
