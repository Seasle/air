import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import EntryCard from '../components/EntryCard';
import { FLIGHT, PASSENGERS, FLIGHT_SCHEDULE, TABLES, VIEWS } from '../constants';
import { px } from '../utils';

const Dashboard = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.entries.has(FLIGHT) && (
                <EntryCard title={props.entries.get(FLIGHT)} image="/static/airplane.jpg" to={`entry/${FLIGHT}`} />
            )}
            {props.entries.has(PASSENGERS) && (
                <EntryCard
                    title={props.entries.get(PASSENGERS)}
                    image="/static/passengers.jpg"
                    to={`entry/${PASSENGERS}`}
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
        if (TABLES.has(entry.tableName)) {
            accumulator.set(entry.tableName, TABLES.get(entry.tableName));
        }

        if (VIEWS.has(entry.tableName)) {
            accumulator.set(entry.tableName, VIEWS.get(entry.tableName));
        }

        return accumulator;
    }, new Map()),
});

export default connect(mapStateToProps)(Dashboard);
