import React, { useEffect, useState } from "react";
import memories from "../image/memories.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { useHistory, useLocation } from "react-router";

function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  console.log(user);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <NavBarSec>
      <div className="container-fluid sec px-4">
        <Heading>
          <Link to="/">
            Memories
            <img src={memories} alt="logo" width={40} />
          </Link>
        </Heading>
        <ul>
          <li>
            {user ? (
              <div className="logoutSec">
                <div className="avatar">
                  <h6>
                    {" "}
                    {user.result.username
                      ? user.result.username
                      : user.result.name}
                  </h6>
                  <div className="userIcon">
                    <img
                      src={
                        user.result.userImage
                          ? user.result.userImage
                          : user.result.imageUrl
                          ? user.result.imageUrl
                          : "http://path2buypartner.com/images/avatar.png"
                      }
                      alt="user"
                    />
                  </div>
                </div>
                <ul className="dropdown">
                  <li>
                    <Link to={`/Profile/${user.result._id}`}>Profile</Link>
                  </li>
                  {!user.result.googleId && (
                    <li>
                      <Link to={`/EditProfile/${user.result._id}`}>
                        Edit Profile
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link to="#" onClick={logout}>
                      <i className="fas fa-sign-out-alt"></i>{" "}
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <button className="GlobalButton">
                <Link to="/login">Login</Link>
              </button>
            )}
          </li>
        </ul>
      </div>
    </NavBarSec>
  );
}

const NavBarSec = styled.div`
  background: white;
  position: relative;
  .logoutSec {
    .userIcon {
      img {
        border-radius: 50px;
        margin-left: 15px;
        width: 45px !important;
        height: 45px !important;
        object-fit: cover;
      }
    }
    a {
      text-decoration: none;
      color: black;
      display: block;
    }
    ul.dropdown {
      position: absolute;
      z-index: 200;
      background: white;
      right: 20px;
      width: 250px;
      padding: 0;

      display: none;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }

    li {
      float: none;
      margin: 0;
      i {
        margin-right: 8px;
      }
    }

    ul li a {
      border-bottom: 1px solid #ccc;
      border-right: none;
      color: #000;
      padding: 15px 30px;
    }

    ul li:last-child a {
      border-bottom: none;
    }

    ul li a:hover {
      color: #000;
      background: #eeeeee;
    }

    :hover {
      ul.dropdown {
        display: block;
        background: #fff;
      }
    }

    .avatar {
      display: flex;
      align-items: baseline;
      cursor: pointer;
    }
  }

  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 0 16px !important;
  .sec {
    display: flex;
    padding-top: 22px;
    padding-bottom: 22px;
    justify-content: space-between;
    ul {
      list-style-type: none;
      margin: auto 0;
    }
    @media screen and (max-width: 700px) {
      padding: 14px 12px !important;
      .avatar {
        h6 {
          font-size: 14px;
        }
      }
      img {
        width: 30px;
      }
      ul {
        li button {
          padding: 10px 35px;
        }
      }
    }

    @media screen and (max-width: 600px) {
      ul {
        li button {
          padding: 10px 35px;
        }
      }
    }
  }
`;

const Heading = styled.h3`
  color: #3283be, 100%;
  font-size: 30px;
  a {
    text-decoration: none;
  }

  margin: auto 0;
  img {
    margin-left: 10px;
  }
  @media screen and (max-width: 700px) {
    font-size: 25px;
  }
  @media screen and (max-width: 600px) {
    font-size: 25px;
  }
`;

export default NavBar;
