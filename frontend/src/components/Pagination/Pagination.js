import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./Styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../actions/PostAction";

function PaginationSec({ page }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { totalPages } = useSelector((state) => state.post);
  console.log(totalPages);

  useEffect(() => {
    if (page) {
      dispatch(getPost(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={totalPages}
      variant="outlined"
      color="primary"
      page={Number(page) || 1}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
}

export default PaginationSec;
