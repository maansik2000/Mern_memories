import React from "react";
import styled from "styled-components";

function Error({ children }) {
  return <ErrorMessage>{children}</ErrorMessage>;
}

const ErrorMessage = styled.div`
  color: #a02020;
  background-color: #ffe0e0e0;
  width: 90%;
  margin-top: 8px;
  padding: 5px;
  text-align: center;
`;

export default Error;
