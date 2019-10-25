import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const styles = makeStyles(theme => ({
  root: {
    maxWidth: 400
  },
  submitButton: {
    display: "block",
    margin: "0 auto",
    marginTop: theme.spacing(2)
  },
  inputThumbnail: {
    display: "none"
  }
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix="₫"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default function Form(props) {
  const {
    course,
    creating,
    uploadingImg,
    updateCourseValue,
    createCourse,
    updateCourseThumbnail
  } = props;
  const classes = styles();

  const handleSubmit = e => {
    e.preventDefault();
    createCourse();
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        id="title"
        label="Tên khóa học"
        value={course.title}
        margin="normal"
        variant="outlined"
        fullWidth
        onChange={updateCourseValue("title")}
      />

      <TextField
        required
        id="price"
        label="Giá giảm tối đa"
        value={course.price}
        onChange={updateCourseValue("price")}
        margin="normal"
        variant="outlined"
        fullWidth
        InputProps={{
          inputComponent: NumberFormatCustom
        }}
      />

      <TextField
        required
        id="compare_at_price"
        label="Giá gốc"
        value={course.compare_at_price}
        onChange={updateCourseValue("compare_at_price")}
        margin="normal"
        variant="outlined"
        fullWidth
        InputProps={{
          inputComponent: NumberFormatCustom
        }}
      />

      <input
        accept="image/*"
        className={classes.inputThumbnail}
        id="icon-button-file"
        type="file"
        onChange={event => updateCourseThumbnail(event.target.files[0])}
      />
      <label htmlFor="icon-button-file">
        <Button
          color="secondary"
          aria-label="upload picture"
          component="span"
          disabled={uploadingImg}
          endIcon={<PhotoCamera />}
        >
          Ảnh
        </Button>
      </label>
      {uploadingImg ? <LinearProgress color="secondary" /> : null}
      <img src={course.thumbnail} alt={course.title} />

      {!creating ?
        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          size="large"
        >
          Tạo khóa học
        </Button>
        :
        <CircularProgress className={classes.submitButton} color="primary" />
      }
    </form>
  );
}
