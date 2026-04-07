import React, { useContext, useState, useEffect } from 'react';
import { PetContext } from '../context/PetContext';
import { Clock, Plus, Trash2, Zap, Thermometer, Droplets, Save, Edit2, Check, X } from 'lucide-react';
import {
  Card, CardHeader, PageHeader, PillBtn, EmptyState,
  useToast, ToastContainer, Field, Input
} from '../components/ui';

const DietManager = () => {
  const { selectedPet, environment, updatePetDiet } = useContext(PetContext);
  const { toasts, toast } = useToast();
  const [localSchedule, setLocalSchedule] = useState([]);
  const [localBowlWeight, setLocalBowlWeight] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTime, setEditTime] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [dispensing, setDispensing] = useState(false);

  useEffect(() => {
    if (selectedPet?.diet) {
      setLocalSchedule([...(selectedPet.diet.schedule || [])]);
      setLocalBowlWeight(selectedPet.diet.bowlWeight?.toString() || '');
    }
  }, [selectedPet]);

  if (!selectedPet) return <EmptyState emoji="🐕" message="Select a pet to manage their diet" />;

  const totalDaily = localSchedule.reduce((s, i) => s + (parseInt(i.amount) || 0), 0);

  const addSchedule = () => {
    if (!newTime || !newAmount) { toast('Please fill in both time and amount', 'error'); return; }
    setLocalSchedule(prev => [...prev, { id: Date.now().toString(), time: newTime, amount: parseInt(newAmount) }].sort((a, b) => a.time.localeCompare(b.time)));
    setNewTime(''); setNewAmount('');
    toast('Feeding time added 🕐');
  };

  const deleteSchedule = (id) => { setLocalSchedule(prev => prev.filter(i => i.id !== id)); toast('Schedule removed'); };

  const startEdit = (item) => { setEditingId(item.id); setEditTime(item.time); setEditAmount(item.amount.toString()); };
  const saveEdit = () => {
    if (!editTime || !editAmount) return;
    setLocalSchedule(prev => prev.map(i => i.id === editingId ? { ...i, time: editTime, amount: parseInt(editAmount) } : i).sort((a, b) => a.time.localeCompare(b.time)));
    setEditingId(null); toast('Schedule updated ✓');
  };
  const cancelEdit = () => setEditingId(null);

  const manualFeed = async () => {
    setDispensing(true);
    await new Promise(r => setTimeout(r, 1200));
    setDispensing(false);
    toast(`🍖 Dispensed 50g for ${selectedPet.name}!`);
  };

  const saveAll = () => {
    updatePetDiet(selectedPet.id, {
      schedule: localSchedule,
      bowlWeight: parseInt(localBowlWeight) || selectedPet.diet?.bowlWeight || 0,
      lastUpdated: new Date().toISOString()
    });
    toast('All changes saved ✓');
  };

  const exportJSON = () => {
    const data = { petName: selectedPet.name, petId: selectedPet.id, diet: { ...selectedPet.diet, schedule: localSchedule, bowlWeight: parseInt(localBowlWeight) || 0 }, environment, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${selectedPet.name}_diet.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    toast('Exported to JSON 📄');
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
      <ToastContainer toasts={toasts} />

      <PageHeader
        title="Diet Manager"
        subtitle={`${selectedPet.name} · ${selectedPet.breed}`}
        action={
          <div style={{ display: 'flex', gap: 10 }}>
            <PillBtn onClick={exportJSON} variant="ghost" icon={<Save size={16} />}>Export JSON</PillBtn>
            <PillBtn onClick={saveAll} icon={<Check size={16} />}>Save Changes</PillBtn>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Feeder Status */}
        <Card style={{ animation: 'fadeUp 0.4s ease 0.05s both' }}>
          <CardHeader icon={<Zap size={18} />} title="Smart Feeder Status" color="#ca8398" />
          <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, padding: '12px 16px', background: '#f7edf0', borderRadius: 14 }}>
              <div style={{
                width: 12, height: 12, borderRadius: '50%', background: '#60a1b0',
                animation: 'pulse 2s ease-in-out infinite', boxShadow: '0 0 0 3px rgba(96,161,176,0.2)',
              }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#676354' }}>Feeder Online</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: '#60a1b0', background: '#e4f2f5', padding: '3px 10px', borderRadius: 20 }}>
                {selectedPet.diet?.status || 'Ready'}
              </span>
            </div>

            <Field label="Bowl Weight (current food level)">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Input
                  type="number" value={localBowlWeight}
                  onChange={e => setLocalBowlWeight(e.target.value)}
                  placeholder="grams" style={{ flex: 1 }}
                />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#9a958c' }}>g</span>
              </div>
            </Field>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 13 }}>
              <span style={{ color: '#9a958c' }}>Last Dispensed</span>
              <span style={{ fontWeight: 700, color: '#ca8398' }}>{selectedPet.diet?.lastFed || '—'}</span>
            </div>

            <button onClick={manualFeed} disabled={dispensing} style={{
              width: '100%', padding: '13px', borderRadius: 40, border: 'none',
              background: dispensing ? '#e8e5df' : 'linear-gradient(135deg, #ca8398, #b06d82)',
              color: dispensing ? '#9a958c' : 'white',
              fontWeight: 700, fontSize: 14, cursor: dispensing ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: dispensing ? 'none' : '0 4px 14px rgba(202,131,152,0.35)',
              fontFamily: "'Nunito', sans-serif",
            }}>
              {dispensing ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} /> Dispensing…</> : '🍖 Dispense Now'}
            </button>
          </div>
        </Card>

        {/* Environment Card */}
        <Card style={{ animation: 'fadeUp 0.4s ease 0.1s both' }}>
          <CardHeader icon={<Thermometer size={18} />} title="IoT Environment" color="#60a1b0" />
          <div style={{ padding: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <EnvBox icon="🌡️" label="Temperature" value={`${(environment?.temp || 24).toFixed(1)}°C`} color="#ca8398" />
              <EnvBox icon="💧" label="Humidity" value={`${(environment?.humidity || 60).toFixed(0)}%`} color="#60a1b0" />
              <EnvBox icon="🌬️" label="Air Quality" value={environment?.airQuality || 'Good'} color="#676354" />
              <EnvBox icon="🌿" label="THI Index" value={(environment?.thi || 72.5).toFixed(1)} color="#60a1b0" />
            </div>
            <div style={{ padding: '12px', background: 'linear-gradient(135deg, #e4f2f5, #d6eef3)', borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: '#3d7f8f', fontWeight: 700 }}>🌤️ Environment Status</div>
              <div style={{ fontSize: 13, color: '#676354', marginTop: 4 }}>
                Conditions are ideal for {selectedPet.name}. Keep water fresh!
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Feeding Schedule */}
      <Card style={{ animation: 'fadeUp 0.4s ease 0.15s both' }}>
        <CardHeader
          icon={<Clock size={18} />} title="Feeding Schedule"
          color="#676354"
          right={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: '#9a958c' }}>
                Daily total: <strong style={{ color: '#ca8398' }}>{totalDaily}g</strong>
              </span>
            </div>
          }
        />
        <div style={{ padding: 20 }}>
          {localSchedule.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#9a958c' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>⏰</div>
              <p style={{ margin: 0, fontWeight: 600 }}>No feeding schedules yet</p>
              <p style={{ margin: '6px 0 0', fontSize: 13 }}>Add a schedule below</p>
            </div>
          ) : (
            <div style={{ marginBottom: 20 }}>
              {localSchedule.map((item, idx) => (
                <div key={item.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 16px', borderRadius: 14, marginBottom: 8,
                  background: editingId === item.id ? '#f7edf0' : '#fdfcfb',
                  border: `1px solid ${editingId === item.id ? '#e8c5d0' : '#f0eeea'}`,
                  animation: `slideIn 0.25s ease ${idx * 0.04}s both`,
                  transition: 'all 0.2s',
                }}>
                  {editingId === item.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                      <input type="time" value={editTime} onChange={e => setEditTime(e.target.value)}
                        style={{ padding: '7px 10px', borderRadius: 10, border: '1.5px solid #e8e5df', fontSize: 14, fontFamily: "'Nunito', sans-serif" }} />
                      <input type="number" value={editAmount} onChange={e => setEditAmount(e.target.value)}
                        style={{ width: 80, padding: '7px 10px', borderRadius: 10, border: '1.5px solid #e8e5df', fontSize: 14, fontFamily: "'Nunito', sans-serif" }} placeholder="g" />
                      <span style={{ fontSize: 12, color: '#9a958c' }}>g</span>
                      <button onClick={saveEdit} style={{ background: '#60a1b0', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'white', display: 'flex' }}><Check size={14} /></button>
                      <button onClick={cancelEdit} style={{ background: '#eae8e2', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: '#676354', display: 'flex' }}><X size={14} /></button>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 18, background: '#f7edf0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Clock size={16} color="#ca8398" />
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 800, color: '#3a3728' }}>{item.time}</div>
                          <div style={{ fontSize: 12, color: '#9a958c' }}>
                            {item.time < '12:00' ? 'Morning feed' : item.time < '15:00' ? 'Afternoon feed' : 'Evening feed'}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ background: '#e4f2f5', color: '#60a1b0', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>{item.amount}g</span>
                        <button onClick={() => startEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9a958c', padding: 4, display: 'flex', borderRadius: 8, transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#60a1b0'} onMouseLeave={e => e.currentTarget.style.color = '#9a958c'}>
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => deleteSchedule(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9a958c', padding: 4, display: 'flex', borderRadius: 8, transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#ca8398'} onMouseLeave={e => e.currentTarget.style.color = '#9a958c'}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add new */}
          <div style={{ paddingTop: 16, borderTop: '1px solid #eae8e2' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#676354', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Plus size={16} color="#ca8398" /> Add Feeding Time
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 40, border: '1.5px solid #e8e5df', fontSize: 14, outline: 'none', fontFamily: "'Nunito', sans-serif", flex: '1 1 140px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: '1 1 120px' }}>
                <input type="number" value={newAmount} onChange={e => setNewAmount(e.target.value)}
                  placeholder="Amount (g)" style={{ flex: 1, padding: '10px 14px', borderRadius: 40, border: '1.5px solid #e8e5df', fontSize: 14, outline: 'none', fontFamily: "'Nunito', sans-serif" }} />
              </div>
              <PillBtn onClick={addSchedule} icon={<Plus size={16} />}>Add</PillBtn>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const EnvBox = ({ icon, label, value, color }) => (
  <div style={{ padding: '12px', background: '#f8f6f2', borderRadius: 14 }}>
    <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
    <div style={{ fontSize: 11, color: '#9a958c', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
    <div style={{ fontSize: 16, fontWeight: 800, color, marginTop: 2 }}>{value}</div>
  </div>
);

export default DietManager;