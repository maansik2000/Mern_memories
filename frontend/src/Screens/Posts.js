import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPostBySearch } from "../actions/PostAction";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Messages from "../components/Messages";
import Pagination from "../components/Pagination/Pagination";
import { useHistory, useLocation } from "react-router-dom";

import SubNav from "../components/SubNav";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Posts(props) {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();

  const page = query.get("page") || 1;

  const { posts, loading, error } = useSelector((state) => state.post);

  const handleChangeSearch = (searchQueryPost) => {
    console.log(searchQueryPost);
    if (searchQueryPost.trim()) {
      dispatch(getPostBySearch(searchQueryPost));
      history.push(`/posts/search?searchQuery=${searchQueryPost || "none"}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Container fluid>
      {loading ? (
        <>
          <Loading />
        </>
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <>
          <SubNav searchPost={handleChangeSearch} />
          <div className="d-flex flex-wrap">
            {posts.map((item) => (
              <>
                <Card key={item._id} post={item} />
              </>
            ))}
          </div>
        </>
      )}
      <Pagination page={page} />
    </Container>
  );
}

export default Posts;
