import fs from 'fs';

export function loadTestData(fileName: string): Record<string, unknown> {
    try {
        const data = fs.readFileSync(`data/${fileName}`, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Failed to load data file: ${fileName}\n${error}`);
    }
}

export function getRandomItem<T>(array: T[]): T {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error('Cannot select a random item from an empty array.');
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export function getRandomData(fileName: string, key: string): string {
    const data = loadTestData(fileName);
    const array = data[key];
    if (!Array.isArray(array)) {
        throw new Error(`Data key '${key}' is not an array.`);
    }
    // Tell TS this array is string[]
    return getRandomItem(array as string[]);
}

export function getData(fileName: string, key: string): string {
    const data = loadTestData(fileName);
    if (!(key in data)) {
        throw new Error(`Data key '${key}' not found in file: ${fileName}`);
    }
    return data[key] as string;
}
