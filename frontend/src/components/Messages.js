import React from "react";
import styled from "styled-components";

function Messages({ children }) {
  return (
    <Container>
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      <lottie-player
        src="https://assets6.lottiefiles.com/packages/lf20_pNx6yH.json"
        background="transparent"
        speed="1"
        style={{ width: "400px", height: "400px" }}
        loop
 
        autoplay
      ></lottie-player>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

export default Messages;
