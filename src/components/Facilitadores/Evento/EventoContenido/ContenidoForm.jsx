import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createSegment } from "../../../../redux/eventos/SegmentsEventosSlice";
import { useEffect } from "react";

const ContenidoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const eventos = useSelector((state) => state.eventos.eventos);
  const selectedEvento = useSelector((state) => state.eventos.selectedEvento);

  const eventoActual =
    eventos.find((evento) => evento.id === Number(id)) ||
    eventos.find((evento) => evento.id === selectedEvento);

  const eventId = eventoActual ? eventoActual.id : null;

  const formik = useFormik({
    initialValues: {
      segments: [{ eventId: eventId || "", name: "", topics: "", files: [] }],
    },
    validationSchema: Yup.object({
      segments: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string().required(
              "El nombre del segmento es obligatorio"
            ),
            topics: Yup.string().required("Los temas son obligatorios"),
            files: Yup.array().of(Yup.mixed()),
          })
        )
        .min(1, "Debes añadir al menos un segmento"),
    }),
    onSubmit: (values) => {
      if (eventId) {
        const validSegments = values.segments.filter(
          (segment) =>
            segment.name.trim() !== "" && segment.topics.trim() !== ""
        );

        const segmentsToSend = validSegments.map((segment) => ({
          eventId: eventId,
          name: segment.name,
          topics: segment.topics,
          files: segment.files.map((file) => file.name), // Extraer solo los nombres de archivos
        }));

        if (segmentsToSend.length > 0) {
          console.log("Segmentos válidos para enviar:", segmentsToSend);
          const promises = segmentsToSend.map((segment) =>
            dispatch(createSegment(segment)).unwrap()
          );

          Promise.all(promises)
            .then(() => {
              navigate(`/dashboard-facilitador/eventodetail/${eventId}`);
            })
            .catch((error) => {
              console.error("Error al crear los segmentos: ", error);
            });
        } else {
          console.error("No hay segmentos válidos para enviar.");
        }
      } else {
        console.error("No se encontró el ID del evento");
      }
    },
  });

  useEffect(() => {
    if (eventId && formik.values.segments[0].eventId !== eventId) {
      formik.setFieldValue("segments", [
        { eventId: eventId, name: "", topics: "", files: [] },
      ]);
    }
  }, [eventId, formik]);

  const handleAddSegment = () => {
    formik.setFieldValue("segments", [
      ...formik.values.segments,
      { eventId: eventId || "", name: "", topics: "", files: [] },
    ]);
  };

  const handleRemoveSegment = (index) => {
    const newSegments = [...formik.values.segments];
    newSegments.splice(index, 1);
    formik.setFieldValue("segments", newSegments);
  };

  if (!eventId) {
    return <div>No se encontró el evento. Verifica el ID en la URL.</div>;
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2>Contenido de la {eventoActual?.eventName}</h2>

        {formik.values.segments.map((segment, index) => (
          <div key={index}>
            <h3>{`Segmento ${index + 1}`}</h3>
            <div>
              <label htmlFor={`segments.${index}.name`}>
                Nombre del Segmento
              </label>
              <input
                id={`segments.${index}.name`}
                type="text"
                value={segment.name}
                onChange={(e) =>
                  formik.setFieldValue(`segments.${index}.name`, e.target.value)
                }
              />
              {formik.errors.segments?.[index]?.name && (
                <div className="error">
                  {formik.errors.segments[index].name}
                </div>
              )}
            </div>

            <div>
              <label htmlFor={`segments.${index}.topics`}>Temas</label>
              <input
                id={`segments.${index}.topics`}
                type="text"
                value={segment.topics}
                onChange={(e) =>
                  formik.setFieldValue(
                    `segments.${index}.topics`,
                    e.target.value
                  )
                }
              />
              {formik.errors.segments?.[index]?.topics && (
                <div className="error">
                  {formik.errors.segments[index].topics}
                </div>
              )}
            </div>

            <div>
              <label>Documentos/Archivos</label>
              <input
                type="file"
                multiple
                accept=".jpg, .png, .mp4, .pdf"
                onChange={(event) => {
                  const filesArray = Array.from(event.target.files);
                  formik.setFieldValue(`segments.${index}.files`, filesArray);
                }}
              />
              {segment.files.length > 0 ? (
                <ul>
                  {segment.files.map((file, fileIndex) => (
                    <li key={fileIndex}>{file.name}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay archivos seleccionados</p>
              )}
            </div>

            <button type="button" onClick={() => handleRemoveSegment(index)}>
              Eliminar segmento
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddSegment}>
          Añadir otro segmento
        </button>

        <button type="submit">Guardar</button>
      </form>

      <div>
        <h3>Segmentos creados</h3>
        {formik.values.segments.map((segment, idx) => (
          <div key={idx}>
            <h4>{segment.name}</h4>
            <p>Temas: {segment.topics}</p>
            <p>
              Archivos:{" "}
              {segment.files && segment.files.length > 0
                ? segment.files.map((file) => file.name).join(", ")
                : "No hay archivos"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContenidoForm;
