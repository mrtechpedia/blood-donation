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

import "./admin_page.styles.css";

function Admin() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  // const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleSelect = (e) => {
    setBloodGroup(e.target.value);
  };

  // useEffect(async () => {
  //   const res = await axios.get("/api/city");
  //   setCities(res.data.city);
  // }, []);

  useEffect(async () => {
    const res = await axios.get("/api/notification");
    if (res.data.notifications === null) {
      return alert(res.data.msg);
    }
    setNotifications(res.data.notification);
  }, [count]);

  const findDonors = async () => {
    const res = await axios.post("/api/admin", { bloodGroup });
    if (res.data.donors === null) {
      alert(res.data.msg);
    } else {
      setData(res.data.donors);
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
      <br></br>
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
              <TableCell>College</TableCell>
              <TableCell>Chronic Disease</TableCell>
              <TableCell>Blood Group</TableCell>
              <TableCell>LDO</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Mobile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.username} </TableCell>
                <TableCell>{item.email} </TableCell>
                <TableCell>{item.designation} </TableCell>
                <TableCell>{item.address}</TableCell>
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
