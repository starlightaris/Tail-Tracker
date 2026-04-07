import React, { useContext, useState } from 'react';
import { PetContext } from '../context/PetContext';
import { Clock, Plus, Trash2, Zap, Thermometer, Droplets } from 'lucide-react';

const DietManager = () => {
  const { selectedPet, environment } = useContext(PetContext);
  const [newTime, setNewTime] = useState("");
  const [newAmount, setNewAmount] = useState("");

  // Safety Check: If selectedPet is missing, show a simple message instead of crashing
  if (!selectedPet) {
    return <div style={{ padding: '20px' }}>Select a pet to view diet settings.</div>;
  }

  return (
    <div style={containerStyle}>
      <header style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Diet Controller: {selectedPet.name}</h2>
        <p style={{ color: '#666' }}>Feeder settings for {selectedPet.breed}</p>
      </header>

      <div style={gridStyle}>
        
        {/* SECTION 1: Feeder Status (Hardcoded UI from ManualFeed) */}
        <div style={cardStyle}>
          <div style={cardHeader}>
            <Zap size={18} color="#FFD700" />
            <h3 style={headerTextStyle}>Feeder Status</h3>
          </div>
          <div style={cardBody}>
            <div style={statRow}>
              <span>Bowl Weight:</span>
              <span style={{ fontWeight: 'bold' }}>{selectedPet.diet?.bowlWeight}g</span>
            </div>
            <div style={statRow}>
              <span>Last Dispensed:</span>
              <span>{selectedPet.diet?.lastFed}</span>
            </div>
            <div style={{ ...badgeStyle, backgroundColor: '#e9ecef' }}>
              {selectedPet.diet?.status}
            </div>
            <button style={manualBtnStyle} onClick={() => alert("Dispensing food...")}>
              🍖 Manual Feed Now
            </button>
          </div>
        </div>

        {/* SECTION 2: Environment (Hardcoded UI from ManualFeed) */}
        <div style={cardStyle}>
          <div style={cardHeader}>
            <Thermometer size={18} color="#FF4500" />
            <h3 style={headerTextStyle}>IoT Environment</h3>
          </div>
          <div style={cardBody}>
            <div style={statRow}>
              <span><Thermometer size={14} /> Temp:</span>
              <strong>{environment?.temp}°C</strong>
            </div>
            <div style={statRow}>
              <span><Droplets size={14} /> Humidity:</span>
              <strong>{environment?.humidity}%</strong>
            </div>
            <div style={statRow}>
              <span>THI Index:</span>
              <span style={{ color: '#007bff' }}>{environment?.thi}</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: Schedule Manager (Hardcoded UI from FeederSettings) */}
        <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
          <div style={cardHeader}>
            <Clock size={18} color="#007bff" />
            <h3 style={headerTextStyle}>Feeding Schedule</h3>
          </div>
          <div style={cardBody}>
            <div style={{ marginBottom: '20px' }}>
              {selectedPet.diet?.schedule?.map((s) => (
                <div key={s.id} style={scheduleItemStyle}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{s.time}</span>
                    <span style={{ color: '#666' }}>{s.amount}g</span>
                  </div>
                  <button style={deleteBtnStyle}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>

            <div style={formRowStyle}>
              <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} style={inputStyle} />
              <input type="number" placeholder="Grams" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} style={inputStyle} />
              <button style={addBtnStyle}><Plus size={18} /> Add Time</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Standardized Styles ---
const containerStyle = { padding: '20px', maxWidth: '1000px', margin: '0 auto' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' };
const cardStyle = { background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' };
const cardHeader = { padding: '12px 15px', background: '#f8f9fa', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px' };
const headerTextStyle = { margin: 0, fontSize: '1rem' };
const cardBody = { padding: '20px' };
const statRow = { display: 'flex', justifyContent: 'space-between', marginBottom: '12px' };
const badgeStyle = { padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '15px' };
const manualBtnStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: 'none', background: '#28a745', color: 'white', cursor: 'pointer' };
const scheduleItemStyle = { display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #f0f0f0' };
const deleteBtnStyle = { background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' };
const formRowStyle = { display: 'flex', gap: '10px' };
const inputStyle = { flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ddd' };
const addBtnStyle = { display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer' };

export default DietManager;