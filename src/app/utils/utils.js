export const makeClassNames = (names) => {
    if (names.length === 0) {
        return '';
    }
    return names.reduce((prev, curr) => {
        return `${prev} ${curr}`
    }, names[0]);
}

export function buildListFromArgs (...args) {
    if (!args) {
        return [];
    }
    let ret = [];
    args.forEach(arg => {
        if (Array.isArray(arg)) {
            arg.forEach(item => {
                ret.push(item);
            });
        }
        ret.push(arg);
    });
    return ret;
}

export const getValuesOnObject = obj => {
    if (!obj) {
        return [];
    }
    let ret = [];
    let keys = Object.keys(obj);
    keys.forEach(key => {
        ret.push(obj[key]);
    });
    return ret;
}