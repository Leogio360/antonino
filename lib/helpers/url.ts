export const setUrlParam = (url: URL, key: string, value: string): boolean => {
    let hasChanges = false;
    const current = url.searchParams.get(key) || '';

    if (value !== current) {
        if (value) {
            url.searchParams.set(key, value);
        } else {
            url.searchParams.delete(key);
        }
        hasChanges = true;
    }

    return hasChanges;
};
