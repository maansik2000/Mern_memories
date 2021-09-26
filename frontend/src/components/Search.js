import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search({ searchPost }) {
  const handleChange = (e) => {
    searchPost(e.target.search.value);
    e.preventDefault();
  };

  return (
    <SearchInput>
      <span>
        <FontAwesomeIcon className="icon" color="#8B8B8B" icon={faSearch} />
      </span>
      <form onSubmit={handleChange}>
        <input name="search" type="text" placeholder="search" />
      </form>
    </SearchInput>
  );
}

const SearchInput = styled.div`
  width: 300px;
  height: 40px;

  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  .icon {
    font-size: 20px;
    margin-top: 10px;
    margin-left: 20px;
  }

  input {
    display: inline;
    width: 100%;
    border: none;
    height: 100%;
    padding-left: 10px;

    :focus {
      outline: none;
    }
  }

  @media screen and (max-width: 600px) {
    width: 180px;
  }
  @media screen and (max-width: 700px) {
    width: 200px;
  }
`;

export default Search;
