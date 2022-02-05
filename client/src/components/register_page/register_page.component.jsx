import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
} from "@mui/material";
import "./register_page.styles.css";

function Register() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    mobile: "",
    address: "",
    college: "",
    designation: "",
    chronicDisease: "",
    bloodGroup: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  const [dob, setDob] = useState(new Date());

  const handleDOB = (event) => {
    // moment(event.target.value).format("DD/MM/YY")
    const dateOfBirth = new Date(event.target.value);

    //calculate month difference from current date in time
    var month_diff = Date.now() - dateOfBirth.getTime();

    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    var age = Math.abs(year - 1970);

    if (age > 18) {
      setDob(event.target.value);
    } else {
      setDob(null);
    }
  };

  const [ldo, setLdo] = useState(new Date());

  const handleLDO = (event) => {
    const lastDonatedOn = new Date(event.target.value);

    // To calculate the time difference of two dates
    const Difference_In_Time = new Date().getTime() - lastDonatedOn.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Math.trunc(
      Difference_In_Time / (1000 * 3600 * 24)
    );

    if (Difference_In_Days >= 90) {
      setLdo(event.target.value);
    } else {
      setLdo(null);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (dob === null) {
      alert("You can't register as your age is less than 18!!");
    } else if (ldo === null) {
      alert(
        "You can't register as you have donated your blood between 3 months from today"
      );
    } else {
      const newDonor = {
        email: input.email,
        username: input.username,
        mobile: input.mobile,
        address: input.address,
        college: input.college,
        designation: input.designation,
        chronicDisease: input.chronicDisease,
        bloodGroup: input.bloodGroup,
        dob,
        ldo,
      };
      const res = await axios.post("/api/register", newDonor);
      alert(res.data.msg);
    }
  }

  return (
    <div className="registerbody">
      <div className="register_form">
        <Form onSubmit={handleSubmit} className="mt-4">
          <h1 className="head">REGISTER</h1>
          <br></br>
          <br></br>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="number" name="mobile" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">College</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="College"
                onChange={handleChange}
                name="college"
              >
                <MenuItem value="Baba Farid College of Engineering and Technology">
                  Baba Farid College of Engineering and Technology
                </MenuItem>
                <MenuItem value="Baba Farid College of Management and Technology">
                  Baba Farid College of Management and Technology
                </MenuItem>
                <MenuItem value="Baba Farid College of Education">
                  Baba Farid College of Enterpreneurship
                </MenuItem>
                <MenuItem value="Baba Farid College">
                  Baba Farid College
                </MenuItem>
              </Select>
            </FormControl>
          </Form.Group>

          <Form.Group className="mb-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Designation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Designation"
                onChange={handleChange}
                name="designation"
              >
                <MenuItem value="Teacher">Teacher</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
              </Select>
            </FormControl>
          </Form.Group>

          <Form.Group className="mb-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Chronic Disease
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Chronic Disease"
                onChange={handleChange}
                name="chronicDisease"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Unaware">Unaware</MenuItem>
              </Select>
            </FormControl>
          </Form.Group>

          <Form.Group className="mb-4">
            <FormControl fullWidth>
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
            <TextField
              label="Date of birth"
              type="date"
              name="dob"
              defaultValue=""
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleDOB}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <TextField
              label="Last donated on"
              type="date"
              name="ldo"
              defaultValue=""
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleLDO}
            />
          </Form.Group>

          <div className="submit_button">
            <Button
              variant="contained"
              className="mt-4 btn-grad"
              type="submit"
              size="large"
              fullWidth
            >
              Submit
            </Button>
          </div>
        </Form>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default Register;
