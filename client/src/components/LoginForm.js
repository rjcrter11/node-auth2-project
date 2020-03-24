import React from "react";
import { withFormik, Field, Form } from "formik";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const LoginForm = ({ touched, errors }) => {
  return (
    <div className="login-container">
      <h3>Sign In</h3>
      <Form>
        <Field name="username" type="text" placeholder="username" />
        {touched.username && errors.username && (
          <p className="errors"> {errors.username} </p>
        )}
        <Field name="password" type="password" placeholder="password" />
        {touched.password && errors.password && (
          <p className="errors"> {errors.password} </p>
        )}
        {/* <Field name="department" type="text" placeholder="department" />
        {touched.department && errors.department && (
          <p className="errors"> {errors.department} </p>
        )} */}
        <button type="submit">Sign In</button>
      </Form>
    </div>
  );
};

const FormikForm = withRouter(
  withFormik({
    mapPropsToValues({ username, password }) {
      return {
        username: username || "",
        password: password || ""
        // department: department || ""
      };
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("A username is required"),
      password: Yup.string().required("A password is required")
      // department: Yup.string().required("Your department is required")
    }),
    handleSubmit(values, { props }) {
      axiosWithAuth()
        .post("auth/login", values)
        .then((res) => {
          console.log("Login success", res);
          window.localStorage.setItem("token", res.data.token);
          props.history.push("/users");
        })
        .catch((err) => console.log(err));
    }
  })(LoginForm)
);

export default FormikForm;
