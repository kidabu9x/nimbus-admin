import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";

import DeleteDialog from "./MemberDeleteDialog";

const styles = makeStyles(theme => ({
    member: {
        padding: theme.spacing(2),
        backgroundColor: "#fff"
    },
    memberAction: {
        textAlign: "center"
    }
}));

export default function Members(props) {
    const { member, deleting, onDelete } = props;
    const classes = styles();
    const [openDelete, setOpenDelete] = useState(false);

    const confirmDelete = () => {
        setOpenDelete(true);
    }

    const deleteAccept = () => {
        onDelete(member._id);
    }

    const deleteReject = () => {
        setOpenDelete(false);
    }

    return (
        <div className={classes.member}>
            <Grid container>
                <Grid item xs={10}>
                    <Typography variant="h6" gutterBottom>
                        {member.user_id.first_name} {member.user_id.last_name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {member.user_id.email}
                    </Typography>
                </Grid>
                <Grid item xs={2} >
                    <div className={classes.memberAction}>
                        <IconButton size="small" onClick={confirmDelete}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <DeleteDialog
                open={openDelete}
                loading={deleting}
                member={member}
                handleConfirm={deleteAccept}
                handleClose={deleteReject}
            />
        </div>

    )
}