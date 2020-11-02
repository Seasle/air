import React, { useState } from 'react';
import { DialogTitle, DialogContent, DialogActions, Typography, Button } from '@material-ui/core';
import ThemedDialog from '../common/ThemedDialog';
import { noop } from '../../utils';
import { deleteData } from '../../api';

const DeleteDialog = ({ children, onChange = noop, ...props }) => {
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const submitDialog = values => {
        setSubmitting(true);

        deleteData(props).then(() => {
            setSubmitting(false);
            setOpen(false);

            onChange();
        });
    };

    return (
        <>
            {children(openDialog)}
            <ThemedDialog open={open}>
                <DialogTitle>Удаление записи</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                        Вы действительно хотите удалить запись? Отменить данное действие будет невозможно.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" disabled={submitting} onClick={closeDialog}>
                        Нет
                    </Button>
                    <Button color="primary" variant="contained" disabled={submitting} onClick={submitDialog}>
                        Да
                    </Button>
                </DialogActions>
            </ThemedDialog>
        </>
    );
};

export default DeleteDialog;
