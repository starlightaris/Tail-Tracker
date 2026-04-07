import React, { useContext } from 'react';
import { PetContext } from '../context/PetContext';
import { ShieldCheck, Pill, Bell, CheckCircle } from 'lucide-react';

const Health = () => {
  const { selectedPet } = useContext(PetContext);

  // Hardcoded data mapped to Pet IDs
  const healthData = {
    1: [ // Buddy's Records
      { id: 101, type: "Vaccination", name: "Rabies", date: "2026-05-20", status: "Upcoming", icon: <ShieldCheck size={18} color="orange"/> },
      { id: 102, type: "Medication", name: "Deworming", date: "2026-03-01", status: "Completed", icon: <Pill size={18} color="green"/> }
    ],
    2: [ // Luna's Records
      { id: 201, type: "Vaccination", name: "Parvovirus", date: "2026-06-15", status: "Upcoming", icon: <ShieldCheck size={18} color="orange"/> }
    ]
  };

  const currentRecords = healthData[selectedPet.id] || [];

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <header style={{ marginBottom: '20px' }}>
        <h2>Health & Medical Tracker</h2>
        <p>Managing records for: <strong>{selectedPet.name}</strong></p>
      </header>

      <div style={cardContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <h3>Schedule</h3>
          <button style={addButton}>+ Add Log</button>
        </div>

        {currentRecords.length > 0 ? (
          <table style={tableStyle}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Treatment</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f4f4f4' }}>
                  <td style={tdStyle}>{item.icon} {item.type}</td>
                  <td style={tdStyle}>{item.name}</td>
                  <td style={tdStyle}>{item.date}</td>
                  <td style={tdStyle}>
                    <span style={statusBadge(item.status)}>
                      {item.status === 'Completed' ? <CheckCircle size={12} /> : <Bell size={12} />}
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No medical records found for this pet.</p>
        )}
      </div>
    </div>
  );
};

// --- Styles ---
const cardContainer = { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '10px' };
const thStyle = { textAlign: 'left', padding: '12px', color: '#666', fontSize: '0.9rem' };
const tdStyle = { padding: '12px', fontSize: '0.95rem', verticalAlign: 'middle' };
const addButton = { background: '#007bff', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' };

const statusBadge = (status) => ({
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '0.8rem',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  width: 'fit-content',
  backgroundColor: status === 'Upcoming' ? '#fff3cd' : '#d4edda',
  color: status === 'Upcoming' ? '#856404' : '#155724'
});

export default Health;