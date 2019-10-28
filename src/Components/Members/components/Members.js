import React, { Fragment } from "react";
import Divider from "@material-ui/core/Divider";

import Member from "./Member";

export default function Members(props) {
  const {
    members,
    deleting,
    onDelete
  } = props;
  return (
    <Fragment>
      {members.map(member => (
        <Fragment key={member._id}>
          <Member
            member={member}
            deleting={deleting}
            onDelete={onDelete}
          />
          <Divider />
        </Fragment>

      ))}
    </Fragment>
  )
}