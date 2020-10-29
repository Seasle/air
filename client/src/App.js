import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Loader from './components/Loader';

const Home = lazy(() => import('./routing/Home.js'));
const Auth = lazy(() => import('./routing/Auth.js'));

const App = props => {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (props.userSelected ? <Home /> : <Redirect to="/auth" />)}
                    />
                    <Route
                        exact
                        path="/auth"
                        render={() => (!props.userSelected ? <Auth /> : <Redirect to="/" />)}
                    />
                </Switch>
            </Suspense>
        </Router>
    );
};

const mapStateToProps = state => ({
    userSelected: state.user.name !== null && state.user.password !== null,
});

export default connect(mapStateToProps)(App);
