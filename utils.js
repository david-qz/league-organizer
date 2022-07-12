
/**
 * Sets a redirect to the auth page if the user doesn't exist.
 * @param {User} user
 * @returns {boolean} true if a redirect has been set, false otherwise.
 */
export function protectPage(user) {
    if (!user) {
        location.replace(getAuthRedirect());
        return true;
    }
    return false;
}

export function getAuthRedirect() {
    const redirectUrl = encodeURIComponent(location.href);
    return `/auth/?redirectUrl=${redirectUrl.toString()}`;
}

export function snakeToCamel(string) {
    return string.replace(/_(\w)/g, (match, capture) => {
        return capture.toUpperCase();
    });
}

export function snakeToCamelRecursive(object) {
    for (const [property, value] of Object.entries(object)) {
        if (value !== null && typeof value === 'object') {
            snakeToCamelRecursive(value);
        }

        const camelCaseProperty = snakeToCamel(property);
        delete object[property];
        object[camelCaseProperty] = value;
    }

    return object;
}
