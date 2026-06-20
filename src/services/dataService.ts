import { Projekt, Kategorie, Geldeinlage } from '../types';
import mockData from '../data.json';

export const dataService = {
  /**
   * Simuliert das asynchrone Laden und Sortieren der Projektdaten.
   */
  async getInitialData(): Promise<{ projekte: Projekt[]; kategorien: Kategorie[] }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const sortierteProjekte = [...mockData.projekte].sort((a, b) => 
      a.name.localeCompare(b.name)
    );

    return {
      projekte: sortierteProjekte,
      kategorien: mockData.kategorien as Kategorie[]
    };
  }  
};