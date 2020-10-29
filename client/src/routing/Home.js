import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { px } from '../utils';

const Home = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header />
            <div className={classes.container}>
                <Typography variant="h3" align="center">
                    Hello World
                </Typography>
            </div>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        padding: px(32),
    },
}));

export default Home;
