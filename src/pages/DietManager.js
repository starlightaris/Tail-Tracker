// DietManager.js
import React, { useContext, useState, useEffect } from 'react';
import { PetContext } from '../context/PetContext';
import { Clock, Plus, Trash2, Zap, Thermometer, Droplets, Save, Edit2, Check, X } from 'lucide-react';

const DietManager = () => {
  const { selectedPet, environment, updatePetDiet } = useContext(PetContext);
  const [newTime, setNewTime] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTime, setEditTime] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [localSchedule, setLocalSchedule] = useState([]);
  const [localBowlWeight, setLocalBowlWeight] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Load local state from selectedPet when pet changes
  useEffect(() => {
    if (selectedPet && selectedPet.diet) {
      setLocalSchedule([...(selectedPet.diet.schedule || [])]);
      setLocalBowlWeight(selectedPet.diet.bowlWeight?.toString() || "");
    }
  }, [selectedPet]);

  if (!selectedPet) {
    return (
      <div style={styles.emptyState}>
        <span style={styles.emptyEmoji}>🐕</span>
        <p>Select a pet to view diet settings</p>
      </div>
    );
  }

  // CRUD Operations
  const addSchedule = () => {
    if (!newTime || !newAmount) {
      setSaveMessage("Please fill in both time and amount");
      setTimeout(() => setSaveMessage(""), 2000);
      return;
    }
    const newId = Date.now().toString();
    const newEntry = {
      id: newId,
      time: newTime,
      amount: parseInt(newAmount)
    };
    setLocalSchedule([...localSchedule, newEntry]);
    setNewTime("");
    setNewAmount("");
    setSaveMessage("Schedule added ✓");
    setTimeout(() => setSaveMessage(""), 1500);
  };

  const deleteSchedule = (id) => {
    setLocalSchedule(localSchedule.filter(item => item.id !== id));
    setSaveMessage("Schedule removed ✓");
    setTimeout(() => setSaveMessage(""), 1500);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditTime(item.time);
    setEditAmount(item.amount.toString());
  };

  const saveEdit = () => {
    if (!editTime || !editAmount) return;
    setLocalSchedule(localSchedule.map(item =>
      item.id === editingId
        ? { ...item, time: editTime, amount: parseInt(editAmount) }
        : item
    ));
    setEditingId(null);
    setEditTime("");
    setEditAmount("");
    setSaveMessage("Schedule updated ✓");
    setTimeout(() => setSaveMessage(""), 1500);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTime("");
    setEditAmount("");
  };

  const manualFeed = () => {
    const amount = 50; // Default manual feed amount
    alert(`🍖 Dispensing ${amount}g of food for ${selectedPet.name}!`);
    setSaveMessage(`Dispensed ${amount}g ✓`);
    setTimeout(() => setSaveMessage(""), 1500);
  };

  const saveToJson = async () => {
    setIsSaving(true);
    const updatedDiet = {
      ...selectedPet.diet,
      schedule: localSchedule,
      bowlWeight: parseInt(localBowlWeight) || selectedPet.diet?.bowlWeight || 0,
      lastUpdated: new Date().toISOString()
    };
    
    // Update context
    updatePetDiet(selectedPet.id, updatedDiet);
    
    // Create JSON file for download
    const dietData = {
      petName: selectedPet.name,
      petId: selectedPet.id,
      diet: updatedDiet,
      environment: environment,
      exportedAt: new Date().toISOString()
    };
    
    const jsonStr = JSON.stringify(dietData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedPet.name}_diet_config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsSaving(false);
    setSaveMessage("Saved to JSON! ✓");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Diet Controller</h1>
          <p style={styles.subtitle}>{selectedPet.name} • {selectedPet.breed}</p>
        </div>
        <button onClick={saveToJson} style={styles.saveJsonBtn} disabled={isSaving}>
          <Save size={18} />
          {isSaving ? "Saving..." : "Export JSON"}
        </button>
      </header>

      {saveMessage && (
        <div style={styles.toastMessage}>
          {saveMessage}
        </div>
      )}

      <div style={styles.grid}>
        {/* Feeder Status Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Zap size={20} color="#ca8398" />
            <h3 style={styles.cardTitle}>Feeder Status</h3>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.statRow}>
              <span>Bowl Weight:</span>
              <input
                type="number"
                value={localBowlWeight}
                onChange={(e) => setLocalBowlWeight(e.target.value)}
                style={styles.smallInput}
                placeholder="grams"
              />
              <span style={styles.unit}>g</span>
            </div>
            <div style={styles.statRow}>
              <span>Last Dispensed:</span>
              <span style={styles.statValue}>{selectedPet.diet?.lastFed || "—"}</span>
            </div>
            <div style={styles.statRow}>
              <span>Status:</span>
              <span style={styles.badge}>
                {selectedPet.diet?.status || "Ready"}
              </span>
            </div>
            <button onClick={manualFeed} style={styles.manualBtn}>
              🍖 Manual Feed Now
            </button>
          </div>
        </div>

        {/* Environment Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Thermometer size={20} color="#60a1b0" />
            <h3 style={styles.cardTitle}>IoT Environment</h3>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.statRow}>
              <span><Thermometer size={14} /> Temp:</span>
              <strong>{environment?.temp || "--"}°C</strong>
            </div>
            <div style={styles.statRow}>
              <span><Droplets size={14} /> Humidity:</span>
              <strong>{environment?.humidity || "--"}%</strong>
            </div>
            <div style={styles.statRow}>
              <span>THI Index:</span>
              <span style={{ color: "#ca8398", fontWeight: 600 }}>{environment?.thi || "--"}</span>
            </div>
          </div>
        </div>

        {/* Feeding Schedule Card - Full Width */}
        <div style={{ ...styles.card, gridColumn: 'span 2' }}>
          <div style={styles.cardHeader}>
            <Clock size={20} color="#676354" />
            <h3 style={styles.cardTitle}>Feeding Schedule</h3>
          </div>
          <div style={styles.cardBody}>
            {localSchedule.length === 0 ? (
              <div style={styles.emptySchedule}>
                <p>No feeding schedules added yet.</p>
                <p style={{ fontSize: '13px', color: '#9a958c' }}>Add a schedule below</p>
              </div>
            ) : (
              <div style={styles.scheduleList}>
                {localSchedule.map((item) => (
                  <div key={item.id} style={styles.scheduleItem}>
                    {editingId === item.id ? (
                      <div style={styles.editContainer}>
                        <input
                          type="time"
                          value={editTime}
                          onChange={(e) => setEditTime(e.target.value)}
                          style={styles.editInput}
                        />
                        <input
                          type="number"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          style={{ ...styles.editInput, width: '80px' }}
                          placeholder="g"
                        />
                        <span style={styles.unit}>g</span>
                        <button onClick={saveEdit} style={styles.editSaveBtn}>
                          <Check size={16} />
                        </button>
                        <button onClick={cancelEdit} style={styles.editCancelBtn}>
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div style={styles.scheduleInfo}>
                          <span style={styles.scheduleTime}>{item.time}</span>
                          <span style={styles.scheduleAmount}>{item.amount}g</span>
                        </div>
                        <div style={styles.scheduleActions}>
                          <button onClick={() => startEdit(item)} style={styles.editBtn}>
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deleteSchedule(item.id)} style={styles.deleteBtn}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div style={styles.addSection}>
              <h4 style={styles.addTitle}>Add New Schedule</h4>
              <div style={styles.formRow}>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  style={styles.input}
                />
                <input
                  type="number"
                  placeholder="Amount (grams)"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  style={styles.input}
                />
                <button onClick={addSchedule} style={styles.addBtn}>
                  <Plus size={18} /> Add Schedule
                </button>
              </div>
            </div>

            <div style={styles.totalSection}>
              <span>Total Daily Food: </span>
              <strong style={{ color: "#ca8398" }}>
                {localSchedule.reduce((sum, item) => sum + item.amount, 0)}g
              </strong>
              <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#9a958c' }}>
                {localSchedule.length} scheduled feeding(s)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '28px 32px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100%',
  },
  emptyState: {
    padding: '60px 20px',
    textAlign: 'center',
    color: '#9a958c',
  },
  emptyEmoji: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#676354',
    margin: 0,
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#9a958c',
    margin: '6px 0 0 0',
  },
  saveJsonBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#60a1b0',
    border: 'none',
    borderRadius: '40px',
    color: 'white',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
  },
  toastMessage: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    backgroundColor: '#676354',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '40px',
    fontSize: '14px',
    zIndex: 1000,
    animation: 'fadeInOut 2s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    border: '1px solid #eae8e4',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: '16px 20px',
    backgroundColor: '#faf9f7',
    borderBottom: '1px solid #eae8e4',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#676354',
  },
  cardBody: {
    padding: '20px',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
    fontSize: '14px',
    color: '#676354',
  },
  statValue: {
    fontWeight: '600',
    color: '#ca8398',
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: '#e8f0f2',
    color: '#60a1b0',
  },
  smallInput: {
    width: '80px',
    padding: '6px 10px',
    borderRadius: '8px',
    border: '1px solid #dadbd5',
    fontSize: '14px',
    textAlign: 'center',
  },
  unit: {
    fontSize: '12px',
    color: '#9a958c',
    marginLeft: '4px',
  },
  manualBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ca8398',
    border: 'none',
    borderRadius: '40px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '8px',
    transition: 'background 0.2s',
  },
  scheduleList: {
    marginBottom: '20px',
    maxHeight: '280px',
    overflowY: 'auto',
  },
  scheduleItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f0eeea',
  },
  scheduleInfo: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  scheduleTime: {
    fontWeight: '600',
    fontSize: '15px',
    color: '#676354',
    minWidth: '70px',
  },
  scheduleAmount: {
    color: '#ca8398',
    fontWeight: '500',
  },
  scheduleActions: {
    display: 'flex',
    gap: '12px',
  },
  editBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#60a1b0',
    padding: '4px',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#ca8398',
    padding: '4px',
  },
  editContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
  },
  editInput: {
    padding: '6px 10px',
    borderRadius: '8px',
    border: '1px solid #dadbd5',
    fontSize: '14px',
  },
  editSaveBtn: {
    background: '#60a1b0',
    border: 'none',
    borderRadius: '6px',
    padding: '6px',
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  editCancelBtn: {
    background: '#dadbd5',
    border: 'none',
    borderRadius: '6px',
    padding: '6px',
    cursor: 'pointer',
    color: '#676354',
    display: 'flex',
    alignItems: 'center',
  },
  emptySchedule: {
    textAlign: 'center',
    padding: '30px',
    color: '#9a958c',
  },
  addSection: {
    marginTop: '20px',
    paddingTop: '16px',
    borderTop: '1px solid #eae8e4',
  },
  addTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#676354',
    margin: '0 0 12px 0',
  },
  formRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '40px',
    border: '1px solid #dadbd5',
    fontSize: '14px',
    outline: 'none',
    transition: 'border 0.2s',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 20px',
    backgroundColor: '#676354',
    border: 'none',
    borderRadius: '40px',
    color: 'white',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '14px',
  },
  totalSection: {
    marginTop: '20px',
    paddingTop: '16px',
    borderTop: '1px solid #eae8e4',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#676354',
  },
};

// Add animation styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(20px); }
    15% { opacity: 1; transform: translateY(0); }
    85% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(20px); }
  }
`;
document.head.appendChild(styleSheet);

export default DietManager;