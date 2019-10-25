import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2)
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

export default function CustomizedInputBase(props) {
    const classes = useStyles();
    const { search, handleSearchChange } = props;
    const [temp, setTemp] = useState(search);

    const onSearch = () => {
        handleSearchChange(temp);
    }

    useEffect(() => {
        setTemp(search);
    }, [search]);

    return (
        <Paper className={classes.root}>
            <InputBase
                value={temp}
                className={classes.input}
                placeholder="Tìm câu hỏi"
                inputProps={{ 'aria-label': 'Tìm câu hỏi' }}
                onChange={e => setTemp(e.target.value)}
            />
            <IconButton
                className={classes.iconButton}
                aria-label="search"
                onClick={onSearch}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
