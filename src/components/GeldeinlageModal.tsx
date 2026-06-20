import React, { useState, useEffect } from 'react';
import { Kategorie, Geldeinlage } from '../types';

interface GeldeinlageModalProps {
  kategorien: Kategorie[];
  einlage?: Geldeinlage;
  onClose: () => void;
  onSave: (einlage: any) => Promise<void>;
}

const GeldeinlageModal: React.FC<GeldeinlageModalProps> = ({ kategorien, einlage, onClose, onSave }) => {
  const [bezeichnung, setBezeichnung] = useState('');
  const [kategorieId, setKategorieId] = useState('');
  const [datum, setDatum] = useState('');
  const [geldgeber, setGeldgeber] = useState('');
  const [betrag, setBetrag] = useState('');
  const [notizen, setNotizen] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (einlage) {
      setBezeichnung(einlage.bezeichnung);
      setKategorieId(einlage.kategorieId);
      setDatum(einlage.datum);
      setGeldgeber(einlage.geldgeber);
      setBetrag(einlage.betrag.toString().replace('.', ','));
      setNotizen(einlage.notizen);
    } else {
      setDatum(new Date().toISOString().split('T')[0]);
    }
  }, [einlage]);

  const handleCancel = () => {
    if (window.confirm('Möchten Sie die Erfassung tatsächlich verwerfen?')) {
      onClose();
    }
  };

  const handleSave = async () => {
    const validationErrors: string[] = [];
    if (!bezeichnung.trim()) validationErrors.push('Bezeichnung fehlt');
    if (!kategorieId) validationErrors.push('Kategorie fehlt');
    if (!datum) validationErrors.push('Datum fehlt');
    if (!geldgeber.trim()) validationErrors.push('Geldgeber fehlt');
    
    const parsedBetrag = parseFloat(betrag.replace(',', '.'));
    if (isNaN(parsedBetrag) || parsedBetrag <= 0) {
      validationErrors.push('Betrag muss eine Zahl größer als 0 sein');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    await onSave({
      id: einlage?.id,
      bezeichnung: bezeichnung.trim(),
      kategorieId,
      datum,
      geldgeber: geldgeber.trim(),
      betrag: parsedBetrag,
      notizen: notizen.trim()
    });
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="modal-backdrop animate-fade-in">
      <div className="modal-content-modern animate-slide-up">
        <div className="modal-modern-header">
          <h2>{einlage ? 'Finanzierung bearbeiten' : 'Neue Geldeinlage erfassen'}</h2>
          <button className="modal-close-x" onClick={handleCancel}>&times;</button>
        </div>
        
        {errors.length > 0 && (
          <div className="error-banner-modern">
            <div className="error-banner-text">
              <strong>Fehler beim Speichern:</strong>
              <ul>{errors.map((err, i) => <li key={i}>{err}</li>)}</ul>
            </div>
          </div>
        )}

        <div className="modal-form-grid">
          <div className="form-field-modern"><label>Bezeichnung *</label><input type="text" value={bezeichnung} onChange={(e) => setBezeichnung(e.target.value)} /></div>
          <div className="form-field-modern"><label>Kategorie *</label><select value={kategorieId} onChange={(e) => setKategorieId(e.target.value)}><option value="">-- Bitte wählen --</option>{kategorien.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}</select></div>
          <div className="form-field-modern"><label>Datum *</label><input type="date" value={datum} onChange={(e) => setDatum(e.target.value)} /></div>
          <div className="form-field-modern"><label>Geldgeber *</label><input type="text" value={geldgeber} onChange={(e) => setGeldgeber(e.target.value)} /></div>
          <div className="form-field-modern"><label>Betrag (€) *</label><input type="number" value={betrag} onChange={(e) => setBetrag(e.target.value)} /></div>
          <div className="form-field-modern"><label>Zusätzliche Notizen</label><textarea rows={3} value={notizen} onChange={(e) => setNotizen(e.target.value)} /></div>
        </div>
        <div className="modal-modern-footer">
          <button className="btn-modern-cancel" onClick={handleCancel} disabled={isSaving}>Abbrechen</button>
          <button className="btn-modern-save" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Speichert...' : 'Speichern'}</button>
        </div>
      </div>
    </div>
  );
};

export default GeldeinlageModal;
