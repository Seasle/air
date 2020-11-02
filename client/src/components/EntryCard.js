import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, makeStyles } from '@material-ui/core';
import RouteButton from './RouteButton';

const EntryCard = props => {
    const classes = useStyles();

    return (
        <Card>
            <CardMedia className={classes.media} image={props.image} title="Contemplative Reptile" />
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.title}
                </Typography>
            </CardContent>
            <CardActions>
                <RouteButton to={props.to} color="primary">
                    Открыть
                </RouteButton>
            </CardActions>
        </Card>
    );
};

const useStyles = makeStyles(theme => ({
    media: {
        height: 160,
    },
}));

export default EntryCard;
