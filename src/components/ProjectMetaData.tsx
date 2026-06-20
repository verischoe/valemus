import React from 'react';
import { Tooltip } from 'antd';
import { Projekt } from '../types';

interface ProjectMetaProps {
  projekt: Projekt | undefined;
}

const ProjectMeta: React.FC<ProjectMetaProps> = ({ projekt }) => {
  if (!projekt) return null;

  return (
    <div className="project-meta-grid">
      <div className="meta-item">
        <span className="meta-label">Projektleitung</span>
        <input 
          type="text" 
          readOnly 
          value={projekt.projektleiter} 
          className="readonly-input" 
        />
      </div>
      <Tooltip title={projekt.beschreibung}>
        <div className="meta-item expansion">
          <span className="meta-label">Erweiterte Beschreibung</span>
          <input 
            readOnly 
            value={projekt.beschreibung} 
            className="readonly-textarea" 
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default ProjectMeta;