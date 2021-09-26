import React, { useState } from "react";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin } from "../actions/authAction";
import Error from "../components/Error";

const initialState = {
  email: "",
  password: "",
};

function LoginScreen() {
  const [formdata, setFormData] = useState(initialState);

  const history = useHistory();
  const dispatch = useDispatch();

  const { err } = useSelector((state) => state.authReducer);

  const googleSccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formdata, history));
  };

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <Container1 className="d-flex justify-content-center align-items-center flex-column">
      <div className="formSec">
        <h1>Login</h1>

        <form onSubmit={handleSubmit} className="formSection">
          <input
            type="email"
            id="email"
            required
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formdata.username}
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
          {err ? <Error>{err}</Error> : null}

          <button className="GlobalButton">Login</button>
        </form>
        <p>
          Don't have an Account ?{" "}
          <span>
            <a href="/register">Register</a>
          </span>{" "}
        </p>
        <p>
          <div className="line1"></div>
          <span>or</span>
          <div className="line1"></div>
        </p>

        <GoogleLogin
          clientId="918884309016-88rarbd734jq5buuro8eudehc0b94pfo.apps.googleusercontent.com"
          render={(renderProp) => (
            <button
              className="GlobalButton googleButton"
              onClick={renderProp.onClick}
              disable={renderProp.disabled}
            >
              Continue with Google+
            </button>
          )}
          onSuccess={googleSccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
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
      font-size: 12px;
      margin-top: 12px;
      a {
        text-decoration: none;
      }
      span {
        color: #3283be;
      }
    }
    .googleButton {
      width: 100%;
      background: #ff6464;
    }
    .line1 {
      background: gray;
      height: 1px;
      width: 38%;
      margin: auto;
      margin: 0 10px;
      display: inline-block;
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

export default LoginScreen;
