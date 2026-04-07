import React, { useContext, useState } from 'react';
import { PetContext } from '../context/PetContext';
import {
  PawPrint, Cake, Ruler, Heart, Syringe, Activity,
  MapPin, Moon, Plus, X, Save, Trash2, Calendar, Thermometer, Edit2
} from 'lucide-react';
import {
  Card, CardHeader, PageHeader, PillBtn, Modal,
  Field, Input, Textarea, useToast, ToastContainer,
  EmptyState, MiniBarChart, Badge
} from '../components/ui';

const PetProfile = () => {
  const { selectedPet, allPets, setSelectedPet, addPet, removePet, environment, healthRecords } = useContext(PetContext);
  const { toasts, toast } = useToast();
  const [showAdd, setShowAdd] = useState(false);
  const [newPet, setNewPet] = useState({ name: '', breed: '', age: '', weight: '', bio: '' });
  const upd = f => e => setNewPet(prev => ({ ...prev, [f]: e.target.value }));

  const activityData = [
    { label: 'Mon', value: 47 }, { label: 'Tue', value: 52 }, { label: 'Wed', value: 49 },
    { label: 'Thu', value: 58 }, { label: 'Fri', value: 65 },
  ];

  const handleAdd = () => {
    if (!newPet.name || !newPet.breed) { toast('Name and breed are required', 'error'); return; }
    const pet = addPet({ ...newPet, age: parseInt(newPet.age) || 0, weight: newPet.weight ? `${newPet.weight}kg` : '0kg' });
    setSelectedPet(pet);
    setNewPet({ name: '', breed: '', age: '', weight: '', bio: '' });
    setShowAdd(false);
    toast(`${newPet.name} added! 🐾`);
  };

  const handleRemove = (pet) => {
    if (!window.confirm(`Remove ${pet.name}?`)) return;
    removePet(pet.id);
    toast(`${pet.name} removed`);
  };

  const getActivityBadge = () => {
    const avg = activityData.reduce((s, d) => s + d.value, 0) / activityData.length;
    if (avg > 60) return { label: '⚡ Very Active', color: '#60a1b0' };
    if (avg > 45) return { label: '🐾 Active', color: '#ca8398' };
    return { label: '😴 Moderate', color: '#676354' };
  };

  if (!selectedPet) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
        <EmptyState emoji="🐾" message="No pet selected" sub="Add your first pet to get started" />
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <PillBtn onClick={() => setShowAdd(true)} icon={<Plus size={16} />}>Add Your First Pet</PillBtn>
        </div>
        <Modal open={showAdd} onClose={() => setShowAdd(false)} title="🐾 Add New Pet"
          footer={<><PillBtn variant="ghost" onClick={() => setShowAdd(false)}>Cancel</PillBtn><PillBtn onClick={handleAdd}>Save Pet</PillBtn></>}
        ><AddPetForm newPet={newPet} upd={upd} /></Modal>
      </div>
    );
  }

  const badge = getActivityBadge();
  const petRecords = healthRecords[selectedPet.id] || [];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
      <ToastContainer toasts={toasts} />

      <PageHeader
        title="Pet Profiles"
        subtitle="Manage your furry family"
        action={<PillBtn onClick={() => setShowAdd(true)} icon={<Plus size={16} />}>Add Pet</PillBtn>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
        {/* Pet List */}
        <div>
          <Card style={{ animation: 'fadeUp 0.4s ease 0.05s both' }}>
            <CardHeader icon={<PawPrint size={18} />} title="Your Pets" color="#ca8398" />
            <div style={{ padding: '10px 14px 14px' }}>
              {allPets.map((pet, i) => (
                <button key={pet.id} onClick={() => setSelectedPet(pet)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  borderRadius: 14, border: 'none', cursor: 'pointer', width: '100%',
                  background: selectedPet.id === pet.id ? 'linear-gradient(135deg, #f7edf0, #fce9ef)' : 'transparent',
                  transition: 'all 0.2s', marginBottom: 4, textAlign: 'left',
                  boxShadow: selectedPet.id === pet.id ? '0 2px 8px rgba(202,131,152,0.15)' : 'none',
                  animation: `slideIn 0.25s ease ${i * 0.06}s both`,
                  fontFamily: "'Nunito', sans-serif",
                }}
                  onMouseEnter={e => { if (selectedPet.id !== pet.id) e.currentTarget.style.background = '#f8f6f2'; }}
                  onMouseLeave={e => { if (selectedPet.id !== pet.id) e.currentTarget.style.background = 'transparent'; }}
                >
                  <img src={pet.img} alt={pet.name} style={{
                    width: 40, height: 40, borderRadius: 20, objectFit: 'cover',
                    border: selectedPet.id === pet.id ? '2px solid #ca8398' : '2px solid transparent',
                    transition: 'border-color 0.2s', flexShrink: 0,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: selectedPet.id === pet.id ? '#ca8398' : '#3a3728' }}>{pet.name}</div>
                    <div style={{ fontSize: 11, color: '#9a958c', marginTop: 1 }}>{pet.breed}</div>
                  </div>
                  {selectedPet.id === pet.id && <span style={{ fontSize: 14 }}>🐾</span>}
                  {allPets.length > 1 && (
                    <button onClick={e => { e.stopPropagation(); handleRemove(pet); }} style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#dadbd5',
                      display: 'flex', borderRadius: 6, transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ca8398'}
                      onMouseLeave={e => e.currentTarget.style.color = '#dadbd5'}
                    ><X size={14} /></button>
                  )}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Profile Detail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Hero Card */}
          <Card style={{ animation: 'fadeUp 0.4s ease 0.1s both' }}>
            <div style={{
              background: 'linear-gradient(135deg, #ca8398 0%, #a5637a 60%, #60a1b0 100%)',
              padding: '24px 28px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', right: 40, top: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, position: 'relative', zIndex: 1 }}>
                <div style={{ position: 'relative' }}>
                  <img src={selectedPet.img} alt={selectedPet.name} style={{
                    width: 90, height: 90, borderRadius: 45, objectFit: 'cover',
                    border: '4px solid rgba(255,255,255,0.7)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                    animation: 'float 4s ease-in-out infinite',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    background: badge.color, border: '2px solid white',
                    borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 700, color: 'white', whiteSpace: 'nowrap',
                  }}>{badge.label}</div>
                </div>
                <div>
                  <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, color: 'white' }}>{selectedPet.name}</h2>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                    {[
                      `🐕 ${selectedPet.breed}`,
                      `🎂 ${selectedPet.age}y`,
                      `⚖️ ${selectedPet.weight}`,
                    ].map((t, i) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: '20px 28px' }}>
              {selectedPet.bio && <p style={{ margin: '0 0 16px', fontSize: 14, color: '#676354', lineHeight: 1.6 }}>{selectedPet.bio}</p>}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[
                  { icon: <Heart size={18} color="#ca8398" />, label: 'Heart Rate', value: `${selectedPet.vitals?.heartRate || 85} bpm` },
                  { icon: <Activity size={18} color="#60a1b0" />, label: 'Steps', value: (selectedPet.activity?.steps || 2843).toLocaleString() },
                  { icon: <Moon size={18} color="#676354" />, label: 'Sleep', value: `${selectedPet.activity?.sleepHours || 7.2}h` },
                  { icon: <Thermometer size={18} color="#ca8398" />, label: 'Room Temp', value: `${(environment?.temp || 24).toFixed(1)}°C` },
                ].map(({ icon, label, value }, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '12px 8px', background: '#f8f6f2', borderRadius: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#3a3728' }}>{value}</div>
                    <div style={{ fontSize: 11, color: '#9a958c', marginTop: 2, fontWeight: 600 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Bottom Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            {/* Medical */}
            <Card style={{ animation: 'fadeUp 0.4s ease 0.2s both' }}>
              <CardHeader icon={<Syringe size={18} />} title="Medical" color="#ca8398" />
              <div style={{ padding: '16px 18px' }}>
                {[
                  { icon: '💉', label: 'Next Vaccination', value: fmtDate(selectedPet.medical?.nextVaccination) },
                  { icon: '🩺', label: 'Last Checkup', value: fmtDate(selectedPet.medical?.lastCheckup) },
                  { icon: '✅', label: 'Status', value: selectedPet.medical?.vaccinationStatus || 'Unknown', color: '#60a1b0' },
                ].map(({ icon, label, value, color }, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: '#9a958c', fontWeight: 600, marginBottom: 3 }}>{icon} {label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: color || '#3a3728' }}>{value}</div>
                  </div>
                ))}
                <div style={{ paddingTop: 10, borderTop: '1px solid #f0eeea' }}>
                  <div style={{ fontSize: 12, color: '#9a958c', marginBottom: 4 }}>Total Records</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#ca8398' }}>{petRecords.length}</div>
                </div>
              </div>
            </Card>

            {/* Diet */}
            <Card style={{ animation: 'fadeUp 0.4s ease 0.25s both' }}>
              <CardHeader icon={<PawPrint size={18} />} title="Diet Summary" color="#60a1b0" />
              <div style={{ padding: '16px 18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                  {[
                    { label: 'Meals/Day', value: selectedPet.diet?.schedule?.length || 2, color: '#ca8398' },
                    { label: 'Bowl Weight', value: `${selectedPet.diet?.bowlWeight || 100}g`, color: '#60a1b0' },
                  ].map(({ label, value, color }, i) => (
                    <div key={i} style={{ textAlign: 'center', padding: '10px', background: `${color}12`, borderRadius: 12 }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color }}>{value}</div>
                      <div style={{ fontSize: 10, color: '#9a958c', marginTop: 2, fontWeight: 600 }}>{label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#f5f4f0', borderRadius: 12, padding: '10px' }}>
                  <div style={{ fontSize: 11, color: '#9a958c', fontWeight: 600, marginBottom: 6 }}>SCHEDULE</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(selectedPet.diet?.schedule || []).map((s, i) => (
                      <span key={i} style={{ background: '#e4f2f5', color: '#60a1b0', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>🕐 {s.time}</span>
                    ))}
                    {(!selectedPet.diet?.schedule || selectedPet.diet.schedule.length === 0) && (
                      <span style={{ fontSize: 12, color: '#9a958c' }}>No schedule</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Activity */}
            <Card style={{ animation: 'fadeUp 0.4s ease 0.3s both' }}>
              <CardHeader icon={<Activity size={18} />} title="Activity" color="#676354" />
              <div style={{ padding: '16px 18px' }}>
                <MiniBarChart data={activityData} color="#676354" height={80} />
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: '8px', background: '#f8f6f2', borderRadius: 10 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#676354' }}>{selectedPet.activity?.steps?.toLocaleString() || '2,843'}</div>
                    <div style={{ fontSize: 10, color: '#9a958c', fontWeight: 600 }}>steps</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '8px', background: '#f8f6f2', borderRadius: 10 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#676354' }}>{selectedPet.activity?.activeMinutes || 47}</div>
                    <div style={{ fontSize: 10, color: '#9a958c', fontWeight: 600 }}>min active</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Pet Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="🐾 Register New Pet"
        footer={<><PillBtn variant="ghost" onClick={() => setShowAdd(false)}>Cancel</PillBtn><PillBtn onClick={handleAdd} icon={<Save size={16} />}>Save Pet</PillBtn></>}
      >
        <AddPetForm newPet={newPet} upd={upd} />
      </Modal>
    </div>
  );
};

const AddPetForm = ({ newPet, upd }) => (
  <>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <Field label="Pet Name *"><Input value={newPet.name} onChange={upd('name')} placeholder="e.g. Max" /></Field>
      <Field label="Breed *"><Input value={newPet.breed} onChange={upd('breed')} placeholder="e.g. Labrador" /></Field>
      <Field label="Age (years)"><Input type="number" value={newPet.age} onChange={upd('age')} placeholder="3" /></Field>
      <Field label="Weight (kg)"><Input value={newPet.weight} onChange={upd('weight')} placeholder="15" /></Field>
    </div>
    <Field label="Bio / Description">
      <textarea value={newPet.bio} onChange={upd('bio')} placeholder="Tell us about your pet…"
        style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1.5px solid #e8e5df', fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: "'Nunito', sans-serif", minHeight: 70 }}
        onFocus={e => e.target.style.borderColor = '#ca8398'} onBlur={e => e.target.style.borderColor = '#e8e5df'}
      />
    </Field>
  </>
);

const fmtDate = (d) => {
  if (!d || d.includes('Not')) return d || '—';
  try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  catch { return d; }
};

export default PetProfile;