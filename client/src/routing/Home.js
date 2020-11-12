import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Dashboard from './Dashboard';
import Tables from './Tables';
import Views from './Views';
import Entry from './Entry';
import { px } from '../utils';

const Home = props => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, props.isToolbarPinned && classes.offset)}>
            <Menu>{openMenu => <Header isToolbarPinned={props.isToolbarPinned} openMenu={openMenu} />}</Menu>
            <div className={classes.container}>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/tables" component={Tables} />
                    <Route path="/views" component={Views} />
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
    offset: {
        marginLeft: 240,
    },
    container: {
        padding: px(32),
        flexGrow: 1,
    },
}));

const mapStateToProps = state => ({
    isToolbarPinned: state.common.menuType === 'permanent',
});

export default connect(mapStateToProps)(Home);
