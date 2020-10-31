export const groupBy = (collection, mapper) =>
    collection.reduce((accumulator, entry) => {
        const group = mapper(entry);
        if (accumulator[group] === undefined) {
            accumulator[group] = [];
        }

        accumulator[group].push(entry);

        return accumulator;
    }, {});

export const mergeBy = (collection, mapper) => {
    const cache = new Map();
    const groups = collection.reduce((accumulator, entry) => {
        const group = mapper(entry);
        if (!cache.has(group)) {
            cache.set(group, []);

            accumulator.push(cache.get(group));
        }

        cache.get(group).push(entry);

        return accumulator;
    }, []);

    return groups
        .map(group =>
            group.reduce((accumulator, entry) => {
                for (const key in entry) {
                    if (accumulator[key] === undefined) {
                        accumulator[key] = entry[key];
                    } else {
                        accumulator[key] = accumulator[key] || entry[key];
                    }
                }

                return accumulator;
            }, {})
        )
        .flat();
};
