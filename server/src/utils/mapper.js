export const normalize = value => {
    switch (value) {
        case 'Y':
        case 'YES':
        case 'A':
            return true;
        case 'N':
        case 'NO':
            return false;
        default:
            return value;
    }
};

export const mapper = data =>
    Object.fromEntries(
        (Array.isArray(data) ? data : Object.entries(data)).map(([key, value]) => [
            key.toLowerCase().replace(/([-_][a-z])/g, group => group.toUpperCase().replace(/[-_]/g, '')),
            normalize(value),
        ])
    );
