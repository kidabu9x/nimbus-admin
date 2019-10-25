import React, { useState, Fragment } from "react";

import QuizCard from "./QuizCard";
import QuizEdit from "./QuizEdit";
import QuizDeleteDialog from "./QuizDeleteDialog";

export default function Quiz(props) {
  const { quiz, updating, deleting, onUpdate, onDelete } = props;
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [edit, setEdit] = useState(false);

  const confirmDelete = () => {
    setDeleteDialog(true);
  };

  const rejectDelete = () => {
    setDeleteDialog(false);
  };

  const acceptDelete = () => {
    onDelete(quiz);
  };

  const confirmEdit = () => {
    setEdit(true);
  };

  const acceptEdit = async quiz => {
    await onUpdate(quiz);
    cancelEdit();
  };

  const cancelEdit = () => {
    setEdit(false);
  };

  return (
    <Fragment>
      {!edit ? (
        <QuizCard quiz={quiz} onDelete={confirmDelete} onEdit={confirmEdit} />
      ) : (
        <QuizEdit
          quiz={quiz}
          updating={updating}
          onUpdate={acceptEdit}
          onCancel={cancelEdit}
        />
      )}

      <QuizDeleteDialog
        open={deleteDialog}
        loading={deleting}
        quiz={quiz}
        handleClose={rejectDelete}
        handleConfirm={acceptDelete}
      />
    </Fragment>
  );
}
