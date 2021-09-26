import React from "react";

function Loading() {
  return (
    <div className="loading">
      <lottie-player
        src="https://assets3.lottiefiles.com/packages/lf20_uwR49r.json"
        background="transparent"
        speed="1"
        style={{ width: "100px", height: "100px" }}
        loop
        autoplay
      ></lottie-player>
    </div>
  );
}

export default Loading;
