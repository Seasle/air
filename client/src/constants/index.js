export const CITY = 'CITY';
export const COUNTRY = 'COUNTRY';
export const FLIGHT = 'FLIGHT';
export const PLACE_TYPE = 'PLACE_TYPE';
export const PLACE = 'PLACE';
export const PLACES = 'PLACES';
export const FLIGHT_SCHEDULE = 'FLIGHT_SCHEDULE';
export const PASSENGERS = 'PASSENGERS';

export const TABLES = new Map([
    [CITY, 'Города'],
    [COUNTRY, 'Страны'],
    [FLIGHT, 'Рейсы'],
    [PLACE_TYPE, 'Типы мест'],
]);

export const VIEWS = new Map([
    [PLACE, 'Страны и города'],
    [PLACES, 'Места'],
    [FLIGHT_SCHEDULE, 'Расписание рейсов'],
    [PASSENGERS, 'Пассажиры'],
]);
