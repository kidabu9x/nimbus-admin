import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1, 2, 3, 2)
  },
  submitButton: {
    margin: "auto",
    marginTop: theme.spacing(2),
    display: "block"
  },
  formControl: {
    marginTop: theme.spacing(2)
  }
}));

export default function Form(props) {
  const { members, courses, creating, userId, onCreate } = props;
  const classes = styles();

  const [courseCode, setCourseCode] = useState({
    title: "",
    course_id: "",
    teacher_id: ""
  });

  useEffect(() => {
    setCourseCode({
      title: "IC3 1.1",
      teacher_id: userId,
      course_id: courses.length ? courses[0]._id : ""
    });
  }, [userId, courses]);

  const updateCourseCode = data => {
    setCourseCode({
      ...courseCode,
      ...data
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onCreate(courseCode);
  };

  return (
    <Fragment>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Paper className={classes.paper}>
          <TextField
            required
            id="title"
            label="Tên lớp"
            value={courseCode.title}
            margin="normal"
            variant="outlined"
            name="title"
            fullWidth
            onChange={e =>
              updateCourseCode({ [e.target.name]: e.target.value })
            }
          />

          <FormControl
            variant="outlined"
            className={classes.formControl}
            fullWidth
          >
            <InputLabel htmlFor="course_id" required>
              Khóa học
            </InputLabel>
            <Select
              required
              native
              value={courseCode.course_id}
              onChange={e =>
                updateCourseCode({ [e.target.name]: e.target.value })
              }
              labelWidth={80}
              inputProps={{
                name: "course_id",
                id: "outlined-age-course_id-simple"
              }}
            >
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl
            variant="outlined"
            className={classes.formControl}
            fullWidth
          >
            <InputLabel htmlFor="teacher_id" required>
              Giảng viên
            </InputLabel>
            <Select
              required
              native
              value={courseCode.teacher_id}
              onChange={e =>
                updateCourseCode({ [e.target.name]: e.target.value })
              }
              labelWidth={90}
              inputProps={{
                name: "teacher_id",
                id: "outlined-age-teacher_id-simple"
              }}
            >
              {members.map(member => (
                <option key={member._id} value={member.user_id._id}>
                  {member.user_id.first_name} {member.user_id.last_name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Paper>

        {!creating ? (
          <Button
            className={classes.submitButton}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            size="large"
          >
            Tạo mã
          </Button>
        ) : (
          <CircularProgress className={classes.submitButton} color="primary" />
        )}
      </form>
    </Fragment>
  );
}
