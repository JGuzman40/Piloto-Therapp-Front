import { useFormik } from "formik";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Box,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./DailyEstadosForm.css";

// Inicializa los estados diarios
const estadosDiariosIniciales = {
  calidadSueno: {
    nombre: "Calidad del Sueño",
    descripcion: "¿Me despierto despejado o tengo problemas para dormir?",
    actual: "",
    comentario: "",
  },
  energia: {
    nombre: "Energía",
    descripcion: "¿Me siento activo y con vigor o fatigado?",
    actual: "",
    comentario: "",
  },
  animo: {
    nombre: "Ánimo",
    descripcion:
      "¿Me siento animado y de buen humor o cambios y dificultades emocionales?",
    actual: "",
    comentario: "",
  },
  autoeficacia: {
    nombre: "Autoeficacia",
    descripcion:
      "¿Confío en mi capacidad para hacer frente a las cosas o me siento desmotivado?",
    actual: "",
    comentario: "",
  },
  // Agrega los demás estados aquí...
};

const DailyEstadosForm = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState("Día 01");
  const [cardIndex, setCardIndex] = useState(0);

  const formik = useFormik({
    initialValues: estadosDiariosIniciales,
    onSubmit: (values) => {
      console.log("Datos diarios enviados", {
        dia: diaSeleccionado,
        ...values,
      });
    },
  });

  const estadosKeys = Object.keys(estadosDiariosIniciales);

  const renderEstadoDiario = (nombre) => {
    const estado = estadosDiariosIniciales[nombre];
    if (!estado) return <Typography>Estado no encontrado</Typography>;

    return (
      <Box key={nombre} sx={{ marginBottom: 3, minWidth: "300px" }}>
        <Typography variant="h6">{estado.nombre}</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {estado.descripcion}
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Estado Actual (0-5)</InputLabel>
          <Select
            name={`${nombre}.actual`}
            value={formik.values[nombre].actual}
            onChange={formik.handleChange}
          >
            {[0, 1, 2, 3, 4, 5].map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Comentario"
          name={`${nombre}.comentario`}
          value={formik.values[nombre].comentario}
          onChange={formik.handleChange}
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          margin="normal"
        />
      </Box>
    );
  };

  const handleNext = () => {
    if (cardIndex < estadosKeys.length - 1) setCardIndex(cardIndex + 1);
  };

  const handlePrevious = () => {
    if (cardIndex > 0) setCardIndex(cardIndex - 1);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Bitácora de Estados y Efectos
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Día</InputLabel>
        <Select
          value={diaSeleccionado}
          onChange={(e) => setDiaSeleccionado(e.target.value)}
        >
          {Array.from(
            { length: 30 },
            (_, i) => `Día ${String(i + 1).padStart(2, "0")}`
          ).map((dia) => (
            <MenuItem key={dia} value={dia}>
              {dia}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <IconButton onClick={handlePrevious} disabled={cardIndex === 0}>
          <ArrowBackIosIcon />
        </IconButton>

        {renderEstadoDiario(estadosKeys[cardIndex])}

        <IconButton
          onClick={handleNext}
          disabled={cardIndex === estadosKeys.length - 1}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Button type="submit" variant="contained" color="primary">
        Guardar
      </Button>
    </form>
  );
};

export default DailyEstadosForm;
