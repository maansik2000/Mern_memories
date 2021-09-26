import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function NewPostButton() {
  return (
    <div>
      <Link to="/createPost">
        <CreateButton className="GlobalButton">Create Post</CreateButton>
      </Link>
    </div>
  );
}

const CreateButton = styled.button`
  border-radius: 12px;
  a {
    font-size: 14px;
  }
  color: white;
  padding: 8px 14px;
`;

export default NewPostButton;
