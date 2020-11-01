import React from 'react';
import { connect } from 'react-redux';
import { Button, withStyles } from '@material-ui/core';
import AddPassengerDialog from './dialogs/AddPassengerDialog';
import { PASSENGERS } from '../constants';

const ThemedButton = withStyles(theme => ({
    label: {
        textTransform: 'none',
    },
}))(Button);

const EntryActions = ({ permissions, ...props }) => {
    return (
        <>
            {props.current === PASSENGERS && permissions.insert && (
                <AddPassengerDialog {...props}>
                    {openDialog => (
                        <ThemedButton color="primary" variant="contained" onClick={openDialog}>
                            Добавить
                        </ThemedButton>
                    )}
                </AddPassengerDialog>
            )}
        </>
    );
};

const mapStateToProps = (state, props) => ({
    permissions: state.metaData.allowed.find(entry => entry.tableName === props.current) || {},
});

export default connect(mapStateToProps)(EntryActions);
