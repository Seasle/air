import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Drawer, makeStyles, withStyles } from '@material-ui/core';
import RouteButton from './RouteButton';
import { px } from '../utils';

const ThemedDrawer = withStyles(theme => ({
    paper: {
        minWidth: 240,
    },
}))(Drawer);

const MenuButton = props => {
    const { url } = useRouteMatch();
    const variant = url === props.to ? 'contained' : 'text';

    return <RouteButton {...props} variant={variant} />;
};

const Menu = ({ children }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {children(handleOpen)}
            <ThemedDrawer anchor="left" open={open} onClose={handleClose}>
                <div className={classes.root}>
                    <MenuButton color="primary" to="/" onClick={handleClose}>
                        Главная
                    </MenuButton>
                    <MenuButton color="primary" to="/tables" onClick={handleClose}>
                        Таблицы
                    </MenuButton>
                    <MenuButton color="primary" to="/views" onClick={handleClose}>
                        Представления
                    </MenuButton>
                </div>
            </ThemedDrawer>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        padding: px(16),
        gap: px(16),
        display: 'grid',
        gridAutoRows: 'max-content',
    },
}));

export default Menu;
