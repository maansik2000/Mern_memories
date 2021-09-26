import React, { useEffect } from "react";
import { getPostDetails } from "../actions/PostAction";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading from "../components/Loading";
import moment from "moment";

function PostDetails(props) {
  const dispatch = useDispatch();

  const BlogId = props.match.params.id;

  const { postDetails, loading } = useSelector((state) => state.postDetails);
  console.log(postDetails);

  useEffect(() => {
    dispatch(getPostDetails(BlogId));
  }, [dispatch, BlogId]);

  return (
    <BlogDetailsSec>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="title">
            <div></div>
            <h1>{postDetails.title}</h1>
            <p>{postDetails.message}</p>
          </div>
          <div className="blogAlbum">
            <img src={postDetails.selectedFile} alt="blogImage" />
          </div>

          <div className="details">
            <p>{postDetails.details}</p>
          </div>
          <div className="userIcon">
            <img
              src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo"
              alt="user"
            />
            <div>
              <h4>Created by : {postDetails.name}</h4>
              <p> {moment(postDetails.createdAt).fromNow()}</p>
            </div>
          </div>
        </>
      )}
    </BlogDetailsSec>
  );
}

const BlogDetailsSec = styled.div`
  padding: 0 80px;
  .blogAlbum img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  .details {
    p {
      padding: 30px 0;
      ::first-letter {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 3rem;
        line-height: 0;
      }
    }
  }

  .userIcon {
    margin-top: 50px;
    display: flex;

    justify-content: flex-start;
    align-items: center;
    img {
      margin-bottom: 20px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    div {
      margin-left: 20px;
      h4 {
        font-size: 18px;
      }
      p {
        font-size: 14px;
        color: gray;
      }
    }
  }

  .title {
    padding: 40px;
    text-align: center;
    h1 {
      font-size: 3rem;
      font-weight: bold;
    }
    p {
      color: gray;
      font-size: 0.9rem;
    }
    div {
      margin: 0 auto;
      margin-bottom: 10px;
      background: #3283be;
      width: 60px;
      height: 3px;
    }
  }

  @media screen and (max-width: 700px) {
    padding: 0 10px;
    .blogAlbum img {
      height: 250px;
    }
    .title {
      padding: 30px;
      h1 {
        font-size: 2rem;
      }
    }
  }
`;

export default PostDetails;
