import { Dialog, withStyles } from '@material-ui/core';

const ThemedDialog = withStyles(theme => ({
    paper: {
        minWidth: 540,
    },
}))(Dialog);

export default ThemedDialog;
