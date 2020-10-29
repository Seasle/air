import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Avatar, Button, Menu, MenuItem, makeStyles, withStyles } from '@material-ui/core';
import { resetStore } from '../redux/actions/commonActions';
import { logoutUser } from '../api';
import { px } from '../utils';

const ThemedMenu = withStyles(theme => ({
    paper: {
        minWidth: 240,
    },
}))(Menu);

const Profile = props => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = anchorEl !== null;

    const handleMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();

        logoutUser(null).then(user => {
            props.resetStore();
        });
    };

    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar}>{props.userName[0]}</Avatar>
            <Button className={classes.button} color="inherit" onClick={handleMenuOpen}>
                {props.userName}
            </Button>
            <ThemedMenu
                keepMounted
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </ThemedMenu>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        gap: px(16),
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'max-content',
        alignItems: 'center',
    },
    avatar: {
        background: theme.palette.common.white,
        color: theme.palette.primary.dark,
    },
    button: {
        fontWeight: 500,
    },
}));

const mapStateToProps = state => ({
    userName: state.user.name,
});

const mapDispatchToProps = dispatch => ({
    resetStore: () => dispatch(resetStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
