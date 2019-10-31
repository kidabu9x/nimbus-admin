import React from "react";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  formControl: {
    marginBottom: theme.spacing(2)
  }
}));

export default function FormDialog(props) {
  const { open, question, handleClose, updateQuestion } = props;
  const classes = styles();

  const onChange = (field, value) => {
    updateQuestion({
      target: {
        name: field,
        value
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Thiết lập nâng cao</DialogTitle>
      <DialogContent>
        <FormControl
          className={classes.formControl}
          component="fieldset"
          disabled={true}
        >
          <FormLabel component="legend">Loại câu hỏi</FormLabel>
          <RadioGroup
            aria-label="type"
            name="type"
            value={question.type}
            onChange={e => onChange(e.target.name, e.target.value)}
            row
          >
            <FormControlLabel
              value="multiple_choices"
              control={<Radio color="primary" />}
              label="Chọn nhiều đáp án"
              labelPlacement="end"
            />
            <FormControlLabel
              value="pairing"
              control={<Radio color="primary" />}
              label="Ghép nối"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Xuất hiện</FormLabel>
          <RadioGroup
            aria-label="appearance"
            name="appearance"
            value={question.appearance}
            onChange={e => onChange(e.target.name, e.target.value)}
            row
          >
            <FormControlLabel
              value="fixed"
              control={<Radio color="primary" />}
              label="Cố định"
              labelPlacement="end"
            />
            <FormControlLabel
              value="random"
              control={<Radio color="primary" />}
              label="Ngẫu nhiên"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Trộn đáp án</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  name="enable_shuffle_answers"
                  size="medium"
                  checked={question.enable_shuffle_answers}
                  onChange={e => onChange(e.target.name, e.target.checked)}
                />
              }
            />
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Xong
        </Button>
      </DialogActions>
    </Dialog>
  );
}
