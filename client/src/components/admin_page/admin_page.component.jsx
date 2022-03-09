import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import moment from "moment";
import { Navbar, Nav, Container } from "react-bootstrap";
import icon from "../../assets/icon.png";

import "./admin_page.styles.css";

function Admin() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleSelect = (e) => {
    setBloodGroup(e.target.value);
  };

  const handleCity = (e) => {
    setCitySearch(e.target.value);
  };

  useEffect(async () => {
    const result = await axios.get("/api/city");
    let donorWithCities = [];
    let cities = [];
    donorWithCities = result.data.donors.filter((donor) => donor.city);
    donorWithCities.map((donor) => {
      if (!cities.includes(donor.city)) {
        cities.push(donor.city);
      }
    });
    cities.sort();
    let a = moment(result.data.donors[3].ldo);
    let b = moment(new Date());
    setCities(cities);
  }, []);

  useEffect(async () => {
    const res = await axios.get("/api/notification");
    if (res.data.notifications === null) {
      return alert(res.data.msg);
    }
    setNotifications(res.data.notification);
  }, [count]);

  const findDonors = async () => {
    let res;
    if (bloodGroup != "" && citySearch != "") {
      res = await axios.post("/api/admin", { bloodGroup, citySearch });
    } else if (bloodGroup != "") {
      res = await axios.post("/api/admin", { bloodGroup });
    } else if (citySearch != "") {
      res = await axios.post("/api/admin", { citySearch });
    } else {
      alert("Please select any one of the search methods!!");
    }

    if (res != null) {
      if (res.data.donors === null) {
        alert(res.data.msg);
      } else {
        setData(res.data.donors.sort((a, b) => (a.ldo > b.ldo ? 1 : -1)));
      }
    }
  };

  const handleCheck = async (event) => {
    const idNo = event.target.value;
    const isClear = window.confirm("Do you really want to clear the record?");
    if (isClear) {
      const res = await axios.post("/api/delete", { idNo });
      setCount(0);
      setCount(res.data.count);
    } else {
      setChecked(!event.target.checked);
    }
  };

  return (
    <div className="admin_page">
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
      <div className="blood_search">
        <FormControl className="blood_dropdown">
          <InputLabel id="demo-simple-select-label">
            Choose blood group
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Blood Group"
            onChange={handleSelect}
            name="bloodGroup"
          >
            <MenuItem value=""></MenuItem>
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
        <FormControl className="city_dropdown">
          <InputLabel id="demo-simple-select-label">Choose city</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="City"
            onChange={handleCity}
            name="citi"
          >
            <MenuItem value=""></MenuItem>
            {cities.map((city) => {
              return <MenuItem value={city}>{city}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <div className="search_button " onClick={findDonors}>
          <button type="button" className="btn-grad">
            Search
          </button>
        </div>
      </div>
      <div className="admin_tables">
        <Table className="notification_table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Receiver Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Blood Group</TableCell>
              <TableCell>Hospital</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Check</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications != null ? (
              notifications.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.receiverName} </TableCell>
                  <TableCell>{item.mobile} </TableCell>
                  <TableCell>{item.bloodGroup} </TableCell>
                  <TableCell>{item.hospital}</TableCell>
                  <TableCell>{item.units} </TableCell>
                  <TableCell>{item.location} </TableCell>
                  <TableCell>
                    <Checkbox
                      onChange={handleCheck}
                      checked={checked}
                      value={item._id}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <h2>No new notifications</h2>
            )}
          </TableBody>
        </Table>

        <Table className="donor_table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>College</TableCell>
              <TableCell>Any Disease</TableCell>
              <TableCell>Blood Group</TableCell>
              <TableCell>LDO</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Mobile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item._id}
                className={
                  moment(new Date()).diff(item.ldo, "days") <= 90
                    ? "red"
                    : "white"
                }
              >
                <TableCell>{item.username} </TableCell>
                <TableCell>{item.email} </TableCell>
                <TableCell>{item.designation} </TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.college}</TableCell>
                <TableCell>{item.chronicDisease}</TableCell>
                <TableCell>{item.bloodGroup} </TableCell>
                <TableCell>{moment(item.ldo).format("DD/MM/YY")}</TableCell>
                <TableCell>{moment(item.dob).format("DD/MM/YY")}</TableCell>
                <TableCell>{item.mobile}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Admin;
