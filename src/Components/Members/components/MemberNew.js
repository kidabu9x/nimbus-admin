import React, { } from 'react';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 290,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(0)
    },
    wrapper: {
        padding: theme.spacing(2)
    },
    input: {
        display: 'flex',
        padding: 0,
        height: 'auto',
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        bottom: 6,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    button: {
        marginTop: theme.spacing(2)
    }
}));

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps },
    } = props;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: classes.input,
                    ref: innerRef,
                    children,
                    ...innerProps,
                },
            }}
            {...TextFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    const { selectProps, innerProps = {}, children } = props;
    return (
        <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
            {children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

export default function IntegrationReactSelect(props) {
    const classes = useStyles();
    const [user, setUser] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const {
        users,
        searchUsers,
        creating,
        onCreate
    } = props;
    React.useEffect(() => {
        setOptions(users.map(user => {
            return {
                label: user.email,
                value: user._id
            }
        }));
    }, [users]);

    const onClickCreate = async () => {
        if (user) {
            await onCreate(user.value);
            setUser(null);
        }
    }

    const onSelect = user => {
        setUser(user);
    };

    const handleSearchChange = searchTerm => {
        if (searchTerm !== search) {
            setSearch(searchTerm);
            searchUsers(searchTerm);
        }
    }

    return (
        <Paper className={classes.root}>
            {creating ?
                <LinearProgress />
                :
                null
            }
            <div className={classes.wrapper}>
                <Select
                    classes={classes}
                    inputId="react-select-single"
                    TextFieldProps={{
                        label: 'Thêm thành viên',
                        InputLabelProps: {
                            htmlFor: 'react-select-single',
                            shrink: true,
                        },
                    }}
                    placeholder="Tìm kiếm bằng email, họ, tên..."
                    options={options}
                    components={components}
                    value={user}
                    onChange={onSelect}
                    inputValue={search}
                    onInputChange={handleSearchChange}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={creating}
                    onClick={onClickCreate}
                >
                    Thêm
            </Button>
            </div>
        </Paper>

    );
}
