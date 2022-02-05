import React from "react";
import "./home.styles.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import bloody from "../../assets/bloody2.png";
import icon from "../../assets/icon.png";

function Home() {
  return (
    <div>
      <Navbar expand="lg" className="nav">
        <Container>
          <Navbar.Brand href="#home" className="navtxt">
            <img src={icon} className="icon"></img>
            Donate Blood
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/register" className="navtxt">
                Register yourself
              </Nav.Link>
              <Nav.Link href=""></Nav.Link>
              <Nav.Link href=""></Nav.Link>
              <Nav.Link href="/emergency" className="navtxt">
                Emergency
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="image">
        <img src={bloody} className="bloodyimg"></img>
      </div>

      <footer>
        <p>
          Website made for blood donation.
          <br></br>
          <a href="">abc@example.com</a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
