import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Typography, makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Views from './Views';
import Entry from './Entry';
import { getAllowed } from '../api';
import { setAllowed } from '../redux/actions/metaDataActions';
import { px } from '../utils';

const Home = props => {
    const classes = useStyles();

    useEffect(() => {
        getAllowed().then(allowed => {
            props.setAllowed(allowed);
        });
    }, []);

    return (
        <div className={classes.root}>
            <Menu>{openMenu => <Header openMenu={openMenu} />}</Menu>
            <div className={classes.container}>
                <Switch>
                    <Route exact path="/">
                        <Typography variant="h3" align="center">
                            Hello World
                        </Typography>
                    </Route>
                    <Route path="/views" component={Views} />
                    <Route path="/tables">
                        <Typography variant="h3" align="center">
                            Tables here
                        </Typography>
                    </Route>
                    <Route path="/entry/:name" component={Entry} />
                </Switch>
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
