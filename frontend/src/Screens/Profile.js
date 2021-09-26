import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { GetMyPosts } from "../actions/PostAction";
import Card from "../components/Card";

function Profile(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { posts, loading, error } = useSelector((state) => state.GetMyPost);

  console.log(posts);
  useEffect(() => {
    dispatch(GetMyPosts(id));
  }, [dispatch]);

  return (
    <>
      <ProfileContainer>
        <div className="profileCon">
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

            <div>
              <h1>
                {user.result.username ? user.result.username : user.result.name}
              </h1>
              <p>{user.result.email}</p>
              <p>Total Posts : {posts.length}</p>
            </div>
          </div>
        </div>
      </ProfileContainer>
      <div className="MyPosts my-5">
        <h1 style={{ textAlign: "center" }}>My Posts</h1>
        <div className="d-flex flex-wrap">
          {posts.map((item) => (
            <>
              <Card key={item._id} post={item} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  .profileCon {
    background: white;
    width: 50%;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(168, 168, 168, 0.25);
  }
  .MyPosts {
    div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }
  .userIcon {
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      p {
        font-size: 13px;
      }
    }
    img {
      width: 210px;
      height: 210px;
      border-radius: 50%;
    }
  }
  @media screen and (max-width: 1000px) {
    .profileCon {
      width: 70%;
      display: block;
    }
  }
  @media screen and (max-width: 700px) {
    .profileCon {
      width: 90%;
      box-shadow: 0px 4px 8px rgba(168, 168, 168, 0.25);
    }
    .userIcon {
      width: 100%;
      div {
        p {
          font-size: 13px;
        }
      }
      img {
        margin-bottom: 30px;
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default Profile;
