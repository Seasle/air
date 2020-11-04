import { mergeMaps } from '../utils';

export const CITY = 'CITY';
export const COUNTRY = 'COUNTRY';
export const FLIGHT = 'FLIGHT';
export const PLACE_TYPE = 'PLACE_TYPE';
export const PLACE = 'PLACE';
export const PLACES = 'PLACES';
export const FLIGHT_SCHEDULE = 'FLIGHT_SCHEDULE';
export const PASSENGERS = 'PASSENGERS';
export const NAME = 'NAME';
export const FIRST_NAME = 'FIRST_NAME';
export const SURNAME = 'SURNAME';
export const PATRONYMIC = 'PATRONYMIC';
export const DOCUMENT_NUMBER = 'DOCUMENT_NUMBER';
export const DOCUMENT_SERIES = 'DOCUMENT_SERIES';
export const FLIGHT_NUMBER = 'FLIGHT_NUMBER';
export const DEPARTURE_DATE = 'DEPARTURE_DATE';
export const DEPARTURE_TIME = 'DEPARTURE_TIME';
export const AIRPLANE_ID = 'AIRPLANE_ID';
export const DEPARTURE_ID = 'DEPARTURE_ID';
export const ARRIVAL_ID = 'ARRIVAL_ID';
export const FLIGHT_TIME = 'FLIGHT_TIME';
export const TICKET_PRICE = 'TICKET_PRICE';
export const COUNTRY_ID = 'COUNTRY_ID';

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
    [FIRST_NAME, 'Имя'],
    [PATRONYMIC, 'Отчество'],
    [DOCUMENT_NUMBER, 'Номер документа'],
    [DOCUMENT_SERIES, 'Серия документа'],
    [FLIGHT_NUMBER, 'Номер рейса'],
    [DEPARTURE_DATE, 'Дата вылета'],
    [DEPARTURE_TIME, 'Время вылета'],
    [PLACE, 'Место'],
    [AIRPLANE_ID, 'Самолет'],
    [DEPARTURE_ID, 'Пункт вылета'],
    [ARRIVAL_ID, 'Пункт назначения'],
    [FLIGHT_TIME, 'Время полета'],
    [TICKET_PRICE, 'Цена билета'],
    [COUNTRY_ID, 'Страна'],
    [NAME, 'Название'],
]);

export const ENTRIES = mergeMaps(TABLES, VIEWS);
