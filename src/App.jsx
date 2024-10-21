import TherappLogo from "./assets/TherappLogo.png";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="http://localhost:5173/" target="_blank">
          <img src={TherappLogo} className="logo" alt="Therapp Logo" />
        </a>
      </div>
      <h1>Gestión de Eventos Terapeuticos</h1>
      <div className="card">
        <p>
          La plataforma busca optimizar el proceso de registro de eventos
          terapéuticos, gestión de participantes y documentación, todo ello en
          un formato seguro e intuitivo.
        </p>
      </div>
    </>
  );
}

export default App;
