import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "./searchbar.css";

const BasicTextFields = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  console.log(query);
  const getUsers = async (e) => {
    e.preventDefault();
    let response = await axios.get(
      `https://api.github.com/search/users?q=${query}&per_page=5`
    );
    setUsers(response.data.items);
    console.log(response);
  };
  console.log(users);

  const getRepos = async (username) => {
    let res = await axios.get(`https://api.github.com/users/${username}/repos`)
    console.log(res);
  };

  return (
    <div className="overall">
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
      <div className="list">
        {users.map((user) => (
          <h1 onClick={() => getRepos(user.login)} className="name" key={user.id}>
            {user.login}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default BasicTextFields;
