import React from "react";
import { withRouter } from "react-router-dom";
import Highlighter from "react-highlight-words";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/styles";

const styles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        cursor: "pointer"
    },
    question: {
        marginBottom: theme.spacing(2)
    },
    answers: {
        marginTop: theme.spacing(1)
    },
    answerCheckbox: {
        padding: theme.spacing(0, 0.25)
    }
}));

const Highlight = (props) => {
    const { search, text } = props;
    if (!search) return text;
    return <Highlighter
        searchWords={[search]}
        autoEscape={true}
        textToHighlight={text}
    />
}

const Question = (props) => {
    const classes = styles();
    const { question, search, history } = props;

    const onClick = () => {
        let path = history.location.pathname + "/" + question._id;
        history.push(path);
    }

    return (
        <Paper className={classes.paper} onClick={onClick}>
            <Typography variant="body1" className={classes.question}>
                <Highlight
                    text={question.question}
                    search={search}
                />
            </Typography>
            <Divider />
            {question.answers.map(answer => (
                <Grid container className={classes.answers} key={answer._id}>
                    <Grid item xs={2}>
                        <Checkbox
                            className={classes.answerCheckbox}
                            checked={answer.is_correct}
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                            color="primary"
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="body1" gutterBottom>
                            {answer.answer}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
        </Paper>
    )
}

const Questions = (props) => {
    const { questions, search, history } = props;
    return (
        <Grid container>
            {questions.map(question => (
                <Grid item xs={12} key={question._id}>
                    <Question
                        question={question}
                        search={search}
                        history={history}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default withRouter(Questions);