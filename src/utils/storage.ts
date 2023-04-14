export type StorageGetItem = <T = any>(key: string) => Promise<T | null>;

export const storageGetItem: StorageGetItem = async (key) => {
    try {
        if (typeof window === 'undefined') return null;
        const str = localStorage.getItem(key);
        if (!str) return null;

        const parsedValue = JSON.parse(str);
        return parsedValue;
    } catch (error) {
        return null;
    }
}

export type StorageSetItem = <T = any>(key: string, value: T) => Promise<void> | void;

export const storageSetItem: StorageSetItem = async (key, value) => {
    try {
        if (typeof window === 'undefined') return;
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
    } catch (error) {
        return;
    }
}

export type StorageRemoveItem = <T = any>(key: string) => Promise<void>;

export const storageRemoveItem: StorageRemoveItem = async (key) => {
    try {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(key);
    } catch (error) {
        return;
    }
}