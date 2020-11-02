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
    IconButton,
    makeStyles,
    withStyles,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ArrowBack, Edit, Delete } from '@material-ui/icons';
import RouteButton from '../components/RouteButton';
import EntryActions from '../components/EntryActions';
import EditDialog from '../components/dialogs/EditDialog';
import DeleteDialog from '../components/dialogs/DeleteDialog';
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
    const permissions = props.allowed.find(entry => entry.tableName === params.name);
    const accessGranted = permissions !== undefined;
    const canUpdateOrDelete = permissions?.update || permissions?.delete;

    const [table, setTable] = useState({
        total: 0,
        data: [],
        columns: [],
    });
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
    });
    const [order, setOrder] = useState(null);
    const [direction, setDirection] = useState('DESC');
    const [isEmpty, setIsEmpty] = useState(false);

    const load = () => {
        const { token, cancel } = CancelToken.source();

        getData(
            {
                name: params.name,
                order: camelToSnake(order),
                direction,
                page: pagination.page,
                size: pagination.size,
            },
            {
                cancelToken: token,
            }
        ).then(({ total, data, columns }) => {
            if (data.length === 0 || columns.length === 0) {
                setIsEmpty(true);
            } else {
                setTable({ total, data, columns });
            }
        });

        return () => cancel();
    };

    const handleChangePage = (event, page) => setPagination(state => ({ ...state, page }));

    const handleChangeSize = event => {
        const value = Number(event.target.value);

        setPagination(state => ({
            page: Math.max(0, Math.min(state.page, Math.ceil(table.total / value) - 1)),
            size: value,
        }));
    };

    const changeSorting = key => {
        if (order === key) {
            setDirection(state => (state === 'ASC' ? 'DESC' : 'ASC'));
        }

        setOrder(key);
    };

    const handleUpdate = () => {
        load();
    };

    useEffect(() => {
        return load();
    }, [params.name, order, direction, pagination]);

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
                <EntryActions current={params.name} permissions={permissions} onChange={handleUpdate} />
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
                        <TableContainer component={props => <Paper variant="outlined" {...props} />}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        {table.columns.map((column, index) => (
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
                                        {canUpdateOrDelete && <ThemedTableCell></ThemedTableCell>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {table.data.map((entry, index) => (
                                        <ThemedTableRow key={index}>
                                            {table.columns.map((column, index) => (
                                                <ThemedTableCell key={index}>
                                                    {parse(entry[column.key], column.key)}
                                                </ThemedTableCell>
                                            ))}
                                            {canUpdateOrDelete && (
                                                <ThemedTableCell>
                                                    {permissions?.update && (
                                                        <EditDialog
                                                            current={params.name}
                                                            data={entry}
                                                            onChange={handleUpdate}
                                                        >
                                                            {openDialog => (
                                                                <IconButton size="small" onClick={openDialog}>
                                                                    <Edit />
                                                                </IconButton>
                                                            )}
                                                        </EditDialog>
                                                    )}
                                                    {permissions?.delete && (
                                                        <DeleteDialog
                                                            table={params.name}
                                                            id={entry.id}
                                                            onChange={handleUpdate}
                                                        >
                                                            {openDialog => (
                                                                <IconButton size="small" onClick={openDialog}>
                                                                    <Delete />
                                                                </IconButton>
                                                            )}
                                                        </DeleteDialog>
                                                    )}
                                                </ThemedTableCell>
                                            )}
                                        </ThemedTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={table.total}
                            page={pagination.page}
                            rowsPerPage={pagination.size}
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
