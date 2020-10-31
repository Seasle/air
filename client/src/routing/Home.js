import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import clsx from 'clsx';
import { Typography, makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Tables from './Tables';
import Views from './Views';
import Entry from './Entry';
import { getAllowed, getColumns } from '../api';
import { setAllowed, setColumns } from '../redux/actions/metaDataActions';
import { px } from '../utils';

const Home = props => {
    const classes = useStyles();

    useEffect(() => {
        Promise.all([getAllowed(), getColumns()]).then(([allowed, columns]) => {
            props.setAllowed(allowed);
            props.setColumns(columns);
        });
    }, []);

    return (
        <div className={clsx(classes.root, props.isToolbarPinned && classes.offset)}>
            <Menu>
                {openMenu => <Header isToolbarPinned={props.isToolbarPinned} openMenu={openMenu} />}
            </Menu>
            <div className={classes.container}>
                <Switch>
                    <Route exact path="/">
                        <Typography variant="h3" align="center">
                            Hello World
                        </Typography>
                    </Route>
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

const mapDispatchToProps = dispatch => ({
    setAllowed: data => dispatch(setAllowed(data)),
    setColumns: data => dispatch(setColumns(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
