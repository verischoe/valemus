import { Geldeinlage } from '../types';

export const geldeinlagenService = {
  async saveOrUpdate(
    einlage: Omit<Geldeinlage, 'projektId'> & { id?: string },
    aktuelleGeldeinlagen: Geldeinlage[],
    selectedProjektId: string
  ): Promise<Geldeinlage[]> {
    
    let neueGeldeinlagen: Geldeinlage[] = [];

    if (einlage.id) {
      // Logik für ein Update
      neueGeldeinlagen = aktuelleGeldeinlagen.map((g) => 
        g.id === einlage.id ? ({ ...g, ...einlage } as Geldeinlage) : g
      );
    } else {
      // Logik für eine Neuanlage
      const neueEinlage: Geldeinlage = {
        ...einlage,
        id: Math.random().toString(36).substring(2, 11),
        projektId: selectedProjektId,
      } as Geldeinlage;
      neueGeldeinlagen = [...aktuelleGeldeinlagen, neueEinlage];
    }

    return neueGeldeinlagen;
  }
};