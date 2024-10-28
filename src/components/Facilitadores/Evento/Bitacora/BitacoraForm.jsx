import { useState } from "react";
import GeneralForm from "./FormulariosBitacora/generalForm/GeneralForm";
import MedicalForm from "./FormulariosBitacora/medicalForm/MedicalForm";
import SubstancesForm from "./FormulariosBitacora/substanciasForm/SubstancesForm";
import IntentionForm from "./FormulariosBitacora/intentionform/IntentionForm";
import CalibrationForm from "./FormulariosBitacora/calibración/CalibrationForm";
import ElementsForm from "./FormulariosBitacora/lineaBase/ElementsForm";
import DailyElementForm from "./FormulariosBitacora/dailyElementsForm/DailyElementsForm";
import EstadosForm from "./FormulariosBitacora/lineabaseEstados/EstadosForm";
import DailyEstadosForm from "./FormulariosBitacora/dailyEstadosForm/DailyEstadosForm";

const BitacoraForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 9)); // Límite ajustado a 9
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSave = (data) => {
    console.log("Datos guardados:", data);
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return <GeneralForm onNext={handleNext} />;
      case 1:
        return <MedicalForm onNext={handleNext} />;
      case 2:
        return <SubstancesForm onNext={handleNext} />;
      case 3:
        return (
          <IntentionForm
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSave={handleSave}
          />
        );
      case 4:
        return (
          <CalibrationForm
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSave={handleSave}
          />
        );
      case 5:
        return (
          <ElementsForm
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSave={handleSave}
          />
        );
      case 6:
        return (
          <DailyElementForm
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSave={handleSave}
          />
        );
      case 7:
        return (
          <EstadosForm
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSave={handleSave}
          />
        );
      case 8:
        return (
          <DailyEstadosForm
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSave={handleSave}
          />
        );
      default:
        return <div>Proceso completado</div>;
    }
  };

  return (
    <div>
      <h1>Bitácora</h1>
      {renderForm()}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevious} disabled={currentStep === 0}>
          Anterior
        </button>
        <button onClick={handleNext} disabled={currentStep === 8}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default BitacoraForm;
