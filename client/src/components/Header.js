import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import Profile from './Profile';

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit">
                    <Menu />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Air
                </Typography>
                <Profile />
            </Toolbar>
        </AppBar>
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
