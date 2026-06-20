import React, { useState, useEffect } from 'react';
import { Projekt, Kategorie, Geldeinlage, AppTab } from './types';
import FinanzierungTab from './components/FinanzierungTab';
import AufgabenplanungTab from './components/AufgabenplanungTab';
import { Tabs, Spin } from 'antd';
import './App.css';
import { storageService } from './services/storageService';
import { dataService } from './services/dataService';
import ProjectMeta from './components/ProjectMetaData';
import { geldeinlagenService } from './services/geldEinlagenService';

function App() {
  const [projekte, setProjekte] = useState<Projekt[]>([]);
  const [kategorien, setKategorien] = useState<Kategorie[]>([]);
  const [selectedProjektId, setSelectedProjektId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Finanzierung);
  const [geldeinlagen, setGeldeinlagen] = useState<Geldeinlage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    setLoading(true);
    setGeldeinlagen(await storageService.getGeldeinlagen());  
   
    const { projekte, kategorien } = await dataService.getInitialData();
    setProjekte(projekte);
    setKategorien(kategorien);

    if (projekte.length > 0) {
      setSelectedProjektId(projekte[0].id);
    }
    setLoading(false);
  };

  const handleSaveGeldeinlage = async (einlage: Omit<Geldeinlage, 'projektId'> & { id?: string }) => {
    const neueGeldeinlagen = await geldeinlagenService.saveOrUpdate(einlage, geldeinlagen, selectedProjektId);
    setGeldeinlagen(neueGeldeinlagen);
    await storageService.saveGeldeinlagen(neueGeldeinlagen);
  };

  const selectedProjekt = projekte.find((p) => p.id === selectedProjektId);

  const tabItems = [
    {
      key: AppTab.Finanzierung,
      label: 'Finanzierung',
      children: <FinanzierungTab
        kategorien={kategorien}
        geldeinlagen={geldeinlagen.filter((g) => g.projektId === selectedProjektId)}
        onSave={handleSaveGeldeinlage} />,
    },
    {
      key: AppTab.Aufgabenplanung,
      label: 'Aufgabenplanung',
      children: <AufgabenplanungTab projectName={selectedProjekt?.name} />,
    },
  ];

  if (loading) {
    return (
      <div className='spinner-container'>
        <Spin size="large" description="Projektdaten werden geladen..." />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="menu-bar">
        <div className="logo-section"><h1>Valemus Assessment</h1></div>
      </header>
      <section className="project-selection-bar">
        <div className="select-box-container">
          <label htmlFor="project-select" className="field-label">Ausgewähltes Projekt</label>
          <div className="custom-select-wrapper">
            <select
              id="project-select"
              value={selectedProjektId}
              onChange={(e) => setSelectedProjektId(e.target.value)}
              className="styled-select">
              {projekte.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>
        {<ProjectMeta projekt={selectedProjekt} />}
      </section>
      <main className="main-content">
        <div className='main-content-area'>
          <Tabs
            type="card"
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key as AppTab)}
            items={tabItems}
          />
        </div>
      </main>
    </div>
  );
}
export default App;