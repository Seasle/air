import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    CardHeader,
    CardActions,
    Button,
    Avatar,
    Typography,
    makeStyles,
} from '@material-ui/core';
import { updateUser } from '../redux/actions/userActions';
import { setAllowed, setColumns } from '../redux/actions/metaDataActions';
import { px } from '../utils';
import { selectUser, getAllowed, getColumns } from '../api';

const USERS = [
    {
        name: 'PASSENGER',
        password: 'PASSENGER',
    },
    {
        name: 'CASHIER',
        password: 'CASHIER',
    },
    {
        name: 'DISPATCHER',
        password: 'DISPATCHER',
    },
];

const Auth = props => {
    const classes = useStyles();

    const handleClick = user => {
        selectUser(user).then(user => {
            props.updateUser(user);

            if (user.name !== null && user.password !== null) {
                Promise.all([getAllowed(), getColumns()]).then(([allowed, columns]) => {
                    props.setAllowed(allowed);
                    props.setColumns(columns);
                });
            }
        });
    };

    return (
        <div className={classes.root}>
            <Typography variant="h3" align="center">
                Выберите пользователя, под которым хотите войти
            </Typography>
            <div className={classes.cards}>
                {USERS.map((user, index) => (
                    <Card key={index}>
                        <CardHeader
                            avatar={<Avatar className={classes.avatar}>{user.name[0]}</Avatar>}
                            title={<Typography variant="h6">{user.name}</Typography>}
                        />
                        <CardActions>
                            <Button
                                className={classes.button}
                                color="primary"
                                onClick={() => handleClick(user)}
                            >
                                Войти
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        padding: px(64),
        gap: px(64),
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    cards: {
        gap: px(64),
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'minmax(240px, 320px)',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            gridAutoFlow: 'row',
        },
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
    button: {
        width: '100%',
    },
}));

const mapDispatchToProps = dispatch => ({
    updateUser: data => dispatch(updateUser(data)),
    setAllowed: data => dispatch(setAllowed(data)),
    setColumns: data => dispatch(setColumns(data)),
});

export default connect(null, mapDispatchToProps)(Auth);
