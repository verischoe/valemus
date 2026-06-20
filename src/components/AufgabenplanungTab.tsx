import React from 'react';

interface AufgabenplanungTabProps {
  projectName?: string;
}

const AufgabenplanungTab: React.FC<AufgabenplanungTabProps> = ({ projectName }) => {
  return (
    <div className="aufgabenplanung-tab">
      <div className="placeholder-header">
        <h2>Aufgabenplanung für {projectName || 'Projekt'}</h2>
      </div>
      <div className="placeholder-content-box">
        <p className="lorem-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
  );
};

export default AufgabenplanungTab;
