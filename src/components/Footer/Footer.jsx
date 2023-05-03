import "./Footer.scss"
import { Container, Navbar } from "reactstrap";

function Footer() {
  return (
    <Navbar color="dark" dark className="footer-wrapper">
      <Container className="footer-nav-wrapper">
        <h5>Developed by Gokulpriyan</h5>
      </Container>
    </Navbar>
  );
}

export default Footer;
