export function getChunckedData<T>(data: T[]): T[][] {
    return data.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / 3);
        result[chunkIndex] = (result[chunkIndex] || []) as T[];
        result[chunkIndex].push(item);
        return result;
    }, [] as T[][]);
}