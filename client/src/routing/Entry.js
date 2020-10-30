import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useRouteMatch } from 'react-router-dom';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    makeStyles,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ArrowBack } from '@material-ui/icons';
import RouteButton from '../components/RouteButton';
import { VIEWS } from '../constants';
import { getData } from '../api';
import { CancelToken } from 'axios';
import { parse, px } from '../utils';

const Entry = props => {
    const classes = useStyles();
    const { params } = useRouteMatch();
    const accessGranted = props.allowed.some(entry => entry.tableName === params.name);

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        const { token, cancel } = CancelToken.source();

        getData(params.name, {
            cancelToken: token,
        }).then(({ data, columns }) => {
            if (data.length === 0 || columns.length === 0) {
                setIsEmpty(true);
            } else {
                setData(data);
                setColumns(columns);
            }
        });

        return () => cancel();
    }, [params.name]);

    return !accessGranted ? (
        <Redirect to="/" />
    ) : (
        <div className={classes.root}>
            <RouteButton
                back
                className={classes.backButton}
                color="primary"
                variant="contained"
                startIcon={<ArrowBack />}
            >
                Назад
            </RouteButton>
            <Paper className={classes.paper}>
                <Typography variant="h5" component="h2">
                    {VIEWS.get(params.name)}
                </Typography>
                {isEmpty && (
                    <Alert severity="info">
                        <AlertTitle>Уведомление</AlertTitle>
                        Извините, но <strong>данных</strong> нет!
                    </Alert>
                )}
                {!isEmpty && (
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column, index) => (
                                        <TableCell key={index}>{column.name}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((entry, index) => (
                                    <TableRow key={index}>
                                        {columns.map((column, index) => (
                                            <TableCell key={index}>
                                                {parse(entry[column.key])}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        gap: px(16),
        display: 'grid',
        gridTemplateRows: 'max-content 1fr',
    },
    paper: {
        padding: px(16),
        gap: px(16),
        display: 'grid',
        gridAutoRows: 'max-content',
    },
    backButton: {
        justifySelf: 'start',
    },
}));

const mapStateToProps = state => ({
    allowed: state.metaData.allowed,
});

export default connect(mapStateToProps)(Entry);
