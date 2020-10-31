import React, { Children, useState } from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core';

const AddPassengerDialog = ({ children, ...props }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    return (
        <>
            {children(openDialog)}
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Заголовок</DialogTitle>
                <DialogContent>Содержание</DialogContent>
                <DialogActions>Кнопки</DialogActions>
            </Dialog>
        </>
    );
};

const useStyles = makeStyles(theme => ({}));

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AddPassengerDialog);
