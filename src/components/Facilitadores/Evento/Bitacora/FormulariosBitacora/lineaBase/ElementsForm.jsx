import { useState } from "react";
import { TextField, Button } from "@mui/material";
import PropTypes from "prop-types"; // Importar PropTypes
import "./ElementsForm.css";

const ElementsForm = ({ onNext, onPrevious, onSave }) => {
  const [motivacion, setMotivacion] = useState("");
  const [diferente, setDiferente] = useState("");
  const [impactoAlimentacion, setImpactoAlimentacion] = useState("");
  const [suenos, setSuenos] = useState("");
  const [cambioCondicion, setCambioCondicion] = useState("");
  const [energiaSexual, setEnergiaSexual] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      motivacion,
      diferente,
      impactoAlimentacion,
      suenos,
      cambioCondicion,
      energiaSexual,
    };
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        Línea Base ¿Cómo te sientes en estos elementos antes de iniciar tu
        proceso con microdosis?
      </h2>

      <TextField
        label="¿Te has sentido motivada o emocionada?"
        value={motivacion}
        onChange={(e) => setMotivacion(e.target.value)}
        fullWidth
        multiline
        rows={2}
        required
      />

      <TextField
        label="🧩 ¿Has hecho, sentido o pensado algo distinto a lo habitual?"
        value={diferente}
        onChange={(e) => setDiferente(e.target.value)}
        fullWidth
        multiline
        rows={2}
        required
      />

      <TextField
        label="🥦 ¿Ha tenido impacto el cuidado de la alimentación en tu proceso hoy?"
        value={impactoAlimentacion}
        onChange={(e) => setImpactoAlimentacion(e.target.value)}
        fullWidth
        multiline
        rows={2}
        required
      />

      <TextField
        label="🧚‍♂️ ¿Tuviste sueños o sincronicidades que desees describir?"
        value={suenos}
        onChange={(e) => setSuenos(e.target.value)}
        fullWidth
        multiline
        rows={2}
        required
      />

      <TextField
        label="🚦 ¿Has experimentado algún cambio en tu condición médica?"
        value={cambioCondicion}
        onChange={(e) => setCambioCondicion(e.target.value)}
        fullWidth
        multiline
        rows={2}
        required
      />

      <TextField
        label="🎨 ¿Observas algún cambio en tu energía sexual o vida sexual?"
        value={energiaSexual}
        onChange={(e) => setEnergiaSexual(e.target.value)}
        fullWidth
        multiline
        rows={2}
        required
      />

      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          onClick={onPrevious}
          style={{ marginRight: "10px" }}
        >
          Anterior
        </Button>
        <Button variant="contained" type="submit">
          Guardar
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          style={{ marginLeft: "10px" }}
        >
          Siguiente
        </Button>
      </div>
    </form>
  );
};

// Definición de PropTypes
ElementsForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ElementsForm;
