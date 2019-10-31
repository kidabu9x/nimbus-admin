import React, { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Highlighter from "react-highlight-words";

import DeleteDialog from "./CodeDeleteDialog";
import TitleInput from "./CodeTitleInput";

const useStyles = makeStyles(theme => ({
  actionButton: {
    textTransform: "normal"
  },
  actionButtonRight: {
    marginLeft: "auto"
  }
}));

const Highlight = props => {
  const { search, text } = props;
  if (!search) return text;
  return (
    <Highlighter
      searchWords={[search]}
      autoEscape={true}
      textToHighlight={text}
    />
  );
};

const Code = props => {
  const {
    code,
    onCopyCode,
    deleting,
    onDelete,
    updating,
    onUpdate,
    searchTerm
  } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [editTitle, setEditTitle] = useState(false);

  const leftCol = 4;
  const rightCol = 8;

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openDeleteDialog = () => {
    setOpenDelete(true);
    closeMenu();
  };

  const deleteAccept = () => {
    onDelete(code._id);
  };

  const deleteReject = () => {
    setOpenDelete(false);
  };

  const toggleEditTitle = () => {
    setEditTitle(!editTitle);
    closeMenu();
  };

  const updateCode = async title => {
    await onUpdate({
      ...code,
      title
    });
    toggleEditTitle();
  };

  return (
    <Fragment>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={leftCol}>
              <Typography variant="body2">Tên lớp</Typography>
            </Grid>
            <Grid item xs={rightCol}>
              {!editTitle ? (
                <Typography variant="body2">
                  <Highlight text={code.title} search={searchTerm} />
                </Typography>
              ) : (
                <TitleInput
                  code={code}
                  loading={updating}
                  handleClose={toggleEditTitle}
                  handleConfirm={updateCode}
                />
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={leftCol}>
              <Typography variant="body2">Mã</Typography>
            </Grid>
            <Grid item xs={rightCol}>
              <Typography variant="subtitle2">
                <Highlight text={code.code} search={searchTerm} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={leftCol}>
              <Typography variant="body2">Khóa học</Typography>
            </Grid>
            <Grid item xs={rightCol}>
              <Typography variant="body2">{code.course_id.title}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={leftCol}>
              <Typography variant="body2">Giảng viên</Typography>
            </Grid>
            <Grid item xs={rightCol}>
              <Typography variant="body2">
                {code.teacher_id.first_name} {code.teacher_id.last_name}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" disabled={true}>
            Xem kết quả
          </Button>
          <Button size="small" color="primary" onClick={() => onCopyCode(code)}>
            Sao chép mã
          </Button>
          <IconButton
            className={classes.actionButtonRight}
            size="small"
            aria-controls="code-menu"
            aria-haspopup="true"
            onClick={openMenu}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
      <Menu
        id="code-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={toggleEditTitle}>Sửa tên lớp</MenuItem>
        <MenuItem onClick={openDeleteDialog}>Xóa mã</MenuItem>
      </Menu>

      <DeleteDialog
        open={openDelete}
        loading={deleting}
        handleClose={deleteReject}
        handleConfirm={deleteAccept}
      />
    </Fragment>
  );
};

export default Code;
