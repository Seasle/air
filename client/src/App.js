import { makeStyles } from '@material-ui/core';

const App = () => {
    const classes = useStyles();

    return <div className={classes.root}>Hello World</div>;
};

const useStyles = makeStyles(theme => ({
    root: {},
}));

export default App;
