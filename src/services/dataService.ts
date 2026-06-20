import { Projekt, Kategorie, Geldeinlage } from '../types';
import mockProjekte from '../data/projekte.json';
import mockKategorien from '../data/kategorien.json';

export const dataService = {
  /**
   * Simuliert das asynchrone Laden und Sortieren der Projektdaten.
   */
  async getInitialData(): Promise<{ projekte: Projekt[]; kategorien: Kategorie[] }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const sortierteProjekte = [...mockProjekte].sort((a, b) => 
      a.name.localeCompare(b.name)
    );

    return {
      projekte: sortierteProjekte,
      kategorien: mockKategorien as Kategorie[]
    };
  }  
};