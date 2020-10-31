import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import EntryCard from '../components/EntryCard';
import { CITY, COUNTRY, FLIGHT, TABLES } from '../constants';
import { px } from '../utils';

const Views = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.entries.has(CITY) && (
                <EntryCard
                    title={props.entries.get(CITY)}
                    image="/static/city.jpg"
                    to={`entry/${CITY}`}
                />
            )}
            {props.entries.has(COUNTRY) && (
                <EntryCard
                    title={props.entries.get(COUNTRY)}
                    image="/static/country.jpg"
                    to={`entry/${COUNTRY}`}
                />
            )}
            {props.entries.has(FLIGHT) && (
                <EntryCard
                    title={props.entries.get(FLIGHT)}
                    image="/static/airplane.jpg"
                    to={`entry/${FLIGHT}`}
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

        return accumulator;
    }, new Map()),
});

export default connect(mapStateToProps)(Views);
