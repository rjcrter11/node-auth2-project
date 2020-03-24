import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axiosWithAuth()
      .get("users")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h1>Employee List</h1>
      {users &&
        users.map((user) => (
          <div className="user-box">
            <h4> {user.username} </h4>
            <h5> {user.department} </h5>
          </div>
        ))}
    </div>
  );
};
export default Dashboard;
