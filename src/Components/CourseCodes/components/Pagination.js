import React from "react";
import Pagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/styles";

const styles = makeStyles(theme => ({
  pagination: {
    display: "flex"
  }
}));

export default function Body(props) {
  const { limit, page, count, handlePageChange } = props;
  const classes = styles();

  if (count <= limit) return null;

  const labelDisplayedRows = ({ page }) => {
    const maxPage = Math.ceil(count / limit);
    return `${page + 1}/${maxPage}`;
  };
  return (
    <Pagination
      className={classes.pagination}
      component="div"
      page={page - 1}
      count={count}
      rowsPerPage={limit}
      rowsPerPageOptions={[]}
      labelDisplayedRows={labelDisplayedRows}
      onChangePage={(e, newPage) => handlePageChange(newPage + 1)}
    />
  );
}
