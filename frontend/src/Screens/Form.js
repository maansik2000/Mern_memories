import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createPost, updatePostDetails } from "../actions/PostAction";

function Form(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const user = JSON.parse(localStorage.getItem("profile"));


  const [PostData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    details: "",
  });

  useEffect(() => {
    if (id) {
      fetchData(id);
    } else {
      setPostData("");
    }
  }, [id]);

  const fetchData = async (id) => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPostData(data));
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(
        updatePostDetails(id, {
          ...PostData,
          name: user.result.name ? user.result.name : user.result.username,
        })
      );
    } else {
      dispatch(
        createPost({
          ...PostData,
          name: user.result.name ? user.result.name : user.result.username,
        })
      );
    }

    props.history.push("/");
  };

  if (!user) {
    props.history.push("/");
    alert("You need to login");
  }

  return (
    <Container1>
      <div>
        <h1>{id ? "Edit a Memory" : "Create a Memory"}</h1>
        <form onSubmit={handleChange}>
          <div className="form-group">
            {/* <input
              type="text"
              class="form-control"
              id="creator"
              required
              placeholder="Username"
              name="creator"
              value={PostData.creator}
              onChange={(e) =>
                setPostData({ ...PostData, creator: e.target.value })
              }
            /> */}
            <input
              type="text"
              className="form-control"
              id="title"
              required
              placeholder="Title"
              name="title"
              value={PostData.title}
              onChange={(e) =>
                setPostData({ ...PostData, title: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control"
              id="message"
              required
              placeholder="Message"
              name="message"
              value={PostData.message}
              onChange={(e) =>
                setPostData({ ...PostData, message: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control"
              id="tags"
              placeholder="Tags"
              name="tags"
              value={PostData.tags}
              onChange={(e) =>
                setPostData({ ...PostData, tags: e.target.value.split(",") })
              }
            />
            <textarea
              type="text"
              required
              className="form-control"
              id="details"
              placeholder="Description"
              name="details"
              rows={5}
              value={PostData.details}
              onChange={(e) =>
                setPostData({ ...PostData, details: e.target.value })
              }
            />
            <div>
              <FileBase
                className="imageSec"
                type="file"
                required
                name="selectedFile"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...PostData, selectedFile: base64 })
                }
              />
            </div>
          </div>

          <button type="submit" className="GlobalButton">
            Submit
          </button>
        </form>
      </div>
    </Container1>
  );
}

const Container1 = styled.div`
  display: flex;
  width: 100%;
  padding: 0;
  margin: 40px 0;
  justify-content: center;

  div {
    h1 {
      font-weight: bold;
      margin-bottom: 40px;
      text-align: center;
    }
    input {
      width: 100%;
      margin: 15px 0px;
      padding: 12px;
      border-radius: 7px;
    }
    button {
      width: 100%;
      margin: 4px 0;
      color: white;
    }
  }
`;

export default Form;
