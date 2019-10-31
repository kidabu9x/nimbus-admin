import React, { useState, useEffect, Fragment } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

export default function TitleInput(props) {
  const { code, loading, handleConfirm, handleClose } = props;

  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(code.title);
  }, [code]);

  return (
    <Fragment>
      <Input
        value={title}
        inputProps={{
          "aria-label": "Tên lớp"
        }}
        autoFocus
        onChange={e => setTitle(e.target.value)}
      />
      <Button disabled={!title || loading} onClick={() => handleConfirm(title)}>
        Lưu
      </Button>
      <Button disabled={loading} onClick={handleClose}>
        Hủy
      </Button>
    </Fragment>
  );
}
