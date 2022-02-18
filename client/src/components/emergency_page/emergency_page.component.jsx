import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";

import "./emergency_page.styles.css";

function Emergency() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    receiverName: "",
    mobile: "",
    bloodGroup: "",
    hospital: "",
    units: 0,
    location: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newReceiver = {
      receiverName: input.receiverName,
      mobile: input.mobile,
      bloodGroup: input.bloodGroup,
      hospital: input.hospital,
      units: input.units,
      location: input.location,
    };
    const res = await axios.post("/api/emergency", newReceiver);
    alert(res.data.msg);
    navigate("/");
  };

  return (
    <div className="emergency_body">
      <Navbar expand="lg" className="nav">
        <Container>
          <Navbar.Brand href="/" className="navtxt">
            <img src={icon} className="icon"></img>
            Donate Blood
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/register" className="navtxt">
                Register Now
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
      <div className="emergency_form">
        <br></br>

        <h1 className="head">EMERGENCY</h1>
        <br></br>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="receiverName"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              required
              type="text"
              maxlength="10"
              pattern="\d{10}"
              title="Please enter exactly 10 digits"
              name="mobile"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <FormControl required fullWidth>
              <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Blood Group"
                onChange={handleChange}
                name="bloodGroup"
              >
                <MenuItem value="A+">A+ </MenuItem>
                <MenuItem value="B+">B+ </MenuItem>
                <MenuItem value="O+">O+ </MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="A-">A- </MenuItem>
                <MenuItem value="B-">B- </MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O-">O- </MenuItem>
              </Select>
            </FormControl>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Hospital Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="hospital"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Units Required</Form.Label>
            <Form.Control
              required
              type="number"
              name="units"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              type="text"
              name="location"
              onChange={handleChange}
            />
          </Form.Group>

          <div className="submit_button">
            <Button
              variant="contained"
              type="submit"
              size="large"
              className="btn-grad"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Emergency;
