import React, { Suspense, lazy, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Loader from './components/Loader';
import { getUser } from './api';
import { updateUser } from './redux/actions/userActions';

const Home = lazy(() => import('./routing/Home.js'));
const Auth = lazy(() => import('./routing/Auth.js'));

const App = props => {
    useEffect(() => {
        getUser().then(user => {
            if (user.name !== props.userName || user.password !== props.password) {
                props.updateUser(user);
            }
        });
    }, []);

    const userSelected = props.userName !== null && props.password !== null;

    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (userSelected ? <Home /> : <Redirect to="/auth" />)}
                    />
                    <Route
                        exact
                        path="/auth"
                        render={() => (!userSelected ? <Auth /> : <Redirect to="/" />)}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
