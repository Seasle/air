import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import { getAllowed } from '../api';
import { px } from '../utils';
import { setAllowed } from '../redux/actions/metaDataActions';

const Home = props => {
    const classes = useStyles();

    useEffect(() => {
        getAllowed().then(allowed => {
            props.setAllowed(allowed);
        });
    }, []);

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

const mapDispatchToProps = dispatch => ({
    setAllowed: data => dispatch(setAllowed(data)),
});

export default connect(null, mapDispatchToProps)(Home);
