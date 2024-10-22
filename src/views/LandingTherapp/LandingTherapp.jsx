import LoginForm from "../../components/LoginForm/LoginForm";
import "./LandingTherapp.css"; // Asegúrate de tener estilos específicos para este componente

const LandingTherapp = () => {
  return (
    <div className="landing-therapp">
      <header className="landing-header">
        <h1>Bienvenido a Therapp</h1>
      </header>
      <main className="landing-content">
        <section className="landing-features">
          <ul>
            <li>
              La plataforma busca optimizar el proceso de registro de eventos
              terapéuticos, gestión de participantes y documentación, todo ello
              en un formato seguro e intuitivo.
            </li>
          </ul>
        </section>
        <section className="landing-call-to-action">
          <LoginForm />
        </section>
      </main>
    </div>
  );
};

export default LandingTherapp;
