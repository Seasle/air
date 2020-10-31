import { mergeMaps } from '../utils';

export const CITY = 'CITY';
export const COUNTRY = 'COUNTRY';
export const FLIGHT = 'FLIGHT';
export const PLACE_TYPE = 'PLACE_TYPE';
export const PLACE = 'PLACE';
export const PLACES = 'PLACES';
export const FLIGHT_SCHEDULE = 'FLIGHT_SCHEDULE';
export const PASSENGERS = 'PASSENGERS';
export const SURNAME = 'SURNAME';
export const NAME = 'NAME';
export const PATRONYMIC = 'PATRONYMIC';
export const DOCUMENT_NUMBER = 'DOCUMENT_NUMBER';
export const DOCUMENT_SERIES = 'DOCUMENT_SERIES';
export const FLIGHT_NUMBER = 'FLIGHT_NUMBER';
export const DEPARTURE_DATE = 'DEPARTURE_DATE';

export const TABLES = new Map([
    [CITY, 'Города'],
    [COUNTRY, 'Страны'],
    [FLIGHT, 'Рейсы'],
    [PLACE_TYPE, 'Типы мест'],
    [PASSENGERS, 'Пассажиры'],
]);

export const VIEWS = new Map([
    [PLACE, 'Страны и города'],
    [PLACES, 'Места'],
    [FLIGHT_SCHEDULE, 'Расписание рейсов'],
]);

export const FIELDS = new Map([
    [SURNAME, 'Фамилия'],
    [NAME, 'Имя'],
    [PATRONYMIC, 'Отчество'],
    [DOCUMENT_NUMBER, 'Номер документа'],
    [DOCUMENT_SERIES, 'Серия документа'],
    [FLIGHT_NUMBER, 'Номер рейса'],
    [DEPARTURE_DATE, 'Дата вылета'],
    [PLACE, 'Место'],
]);

export const ENTRIES = mergeMaps(TABLES, VIEWS);
