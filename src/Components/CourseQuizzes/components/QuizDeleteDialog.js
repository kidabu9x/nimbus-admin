import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";

function PaperComponent(props) {
  return <Paper {...props} />;
}

function LoadingBar(props) {
  const { loading } = props;
  if (loading) {
    return <LinearProgress />;
  } else {
    return null;
  }
}

export default function DraggableDialog(props) {
  const { open, handleClose, handleConfirm, loading, quiz } = props;

  return (
    <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent}>
      <DialogTitle>
        <LoadingBar loading={loading} />
        Xóa bài trắc nghiệm {quiz.title} ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Toàn bộ câu hỏi và kết quả liên quan tới bài trắc nghiệm cũng sẽ bị
          xóa bỏ. Xác nhận xóa ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Hủy
        </Button>
        <Button onClick={handleConfirm} color="primary" disabled={loading}>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
