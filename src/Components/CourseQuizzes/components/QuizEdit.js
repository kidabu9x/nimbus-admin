import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import CloseIcon from "@material-ui/icons/Close";
import LinearProgress from "@material-ui/core/LinearProgress";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(4)
  },
  header: {
    padding: theme.spacing(2, 2, 0, 2)
  },
  headerActionIcon: {
    fontSize: "1rem"
  },
  content: {
    padding: `${theme.spacing(1, 2, 0, 2)} !important`
  },
  loadingContent: {
    padding: 0
  },
  actions: {
    padding: theme.spacing(2)
  },
  buttonText: {
    textTransform: "none",
    marginLeft: "auto",
    opacity: 0.5
  },
  buttonPrimary: {
    boxShadow: "none"
  },
  formGroup: {
    marginTop: theme.spacing(2)
  },
  formLabel: {
    alignItems: "start"
  }
});

class QuizEdit extends Component {
  state = {
    quiz: {
      title: "",
      enable_shuffle_questions: false,
      time_limit: 0,
      ask_questions_again_when_returning: false
    },
    showAdvance: false
  };
  onChange = e => {
    this.setState({
      quiz: {
        ...this.state.quiz,
        [e.target.name]: e.target.value
      }
    });
  };
  toggleAdvance = () => {
    this.setState({
      showAdvance: !this.state.showAdvance
    });
  };
  update = () => {
    this.props.onUpdate(this.state.quiz);
  };

  componentDidMount() {
    this.setState({
      quiz: this.props.quiz
    });
  }

  render() {
    const { classes, updating, onCancel } = this.props;
    const { quiz, showAdvance } = this.state;
    return (
      <Card className={classes.root} ref={this.rect}>
        {updating ? (
          <CardContent className={classes.loadingContent}>
            <LinearProgress color="primary" />
          </CardContent>
        ) : null}
        <CardHeader
          className={classes.header}
          action={
            <IconButton
              size="small"
              aria-label="close"
              disabled={updating}
              onClick={onCancel}
            >
              <CloseIcon className={classes.headerActionIcon} />
            </IconButton>
          }
          title={<Typography variant="body1">{quiz.title}</Typography>}
          disableTypography={true}
        />
        <CardContent className={classes.content}>
          <TextField
            required
            id="title"
            name="title"
            label="Tên bài trắc nghiệm"
            value={quiz.title}
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={this.onChange}
          />
        </CardContent>
        <Collapse in={showAdvance} timeout="auto" unmountOnExit>
          <CardContent className={classes.content}>
            <TextField
              id="time_limit"
              name="time_limit"
              type="number"
              label="Thời lượng"
              value={quiz.time_limit / 1000 / 60}
              onChange={e =>
                this.onChange({
                  target: {
                    name: "time_limit",
                    value: e.target.value * 1000 * 60
                  }
                })
              }
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">phút</InputAdornment>
                )
              }}
              helperText="Điền '0' nếu không giới hạn"
            />
            <FormControl component="fieldset">
              <FormGroup row className={classes.formGroup}>
                <FormControlLabel
                  className={classes.formLabel}
                  labelPlacement="top"
                  label="Trộn câu hỏi"
                  control={
                    <Switch
                      name="enable_shuffle_questions"
                      size="medium"
                      checked={quiz.enable_shuffle_questions}
                      onChange={e =>
                        this.onChange({
                          target: {
                            name: "enable_shuffle_questions",
                            value: e.target.checked
                          }
                        })
                      }
                    />
                  }
                />
              </FormGroup>
              <FormGroup row className={classes.formGroup}>
                <FormControlLabel
                  className={classes.formLabel}
                  labelPlacement="top"
                  label="Đặt lại câu hỏi khi quay lại"
                  control={
                    <Switch
                      name="ask_questions_again_when_returning"
                      size="medium"
                      checked={quiz.ask_questions_again_when_returning}
                      onChange={e =>
                        this.onChange({
                          target: {
                            name: "ask_questions_again_when_returning",
                            value: e.target.checked
                          }
                        })
                      }
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </CardContent>
        </Collapse>
        <CardActions className={classes.actions}>
          <Button
            className={classes.buttonPrimary}
            variant="contained"
            color="primary"
            size="small"
            disabled={updating}
            onClick={this.update}
          >
            Lưu
          </Button>
          <Button
            className={classes.buttonText}
            size="small"
            onClick={this.toggleAdvance}
          >
            Nâng cao
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(QuizEdit);
