import React, { Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';

import FormAdvanceDialog from "./FormAdvanceDialog";
import FormDeleteDialog from "./FormDeleteDialog";

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
        backgroundColor: "#fff",
        borderRadius: "2px"
    },
    textarea: {
        fontSize: "12px",
        width: "100%",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        padding: "5px",
        borderRadius: "2px",
        "&:hover, &:focus": {
            border: "1px solid rgba(0, 0, 0, 0.3)",
            outline: "none"
        }
    },
    answerContainer: {
        marginTop: theme.spacing(1),
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        boxSizing: "border-box",
    },
    answerCheckbox: {
        width: "42px"
    },
    answerDeleteButton: {
        width: "44px"
    },
    answerTextarea: {
        flex: 1
    },
    submitButton: {
        margin: "0 auto",
        marginTop: theme.spacing(2),
    },
    actionContainer: {
        marginTop: theme.spacing(3)
    },
    action: {
        textTransform: "none"
    },
    actionRight: {
        float: "right",
        color: theme.palette.text.hint
    },
}));

const Form = (props) => {
    const {
        question,
        updating,
        deleting,
        onSave,
        onDelete,
        updateQuestionField,
        addNewAnswer,
        removeAnswer
    } = props;
    const classes = styles();
    const [openAdvance, setOpenAdvance] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const onChange = (event) => {
        updateQuestionField({
            [event.target.name]: event.target.value
        });
    }

    const updateAnswer = (field, value, index) => {
        question.answers[index] = {
            ...question.answers[index],
            [field]: value
        }
        updateQuestionField({
            answers: question.answers
        });
    }

    const openAdvanceDialog = () => {
        setOpenAdvance(true);
    }

    const closeAdvanceDialog = () => {
        setOpenAdvance(false);
    }

    const openDeleteDialog = () => {
        setOpenDelete(true);
    }

    const closeDeleteDialog = () => {
        setOpenDelete(false);
    }

    return (
        <Fragment>
            <div className={classes.container}>
                <TextareaAutosize
                    className={classes.textarea}
                    value={question.question}
                    aria-label="input question"
                    rows={5}
                    placeholder="(*) Nhập câu hỏi..."
                    name="question"
                    onChange={onChange}
                />
                {question.answers.map((answer, index) => (
                    <div className={classes.answerContainer} key={index}>
                        <Checkbox
                            className={classes.answerCheckbox}
                            checked={answer.is_correct}
                            name="is_correct"
                            color="primary"
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                            onChange={e => updateAnswer(e.target.name, e.target.checked, index)}
                        />
                        <TextareaAutosize
                            className={`${classes.answerTextarea} ${classes.textarea}`}
                            aria-label="input question"
                            rows={3}
                            placeholder="(*) Nhập câu trả lời..."
                            value={answer.answer}
                            name="answer"
                            onChange={e => updateAnswer(e.target.name, e.target.value, index)}
                        />
                        <IconButton
                            className={classes.answerDeleteButton}
                            aria-label="delete"
                            disabled={question.answers.length === 1}
                            onClick={() => removeAnswer(index)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                ))}

                <div className={classes.actionContainer}>
                    <Button
                        className={classes.action}
                        color="secondary"
                        size="small"
                        onClick={addNewAnswer}
                    >
                        Thêm câu trả lời
                    </Button>
                    <Button
                        className={`${classes.action} ${classes.actionRight}`}
                        color="secondary"
                        size="small"
                        onClick={openAdvanceDialog}
                    >
                        Nâng cao
                    </Button>
                </div>
            </div>

            <FormAdvanceDialog
                open={openAdvance}
                question={question}
                updateQuestionField={updateQuestionField}
                handleClose={closeAdvanceDialog}
            />

            <FormDeleteDialog
                loading={deleting}
                open={openDelete}
                handleClose={closeDeleteDialog}
                handleConfirm={onDelete}
            />

            {!updating ?
                <Button
                    className={classes.submitButton}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={onSave}
                    disabled={deleting}
                >
                    Lưu câu hỏi
                </Button>
                :
                <CircularProgress className={classes.submitButton} color="primary" />
            }

            {!deleting ?
                <Button
                    className={classes.submitButton}
                    variant="text"
                    size="small"
                    fullWidth
                    disabled={updating}
                    onClick={openDeleteDialog}
                >
                    Xoá câu hỏi
                </Button>
                :
                <CircularProgress className={classes.submitButton} color="secondary" size={20} />
            }
        </Fragment>
    )
}

export default Form;