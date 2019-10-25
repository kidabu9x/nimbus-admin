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
    const { open, handleClose, handleConfirm, loading } = props;

    return (
        <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent}>
            <DialogTitle>
                <LoadingBar loading={loading} />
                Xóa câu hỏi
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Toàn bộ các kết quả liên quan tới câu hỏi này cũng sẽ bị xoá bỏ. Xác nhận xoá ?
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
