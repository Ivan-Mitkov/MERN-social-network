import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const Register = () => {
  //using useDispatch instead connect from redux
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const formHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // console.log("state", formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Not match", password, password2);
      dispatch(setAlert("Passwort don'match", "danger", 2000));
    } else {
      dispatch(register({ name, email, password }));
    }
  };
  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            onChange={formHandler}
            value={name}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={formHandler}
            value={email}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={formHandler}
            value={password}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            onChange={formHandler}
            value={password2}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

export default Register;
