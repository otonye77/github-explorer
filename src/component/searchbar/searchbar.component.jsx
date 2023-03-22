import { useState } from "react";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarRateIcon from "@mui/icons-material/StarRate";
import axios from "axios";
import "./searchbar.css";

const BasicTextFields = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);

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
  const getRepos = async (username, userId) => {
    let res = await axios.get(`https://api.github.com/users/${username}/repos`);
    let userCopy = [...users];
    let selectedUser = userCopy.find((user) => user.id === userId);
    if (res.data.length === 0) {
      selectedUser.repos = [{ name: "No repositories found" }];
    } else {
      selectedUser.repos = res.data.map((repo) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
      }));
    }
    setUsers(userCopy);
  };

  //   console.log(arrow);

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
              <div>
              {expandedUser === user.id ? (
                  <ExpandLessIcon
                    onClick={() => setExpandedUser(null)}
                    className="expand-less"
                  />
                ) : (
                  <ExpandMoreIcon
                    onClick={() => {
                      getRepos(user.login, user.id);
                      setExpandedUser(user.id);
                    }}
                    className="expand-more"
                  />
                )}
              </div>
            </div>
            <ul>
              {user.repos &&
                expandedUser === user.id &&
                user.repos.map((repo, i) => (
                  <div className="repo-card" key={repo.name}>
                    <div>
                      <h4 className="reponame">{repo.name}</h4>
                      <p className="repodescription">{repo.description}</p>
                    </div>
                    <div className="len">
                      <p className="ratings">{repo.stars}</p>
                      <StarRateIcon className="star" />
                    </div>
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

// {
//   /* <div className="rating">
//                   {Array.from({ length: repo.stars }).map((_, index) => (
//                     <span key={index}>★</span>
//                   ))}
//  </div> */
// }
