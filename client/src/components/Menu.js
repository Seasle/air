import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Drawer, Toolbar, Button, makeStyles, withStyles } from '@material-ui/core';
import RouteButton from './RouteButton';
import { changeMenuType } from '../redux/actions/commonActions';
import { px } from '../utils';

const ThemedDrawer = withStyles(theme => ({
    root: {
        width: 240,
    },
    paper: {
        width: 240,
    },
}))(Drawer);

const MenuButton = props => {
    const { url } = useRouteMatch();
    const variant = url === props.to ? 'contained' : 'text';

    return <RouteButton {...props} variant={variant} />;
};

const Menu = ({ children, ...props }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const toggleMenu = () => props.changeMenuType(props.menuType === 'temporary' ? 'permanent' : 'temporary');

    useEffect(() => {
        if (props.menuType === 'permanent') {
            handleClose();
        }
    }, [props.menuType]);

    return (
        <>
            {children(handleOpen)}
            <ThemedDrawer anchor="left" variant={props.menuType} open={open} onClose={handleClose}>
                {props.menuType === 'permanent' && <Toolbar />}
                <div className={classes.root}>
                    <div className={classes.buttons}>
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
                    <Button color="primary" variant="outlined" onClick={toggleMenu}>
                        {props.menuType === 'temporary' ? 'Закрепить' : 'Открепить'}
                    </Button>
                </div>
            </ThemedDrawer>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        padding: px(16),
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    buttons: {
        gap: px(16),
        display: 'grid',
        gridAutoRows: 'max-content',
    },
}));

const mapStateToProps = state => ({
    menuType: state.common.menuType,
});

const mapStateToDispatch = dispatch => ({
    changeMenuType: data => dispatch(changeMenuType(data)),
});

export default connect(mapStateToProps, mapStateToDispatch)(Menu);
