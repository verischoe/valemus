import React, { useState } from 'react';
import { Table, Button, Tag, Tooltip } from 'antd'; 
import { EditOutlined, PlusOutlined, MessageOutlined } from '@ant-design/icons';
import { Geldeinlage, Kategorie } from '../types';
import GeldeinlageModal from './GeldeinlageModal';
import { formatDateToDDMMYYYY } from '../helpers/dateFormatter';

interface FinanzierungTabProps {
  kategorien: Kategorie[];
  geldeinlagen: Geldeinlage[];
  onSave: (einlage: any) => Promise<void>;
}

const FinanzierungTab: React.FC<FinanzierungTabProps> = ({ kategorien, geldeinlagen, onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEinlage, setSelectedEinlage] = useState<Geldeinlage | undefined>(undefined);

  const columns = [
    {
      title: '#',
      render: (_: any, __: any, index: number) => index + 1,
      width: 60,
    },
    {
      title: 'Datum',
      dataIndex: 'datum',
      key: 'datum',
      render: (dateStr: string) => formatDateToDDMMYYYY(dateStr),
    },
    {
      title: 'Bezeichnung',
      dataIndex: 'bezeichnung',
      key: 'bezeichnung',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Kategorie',
      dataIndex: 'kategorieId',
      key: 'kategorieId',
      render: (katId: string) => {
        const kat = kategorien.find(k => k.id === katId);
        return <Tag color="blue">{kat ? kat.name : 'Unbekannt'}</Tag>;
      },
    },
    {
      title: 'Betrag',
      dataIndex: 'betrag',
      key: 'betrag',
      render: (val: number) => <span>{val.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>,
    },
    {
      title: 'Geldgeber',
      dataIndex: 'geldgeber',
      key: 'geldgeber',
    },
    {
      title: 'Notizen',
      dataIndex: 'notizen',
      key: 'notizen',
      align: 'center' as const,
      render: (text: string) => text?.trim() ? (
        <Tooltip title={text}>
          <MessageOutlined style={{ cursor: 'pointer' }} />
        </Tooltip>
      ) : <span style={{ color: '#bfbfbf' }}>—</span>,
    },
    {
      title: 'Aktionen',
      key: 'actions',
      align: 'center' as const,
      render: (_: any, record: Geldeinlage) => (
        <Button 
          type="text" 
          icon={<EditOutlined />} 
          onClick={() => { setSelectedEinlage(record); setIsModalOpen(true); }}
        >
          Bearbeiten
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Erfasste Geldeinlagen</h3>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => { setSelectedEinlage(undefined); setIsModalOpen(true); }}
        >
          Neue Geldeinlage erfassen
        </Button>
      </div>

      <Table 
        dataSource={geldeinlagen} 
        columns={columns} 
        rowKey="id" 
        pagination={false}
        locale={{ emptyText: 'Keine Geldeinlagen für dieses Projekt erfasst.' }}
      />

      {isModalOpen && <GeldeinlageModal kategorien={kategorien} einlage={selectedEinlage} onClose={() => setIsModalOpen(false)} onSave={onSave} />}
    </div>
  );
};

export default FinanzierungTab;