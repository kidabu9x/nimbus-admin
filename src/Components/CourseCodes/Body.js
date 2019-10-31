import React, { Component, Fragment } from "react";
import Skeleton from "./components/Skeleton";
import Codes from "./components/Codes";
import SearchBox from "./components/SearchBox";
import Pagination from "./components/Pagination";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  body: {
    marginBottom: theme.spacing(15)
  }
});

class Body extends Component {
  render() {
    const {
      classes,

      loading,
      deleting,
      updating,
      codes,
      onCopyCode,
      onDelete,
      onUpdate,
      searchTerm,
      onSearch,

      page,
      limit,
      count,
      onPageChange
    } = this.props;
    return (
      <div className={classes.body}>
        <SearchBox search={searchTerm} handleSearchChange={onSearch} />
        {loading ? (
          <Skeleton />
        ) : (
          <Fragment>
            <Codes
              codes={codes}
              deleting={deleting}
              updating={updating}
              onDelete={onDelete}
              onCopyCode={onCopyCode}
              onUpdate={onUpdate}
              searchTerm={searchTerm}
            />
            <Pagination
              page={page}
              limit={limit}
              count={count}
              handlePageChange={onPageChange}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Body);
