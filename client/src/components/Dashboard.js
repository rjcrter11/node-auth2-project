import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { useParams, useHistory } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);

  const { id } = useParams();
  const history = useHistory();

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

  useEffect(() => {
    fetchUser();
    fetchUsers();
  }, []);

  const routeToUserEdit = (e, user) => {
    e.preventDefault();
    history.push(`/users/${user.id}/edits`);
  };

  return (
    <div className="users-container">
      {user.department === "management" ? (
        <h1 className="portal">Management Portal</h1>
      ) : (
        <h1 className="portal">Employee Portal</h1>
      )}
      <h2 className="welcome"> Welcome {user.username}. Here's your team</h2>
      <div className="display-container">
        <div className="employee-box">
          {users.map((item) =>
            item.department === user.department ? (
              <div className="user-box">
                <h4> {item.username} </h4>
                <h5> {item.department} </h5>
              </div>
            ) : (
              <div></div>
            )
          )}
        </div>

        <div className="manager-box">
          {user.department === "management" ? (
            users.map(
              (item) =>
                item.department !== "management" && (
                  <div className="wig-box" key={item.id}>
                    <h4> {item.username} </h4>
                    <p>{item.department} </p>
                    <div className="management-btns">
                      <button onClick={(e) => routeToUserEdit(e, item)}>
                        Edit
                      </button>
                    </div>
                  </div>
                )
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
