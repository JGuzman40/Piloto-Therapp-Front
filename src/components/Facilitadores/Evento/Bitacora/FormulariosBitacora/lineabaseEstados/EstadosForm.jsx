import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Importa icono de flecha hacia atrás
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Importa icono de flecha hacia adelante
import { useRef } from "react";
import "./EstadosForm.css";

const estadosIniciales = {
  calidadSueno: {
    lineaBase: 1,
    actual: "",
    comentario: "",
    descripcion: "¿Me despierto despejado o tengo problemas para dormir?",
  },
  energia: {
    lineaBase: 3,
    actual: "",
    comentario: "",
    descripcion: "¿Me siento activo y con vigor o fatigado?",
  },
  animo: {
    lineaBase: 4,
    actual: "",
    comentario: "",
    descripcion:
      "¿Me siento animado y de buen humor o cambios y dificultades emocionales?",
  },
  autoeficacia: {
    lineaBase: 2,
    actual: "",
    comentario: "",
    descripcion:
      "¿Confío en mi capacidad para hacer frente a las cosas o me siento desmotivado?",
  },
  tranquilidad: {
    lineaBase: 1,
    actual: "",
    comentario: "",
    descripcion: "¿Me siento en calma y relajado?",
  },
  amabilidad: {
    lineaBase: 4,
    actual: "",
    comentario: "",
    descripcion: "¿Trato a los demás con consideración?",
  },
  foco: {
    lineaBase: 5,
    actual: "",
    comentario: "",
    descripcion: "¿Dirijo mi atención completamente a lo que realizo?",
  },
  creatividad: {
    lineaBase: 5,
    actual: "",
    comentario: "",
    descripcion: "Afronto situaciones de forma ingeniosa.",
  },
  cognicion: {
    lineaBase: 4,
    actual: "",
    comentario: "",
    descripcion: "Comprendo y razono inteligentemente.",
  },
  autoconocimiento: {
    lineaBase: 3,
    actual: "",
    comentario: "",
    descripcion: "Me conozco y acepto.",
  },
  contemplacion: {
    lineaBase: 4,
    actual: "",
    comentario: "",
    descripcion: "Me detengo a apreciar más las cosas.",
  },
  conexion: {
    lineaBase: 5,
    actual: "",
    comentario: "",
    descripcion: "Tengo una sensación de estar conectado con todo.",
  },
  espiritualidad: {
    lineaBase: 4,
    actual: "",
    comentario: "",
    descripcion: "Siento cercanía con lo sagrado.",
  },
};

const EstadosForm = () => {
  const formik = useFormik({
    initialValues: estadosIniciales,
    onSubmit: (values) => {
      console.log("Datos enviados", values);
    },
  });

  const containerRef = useRef();

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const renderEstadoCard = (nombre, estado) => (
    <Card className="estado-card" key={nombre}>
      <CardContent className="estado-card-content">
        <div className="estado-info">
          <Typography className="estado-title" variant="h6">
            {nombre}
          </Typography>
          <Typography className="estado-linea-base" variant="body2">
            Línea Base: {estado.lineaBase}
          </Typography>
          <Typography className="estado-descripcion" variant="body2">
            {estado.descripcion}
          </Typography>
        </div>

        <FormControl className="estado-select">
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
          className="estado-comentario"
          label="Comentario"
          name={`${nombre}.comentario`}
          value={formik.values[nombre].comentario}
          onChange={formik.handleChange}
          fullWidth
          multiline
          rows={2}
          variant="outlined"
        />
      </CardContent>
    </Card>
  );

  return (
    <form className="estados-form-container" onSubmit={formik.handleSubmit}>
      <Typography className="estados-form-title" variant="h4" gutterBottom>
        Línea Base de Estados y Efectos
      </Typography>
      <Typography variant="subtitle1">Fecha de inicio: 15/07/24</Typography>

      <Box className="estados-form-slider">
        <IconButton onClick={scrollLeft} className="arrow-button">
          <ArrowBackIcon />
        </IconButton>

        <Box className="estados-form-grid" ref={containerRef}>
          {Object.keys(estadosIniciales).map((nombre) =>
            renderEstadoCard(nombre, estadosIniciales[nombre])
          )}
        </Box>

        <IconButton onClick={scrollRight} className="arrow-button">
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      <Box className="estados-form-buttons">
        <Button type="submit" className="btn-guardar" variant="contained">
          Guardar
        </Button>
      </Box>
    </form>
  );
};

export default EstadosForm;
