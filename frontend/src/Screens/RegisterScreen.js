import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { signUp } from "../actions/authAction";
import Error from "../components/Error";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  userImage: "",
};

function RegisterScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formdata, setFormData] = useState(initialState);

  const { err } = useSelector((state) => state.authReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formdata);
    dispatch(signUp(formdata, history));
  };

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <Container1 className="d-flex justify-content-center align-items-center flex-column">
      <div className="formSec">
        <h1>Register</h1>

        <form className="formSection" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            required
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={formdata.username}
          />
          <input
            type="email"
            id="email"
            required
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formdata.email}
          />
          <input
            type="password"
            id="password"
            required
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formdata.password}
          />
          <input
            type="password"
            id="confirmPassword"
            required
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            value={formdata.confirmPassword}
          />

          {err ? <Error>{err}</Error> : null}

          <button type="submit" className="GlobalButton">
            Register
          </button>
        </form>
        <p>
          Already have an Account ?{" "}
          <span>
            <a href="/login">Login</a>
          </span>{" "}
        </p>
      </div>
    </Container1>
  );
}

const Container1 = styled.div`
  height: 80vh;
  width: 100%;

  .formSec {
    border-radius: 20px;
    h1 {
      text-align: center;
      margin-bottom: 18px;
    }
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    width: 400px;
    padding: 28px 25px;
    background: white;

    p {
      text-align: center;
      margin-top: 12px;
      margin-bottom: 0;
      font-size: 12px;
      a {
        text-decoration: none;
      }
      span {
        color: #3283be;
      }
    }

    .formSection {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      input {
        outline: none;
        :focus {
          outline: none;
        }
        width: 100%;

        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
          rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
        background: white;
        border: none;
        padding: 10px 18px;
        border-radius: 25px;
        margin: 8px 20px;
      }
      button {
        margin-top: 15px;
        width: 100%;
      }
    }

    @media screen and (max-width: 700px) {
      font-size: 14px;
      width: 330px;
    }
  }
`;

export default RegisterScreen;
