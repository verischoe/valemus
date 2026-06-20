import { Geldeinlage } from '../types';

const STORAGE_KEY = 'valemus_geldeinlagen';

export const storageService = {
    async getGeldeinlagen(): Promise<Geldeinlage[]> {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];

        try {
            return JSON.parse(stored) as Geldeinlage[];
        } catch (e) {
            console.error('Fehler beim Parsen der Geldeinlagen aus dem LocalStorage:', e);
            return [];
        }
    },

    async saveGeldeinlagen(geldeinlagen: Geldeinlage[]): Promise<boolean> {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            localStorage.setItem(STORAGE_KEY, JSON.stringify(geldeinlagen));
            return true;
        } catch (e) {
            console.error('Fehler beim Speichern der Geldeinlagen im LocalStorage:', e);
            return false;
        }
    },

    async clear(): Promise<boolean> {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (e) {
            console.error('Fehler beim Löschen der Geldeinlagen aus dem LocalStorage:', e);
            return false;
        }
    }
};