import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import "./IntentionForm.css";

const IntentionForm = ({ onNext, onPrevious, onSave }) => {
  const [showIntention, setShowIntention] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);

  const formik = useFormik({
    initialValues: {
      intention: "",
      benefits: "",
      challenges: "",
    },
    validationSchema: Yup.object({
      intention: Yup.string().required("La intención es requerida"),
      benefits: Yup.string().optional(),
      challenges: Yup.string().optional(),
    }),
    onSubmit: (values) => {
      console.log("Formulario de Intención enviado:", values);
      onSave(values);
      onNext();
    },
  });

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <Button
          className="button-toggle"
          onClick={() => setShowIntention(!showIntention)}
        >
          Intención
        </Button>
        {showIntention && (
          <div className="form-field">
            <TextField
              name="intention"
              label="Redacta tu intención"
              multiline
              rows={4}
              value={formik.values.intention}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.intention && Boolean(formik.errors.intention)
              }
              helperText={formik.touched.intention && formik.errors.intention}
              fullWidth
            />
          </div>
        )}

        <Button
          className="button-toggle"
          onClick={() => setShowBenefits(!showBenefits)}
        >
          Beneficios
        </Button>
        {showBenefits && (
          <div className="form-field">
            <TextField
              name="benefits"
              label="Beneficios de la intención"
              multiline
              rows={4}
              value={formik.values.benefits}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.benefits && formik.errors.benefits}
              fullWidth
            />
          </div>
        )}

        <Button
          className="button-toggle"
          onClick={() => setShowChallenges(!showChallenges)}
        >
          Desafíos
        </Button>
        {showChallenges && (
          <div className="form-field">
            <TextField
              name="challenges"
              label="Desafíos de la intención"
              multiline
              rows={4}
              value={formik.values.challenges}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.challenges && formik.errors.challenges}
              fullWidth
            />
          </div>
        )}

        <button type="submit">Siguiente</button>
        <button type="button" className="previous-button" onClick={onPrevious}>
          Anterior
        </button>
      </form>
    </div>
  );
};

IntentionForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default IntentionForm;
