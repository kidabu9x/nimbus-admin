import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    marginBottom: theme.spacing(2)
  },
  form: {
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();
  const { search, handleSearchChange } = props;
  const [temp, setTemp] = useState(search);

  const onSearch = () => {
    handleSearchChange(temp);
  };

  const onSubmit = e => {
    e.preventDefault();
    onSearch();
  };

  useEffect(() => {
    setTemp(search);
  }, [search]);

  return (
    <Paper className={classes.root}>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <InputBase
          value={temp}
          className={classes.input}
          placeholder="Tìm kiếm bằng tên lớp"
          inputProps={{ "aria-label": "Tìm câu hỏi" }}
          onChange={e => setTemp(e.target.value)}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          type="submit"
          onClick={onSearch}
        >
          <SearchIcon />
        </IconButton>
      </form>
    </Paper>
  );
}
