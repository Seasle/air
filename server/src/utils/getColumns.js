import columns from '../constants/columns.js';

export const getColumns = entry =>
    Object.keys(entry).reduce((accumulator, key) => {
        if (columns[key] !== undefined) {
            accumulator.push({
                key,
                name: columns[key],
            });
        }

        return accumulator;
    }, []);
