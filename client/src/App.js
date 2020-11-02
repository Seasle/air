import React, { Suspense, lazy, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Loader from './components/Loader';
import { updateUser } from './redux/actions/userActions';
import { resetStore } from './redux/actions/commonActions';
import { getUser } from './api';

const Home = lazy(() => import('./routing/Home.js'));
const Auth = lazy(() => import('./routing/Auth.js'));

const App = props => {
    useEffect(() => {
        getUser().then(user => {
            if (user.name !== props.userName || user.password !== props.password) {
                props.updateUser(user);

                if (user.name === null && user.password === null) {
                    props.resetStore();
                }
            }
        });
    }, []);

    const userSelected = props.userName !== null && props.password !== null;

    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path="/auth" render={() => (!userSelected ? <Auth /> : <Redirect to="/" />)} />
                    <Route
                        exact
                        path={['/', '/:module', '/:module/:name']}
                        render={() => (userSelected ? <Home /> : <Redirect to="/auth" />)}
                    />
                </Switch>
            </Suspense>
        </Router>
    );
};

const mapStateToProps = state => ({
    userName: state.user.userName,
    password: state.user.password,
});

const mapDispatchToProps = dispatch => ({
    updateUser: data => dispatch(updateUser(data)),
    resetStore: () => dispatch(resetStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
