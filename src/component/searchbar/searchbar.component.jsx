import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "./searchbar.css";

const BasicTextFields = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  console.log(query);
  const getUsers = async (e) => {
    e.preventDefault();
    let response = await axios.get(`https://api.github.com`)
    console.log(response);
  }
  
  return (
    <div className="container">
      <form className="form-container">
        <TextField
          onChange={handleChange}
          id="outlined-basic"
          className="outlined"
          label="Enter Username"
          variant="outlined"
        />
        <button onClick={getUsers}>Search</button>
      </form>
    </div>
  );
};

export default BasicTextFields;



