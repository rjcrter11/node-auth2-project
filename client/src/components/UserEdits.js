import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialUser = {
  username: "",
  department: ""
};

const UserEdits = () => {
  const [userToEdit, setUserToEdit] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editUser, setEditUser] = useState(initialUser);

  const { id } = useParams();
  const history = useHistory();

  const fetchEditUser = () => {
    axiosWithAuth()
      .get(`users/${id}`)
      .then((res) => {
        console.log("success edit get: ", res);
        setUserToEdit(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEditUser();
  }, []);

  const deleteUser = () => {
    axiosWithAuth()
      .delete(`users/${id}`)
      .then((res) => {
        console.log("delete succesful", res);
        history.push("/users");
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`users/${id}`, editUser)
      .then((res) => {
        console.log("edit response", res);
        fetchEditUser();
        setEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="edits-container">
      <h3>Profile for {userToEdit.username} </h3>
      <div className="edit-user-box">
        <h4> {userToEdit.username} </h4>
        <h5> {userToEdit.department} </h5>
        <div className="btn-row">
          <button onClick={() => setEditing(true)}>Update</button>
          <button onClick={(user) => deleteUser(user)}>Remove</button>
        </div>
      </div>

      {editing ? (
        <div className="edit-panel">
          <form className="edit-form" onSubmit={handleEdit}>
            <label htmlFor="username">Username</label>
            <input
              id="name"
              type="text"
              value={editUser.username}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  username: e.target.value
                })
              }
            />
            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              value={editUser.department}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  department: e.target.value
                })
              }
            />
            <button type="submit">Update</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default UserEdits;
