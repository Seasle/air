export const groupBy = (collection, mapper) =>
    collection.reduce((accumulator, entry) => {
        const group = mapper(entry);
        if (accumulator[group] === undefined) {
            accumulator[group] = [];
        }

        accumulator[group].push(entry);

        return accumulator;
    }, {});
