import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import moment from "moment";
import { deletePostDetails, UpdateLike } from "../actions/PostAction";

function Card({ post }) {
  const id = post._id;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <i className="fas fa-thumbs-up"></i>
          <p>{post.likes.length} Likes</p>
        </>
      ) : (
        <>
          <i className="fas fa-thumbs-up"></i>
          <p>{post.likes.length} Likes</p>
        </>
      );
    }

    return (
      <>
        <i className="fas fa-thumbs-up"></i>
        <p>Like</p>
      </>
    );
  };

  return (
    <CardArticle key={post._id}>
      <Link to={`/Post/${post._id}`}>
        <div className="card-header-artivle">
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Link to={`/createPost/${post._id}`}>
              <div className="editIcon">
                <i className="fas fa-ellipsis-h"></i>
              </div>
            </Link>
          )}

          <img src={post.selectedFile} alt="articleImage" />
        </div>
      </Link>
      <div className="card-body-article">
        <span className="tag tag-teal-article">
          {post.tags.map((tag) => `#${tag}   `)}
        </span>
        <Link to={`/Post/${post._id}`} className="title">
          <h4>{post.title}</h4>
        </Link>
        <p>{post.message}</p>
        <div className="userSec">
          <div className="user">
            <img
              src={"http://path2buypartner.com/images/avatar.png"}
              alt="user"
            />
            <div className="user-info">
              <h6>{post.name}</h6>
              <p>{moment(post.createdAt).fromNow()}</p>
            </div>
          </div>

          <div className="userIcon">
            {(user?.result?.googleId === post?.creator ||
              user?.result?._id === post?.creator) && (
              <div
                className="trashICon"
                onClick={() => dispatch(deletePostDetails(id))}
              >
                <i className="fas fa-trash "></i>
              </div>
            )}

            <div
              className="likeIcon"
              aria-disabled
              onClick={() => {
                if (!user) {
                  alert("Login to like the post");
                } else {
                  dispatch(UpdateLike(id, post));
                }
              }}
            >
              <Likes />
            </div>
          </div>
        </div>
      </div>
    </CardArticle>
  );
}

const CardArticle = styled.div`
  margin: 15px;
  width: 300px;
  overflow: hidden;
  background: white;
  border-radius: 12px;

  box-shadow: 0px 4px 8px rgba(168, 168, 168, 0.25);
  flex-grow: 1;
  transition: all 0.3s ease;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
  }

  .card-header-artivle {
    position: relative;

    .editIcon {
      position: absolute;
      right: 10px;
      top: 5px;
      color: white;
      padding: 10px;
      cursor: pointer;
      :hover {
        background: #c4c4c4;
      }
    }
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }

  .card-body-article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;

    min-height: 200px;
    h4 {
      margin-top: 10px;
    }

    .title {
      color: black;
      text-decoration-line: none;
      transition: all 0.3s ease;
      :hover {
        color: gray;
      }
    }

    p {
      font-size: 12px;
      margin-bottom: 24px;
    }
    .tag {
      border-radius: 50px;
      font-size: 12px;
      margin-bottom: 10px;
      color: gray;

      text-transform: uppercase;
      cursor: pointer;
    }

    .userSec {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .userIcon {
      font-size: 17px;
      display: flex;

      align-items: baseline;
      .trashICon {
        margin-right: 25px;
        cursor: pointer;

        :hover {
          color: #3283be;
        }
      }
      .likeIcon {
        cursor: pointer;
        display: flex;

        align-items: baseline;
        :hover {
          color: #3283be;
        }
        p {
          margin-left: 8px;
          font-size: 15px;
          color: gray;
        }
      }
    }

    .user {
      display: flex;
      margin-top: auto;
      img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }

      .user-info p {
        margin: 0;
        font-size: 10px;
        color: gray;
      }
      .user-info h6 {
        font-size: 13px;
      }
    }
  }
  @media screen and (max-width: 700px) {
    margin: 12px 6px;
  }
`;

export default Card;
