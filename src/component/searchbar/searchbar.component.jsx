import { useState } from "react";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from "axios";
import "./searchbar.css";

const BasicTextFields = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [arrow, setArrow] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const getUsers = async (e) => {
    e.preventDefault();
    let response = await axios.get(
      `https://api.github.com/search/users?q=${query}&per_page=5`
    );
    setUsers(response.data.items);
  };

  const handleArrowClick = () => {
    setArrow(!arrow)
  }

  const getRepos = async (username) => {
    let res = await axios.get(`https://api.github.com/users/${username}/repos`);
    let userCopy = [...users];
    let selectedUser = userCopy.find((user) => user.login === username);
    selectedUser.repos = res.data.map((repo) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
    }));
    setUsers(userCopy);
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
        <h3 className="header">{`Showing users for "${query}"`}</h3>
        <br />
        {users.map((user) => (
          <div key={user.id}>
            <div className="card-container">
                <h1 className="name">{user.login}</h1>
                 <ExpandMoreIcon   onClick={() => getRepos(user.login)} className="expand-more" />
            </div>
            <ul>
              {user.repos &&
                user.repos.map((repo) => (
                  <div className="repo-card" key={repo.name}>
                    <h4 className="reponame">{repo.name}</h4>
                    <p className="repodescription">{repo.description}</p>
                    {/* <div className="rating">
                  {Array.from({ length: repo.stars }).map((_, index) => (
                    <span key={index}>★</span>
                  ))}
                </div> */}
                  </div>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicTextFields;
