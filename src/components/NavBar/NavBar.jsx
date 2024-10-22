import { Link } from "react-router-dom";
import "./NavBar.css"; // Asegúrate de tener los estilos en este archivo

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/src/assets/TherappLogo.png" alt="Therapp Logo" />
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/#">Servicios</Link>
        </li>
        <li>
          <Link to="/#">Eventos</Link>
        </li>
        <li>
          <Link to="/#">Documentación</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
