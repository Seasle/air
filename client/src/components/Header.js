import React from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import Profile from './Profile';

const Header = props => {
    const classes = useStyles();

    return (
        <>
            <AppBar className={clsx(props.isToolbarPinned && classes.upper)} position="fixed">
                <Toolbar>
                    {!props.isToolbarPinned && (
                        <IconButton
                            className={classes.menuButton}
                            edge="start"
                            color="inherit"
                            onClick={props.openMenu}
                        >
                            <Menu />
                        </IconButton>
                    )}
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
    upper: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default Header;
