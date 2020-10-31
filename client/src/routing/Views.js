import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import EntryCard from '../components/EntryCard';
import { PLACE, PLACES, FLIGHT_SCHEDULE, VIEWS } from '../constants';
import { px } from '../utils';

const Views = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.entries.has(PLACE) && (
                <EntryCard
                    title={props.entries.get(PLACE)}
                    image="/static/city.jpg"
                    to={`entry/${PLACE}`}
                />
            )}
            {props.entries.has(PLACES) && (
                <EntryCard
                    title={props.entries.get(PLACES)}
                    image="/static/airplane-interior.jpg"
                    to={`entry/${PLACES}`}
                />
            )}
            {props.entries.has(FLIGHT_SCHEDULE) && (
                <EntryCard
                    title={props.entries.get(FLIGHT_SCHEDULE)}
                    image="/static/schedule-board.jpg"
                    to={`entry/${FLIGHT_SCHEDULE}`}
                />
            )}
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        gap: px(32),
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 320px)',
        justifyContent: 'center',
    },
}));

const mapStateToProps = state => ({
    entries: state.metaData.allowed.reduce((accumulator, entry) => {
        if (VIEWS.has(entry.tableName)) {
            accumulator.set(entry.tableName, VIEWS.get(entry.tableName));
        }

        return accumulator;
    }, new Map()),
});

export default connect(mapStateToProps)(Views);
