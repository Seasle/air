import { get } from './core';

const base = 'dictionary';

const collectURL = (url, search) => {
    if (search !== undefined) {
        return `${url}?${search}`;
    }

    return url;
};

export const getAvailableFlights = (search, options) => get(collectURL(`${base}/flights`, search), options);

export const getAvailablePlaces = (search, options) => get(collectURL(`${base}/places`, search), options);

export const getAvailableAirplanes = (search, options) => get(collectURL(`${base}/airplanes`, search), options);

export const getAvailableCities = (search, options) => get(collectURL(`${base}/cities`, search), options);

export const getAvailableCountries = (search, options) => get(collectURL(`${base}/countries`, search), options);
