import "./Footer.css"; // Asegúrate de tener los estilos en este archivo

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="/src/assets/TherappLogo.png" alt="Therapp Logo" />
        <div className="footer-copyright">
          <p>&copy; 2024 Therapp. Todos los derechos reservados.</p>
        </div>
      </div>

      <div className="footer-links">
        <ul>
          <li>
            <a href="/#">Política de privacidad</a>
          </li>
          <li>
            <a href="/#">Términos y condiciones</a>
          </li>
          <li>
            <a href="/#">Ayuda</a>
          </li>
        </ul>
      </div>
      <div className="footer-socials">
        <a href="#" target="_blank" rel="noreferrer">
          Facebook
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          Twitter
        </a>
        <a href="3" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
      <div className="footer-contact">
        <p>Contacto: info@therapp.com</p>
      </div>
    </footer>
  );
};

export default Footer;
