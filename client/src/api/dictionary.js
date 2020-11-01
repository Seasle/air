import { get } from './core';

const base = 'dictionary';

const collectURL = (url, search) => {
    if (search !== undefined) {
        return `${url}?${search}`;
    }

    return url;
};

export const getAvailableFlights = (search, options) =>
    get(collectURL(`${base}/flights`, search), options);

export const getAvailablePlaces = (search, options) =>
    get(collectURL(`${base}/places`, search), options);
