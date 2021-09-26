import React, { useState } from "react";
import styled from "styled-components";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { updateProfile } from "../actions/authAction";
import { updatePostDetails } from "../actions/PostAction";

function EditProfile(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [PostData, setPostData] = useState({
    username: user.result.username ? user.result.username : user.result.name,
    email: user.result.email ? user.result.email : user.result.email,
    userImage: user.result.userImage
      ? user.result.userImage
      : user.result.imageUrl,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(id, PostData));

    props.history.push("/");
  };

  return (
    <EditContainer>
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
        <h5>
          {user.result.username} /{" "}
          <span style={{ fontWeight: "bold" }}>Account Settings</span>{" "}
        </h5>
      </div>

      <div>
        <form className="EditForm" onSubmit={submitHandler}>
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            id="username"
            required
            name="username"
            value={PostData.username}
            onChange={(e) =>
              setPostData({ ...PostData, username: e.target.value })
            }
          />
          <label htmlFor="Username">Email</label>
          <input
            type="email"
            id="email"
            required
            name="email"
            value={PostData.email}
            onChange={(e) =>
              setPostData({ ...PostData, email: e.target.value })
            }
          />
          <label htmlFor="Username">Profile Image</label>

          <FileBase
            className="imageSec"
            type="file"
            required
            name="userImage"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...PostData, userImage: base64 })
            }
          />
          <button type="submit" className="GlobalButton">
            Submit
          </button>
        </form>
      </div>
    </EditContainer>
  );
}

const EditContainer = styled.div`
  margin: 20px 40px;

  .userIcon img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 30px;
    display: inline-block;
  }
  .EditForm {
    margin: 18px 0;
    label {
      font-weight: bold;
      display: block;
      margin: 8px 0px;
    }
  }
  .EditForm input {
    border: none;
    width: 60%;
    margin-bottom: 10px;
    padding: 8px 15px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    outline: none;
  }
  .userIcon h5 {
    display: inline-block;
  }
  button {
    width: 15%;
    display: block;
    margin: 20px 0;
  }
  @media screen and (max-width: 700px) {
    margin: 20px 28px;
    button {
      width: 100%;
    }
    h5 {
      font-size: 16px;
    }
    .EditForm input {
      width: 100%;
    }
  }
`;

export default EditProfile;
