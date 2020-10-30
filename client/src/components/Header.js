import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import Profile from './Profile';

const Header = props => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        edge="start"
                        color="inherit"
                        onClick={props.openMenu}
                    >
                        <Menu />
                    </IconButton>
                    <Typography className={classes.title} variant="h6">
                        Air
                    </Typography>
                    <Profile />
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
};

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default Header;
