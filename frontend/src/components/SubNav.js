import React from "react";
import styled from "styled-components";
import NewPostButton from "./NewPostButton";
import Search from "./Search";

function SubNav({searchPost}) {
  


  return (
    <SubNavBar>
      <Search searchPost={searchPost} />
      <NewPostButton />
    </SubNavBar>
  );
}

const SubNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0px 16px;
  margin-top: 20px;
  @media screen and (max-width: 700px) {
    margin: 0px 8px;
    margin-top: 20px;
  }
`;

export default SubNav;
