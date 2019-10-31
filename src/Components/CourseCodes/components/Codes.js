import React from "react";
import Grid from "@material-ui/core/Grid";

import Code from "./Code";

export default function Codes(props) {
  const {
    codes,
    onCopyCode,
    deleting,
    onDelete,
    updating,
    onUpdate,
    searchTerm
  } = props;

  return (
    <Grid container spacing={2}>
      {codes.map(code => (
        <Grid key={code._id} item xs={12}>
          <Code
            code={code}
            deleting={deleting}
            onDelete={onDelete}
            updating={updating}
            onUpdate={onUpdate}
            onCopyCode={onCopyCode}
            searchTerm={searchTerm}
          />
        </Grid>
      ))}
    </Grid>
  );
}
