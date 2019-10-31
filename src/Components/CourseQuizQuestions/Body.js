import React, { Fragment } from "react";
import Pagination from "@material-ui/core/TablePagination";
import Skeleton from "./components/Skeleton";
import Questions from "./components/Questions";
import SearchBox from "./components/SearchBox";
import { makeStyles } from "@material-ui/styles";

const styles = makeStyles(theme => ({
  pagination: {
    display: "flex"
  }
}));

export default function Body(props) {
  const {
    course,
    quiz,
    loading,
    questions,
    limit,
    page,
    count,
    search,
    handleSearchChange,
    handlePageChange
  } = props;
  const classes = styles();

  const labelDisplayedRows = ({ page }) => {
    const maxPage = Math.ceil(count / limit);
    return `${page + 1}/${maxPage}`;
  };
  if (!course || !quiz || loading) return <Skeleton />;
  return (
    <Fragment>
      <SearchBox search={search} handleSearchChange={handleSearchChange} />
      <Questions questions={questions} search={search} />
      {count > limit ? (
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
      ) : null}
    </Fragment>
  );
}
