import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useRouteMatch } from 'react-router-dom';
import {
    Paper,
    TableContainer,
    TablePagination,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableSortLabel,
    Typography,
    makeStyles,
    withStyles,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ArrowBack } from '@material-ui/icons';
import RouteButton from '../components/RouteButton';
import EntryActions from '../components/EntryActions';
import { ENTRIES } from '../constants';
import { getData } from '../api';
import { CancelToken } from 'axios';
import { camelToSnake, parse, px } from '../utils';

const ThemedTableCell = withStyles(theme => ({
    root: {
        whiteSpace: 'nowrap',
    },
    head: {
        fontWeight: 600,
    },
}))(TableCell);

const ThemedTableRow = withStyles(theme => ({
    root: {
        '&:last-child > *': {
            borderBottom: 'unset',
        },
    },
}))(TableRow);

const Entry = props => {
    const classes = useStyles();
    const { params } = useRouteMatch();
    const accessGranted = props.allowed.some(entry => entry.tableName === params.name);

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState(null);
    const [direction, setDirection] = useState('DESC');
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(0);
    const [isEmpty, setIsEmpty] = useState(false);

    const handleChangePage = (event, page) => setPage(page);

    const handleChangeSize = event => {
        const value = Number(event.target.value);

        setSize(value);
        setPage(state => Math.max(0, Math.min(state, Math.ceil(total / value) - 1)));
    };

    const changeSorting = key => {
        if (order === key) {
            setDirection(state => (state === 'ASC' ? 'DESC' : 'ASC'));
        }

        setOrder(key);
    };

    useEffect(() => {
        const { token, cancel } = CancelToken.source();

        getData(
            {
                name: params.name,
                order: camelToSnake(order),
                direction,
                page,
                size,
            },
            {
                cancelToken: token,
            }
        ).then(({ total, data, columns }) => {
            if (data.length === 0 || columns.length === 0) {
                setIsEmpty(true);
            } else {
                setTotal(total);
                setData(data);
                setColumns(columns);
            }
        });

        return () => cancel();
    }, [params.name, order, direction, page, size]);

    return !accessGranted ? (
        <Redirect to="/" />
    ) : (
        <div className={classes.root}>
            <div className={classes.buttons}>
                <RouteButton
                    back
                    className={classes.backButton}
                    color="primary"
                    variant="contained"
                    startIcon={<ArrowBack />}
                >
                    Назад
                </RouteButton>
                <EntryActions current={params.name} />
            </div>
            <Paper className={classes.paper}>
                <Typography variant="h5" component="h2">
                    {ENTRIES.get(params.name)}
                </Typography>
                {isEmpty && (
                    <Alert severity="info">
                        <AlertTitle>Уведомление</AlertTitle>
                        Извините, но <strong>данных</strong> нет!
                    </Alert>
                )}
                {!isEmpty && (
                    <>
                        <TableContainer
                            component={props => <Paper variant="outlined" {...props} />}
                        >
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column, index) => (
                                            <ThemedTableCell key={index}>
                                                <TableSortLabel
                                                    active={order === column.key}
                                                    direction={direction.toLowerCase()}
                                                    onClick={() => changeSorting(column.key)}
                                                >
                                                    {column.name}
                                                </TableSortLabel>
                                            </ThemedTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((entry, index) => (
                                        <ThemedTableRow key={index}>
                                            {columns.map((column, index) => (
                                                <ThemedTableCell key={index}>
                                                    {parse(entry[column.key], column.key)}
                                                </ThemedTableCell>
                                            ))}
                                        </ThemedTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={total}
                            page={page}
                            rowsPerPage={size}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeSize}
                        />
                    </>
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
    buttons: {
        gap: px(16),
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'max-content',
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
