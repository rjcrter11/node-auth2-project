import React, { useState, useEffect, useReducer } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { useParams } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);

  const { id } = useParams();

  const fetchUser = () => {
    axiosWithAuth()
      .get(`users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };
  console.log("user department", user.department, user.username);

  const fetchUsers = () => {
    axiosWithAuth()
      .get("users")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };
  console.log(
    "users stuff",
    users.map((user) => user.department)
  );

  useEffect(() => {
    fetchUser();
    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h1> Welcome {user.username} . Here's the Employee List</h1>

      {users &&
        users.map((item) =>
          item.department === user.department ? (
            <div>
              <h4> {item.username} </h4>
              <h5> {item.department} </h5>
            </div>
          ) : (
            <div></div>
          )
        )}
    </div>
  );
};
export default Dashboard;
