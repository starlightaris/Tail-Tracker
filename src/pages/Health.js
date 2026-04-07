import React, { useContext, useState } from 'react';
import { PetContext } from '../context/PetContext';
import {
  ShieldCheck, Pill, Bell, CheckCircle, Activity,
  Heart, FileText, Calendar, Plus, X, AlertTriangle,
  Syringe, Stethoscope, Thermometer, Droplets, Moon, TrendingUp
} from 'lucide-react';
import {
  Card, CardHeader, PageHeader, PillBtn, Modal,
  Field, Input, Select, Textarea, useToast, ToastContainer,
  Badge, EmptyState, MiniBarChart
} from '../components/ui';

const Health = () => {
  const { selectedPet, environment, healthRecords, addHealthRecord, deleteHealthRecord, toggleReminder } = useContext(PetContext);
  const { toasts, toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [newRecord, setNewRecord] = useState({ type: 'Vaccination', name: '', date: '', notes: '' });
  const update = (f) => (e) => setNewRecord(prev => ({ ...prev, [f]: e.target.value }));

  if (!selectedPet) return <EmptyState emoji="🩺" message="Select a pet to view health records" />;

  const records = healthRecords[selectedPet.id] || [];

  const filtered = filter === 'all' ? records
    : filter === 'upcoming' ? records.filter(r => r.status === 'Upcoming')
    : filter === 'completed' ? records.filter(r => r.status === 'Completed')
    : records.filter(r => r.type.toLowerCase() === filter);

  const handleAdd = () => {
    if (!newRecord.name || !newRecord.date) { toast('Name and date are required', 'error'); return; }
    addHealthRecord(selectedPet.id, {
      ...newRecord,
      status: newRecord.type === 'Vaccination' ? 'Upcoming' : 'Completed',
      reminder: true
    });
    setNewRecord({ type: 'Vaccination', name: '', date: '', notes: '' });
    setShowModal(false);
    toast('Health record added 📋');
  };

  const activityData = [
    { label: 'Mon', value: 47 }, { label: 'Tue', value: 52 },
    { label: 'Wed', value: 49 }, { label: 'Thu', value: 58 },
    { label: 'Fri', value: 65 }, { label: 'Sat', value: 71 }, { label: 'Sun', value: 63 }
  ];
  const weightData = [
    { label: 'Jan', value: 28 }, { label: 'Feb', value: 29 },
    { label: 'Mar', value: 30 }, { label: 'Apr', value: 30 }, { label: 'May', value: 31 }
  ];

  const exportVetReport = () => {
    const lines = [
      `VET REPORT — ${selectedPet.name}`,
      `Generated: ${new Date().toLocaleDateString()}`,
      `Breed: ${selectedPet.breed} | Age: ${selectedPet.age}y | Weight: ${selectedPet.weight}`,
      '',
      'HEALTH RECORDS:',
      ...records.map(r => `• [${r.type}] ${r.name} — ${r.date} (${r.status})${r.notes ? '\n  Notes: ' + r.notes : ''}`),
      '',
      'VITALS (latest):',
      `Heart Rate: ${selectedPet.vitals?.heartRate || 85} bpm`,
      `Respiratory Rate: ${selectedPet.vitals?.respiratoryRate || 24} br/min`,
      `Weight: ${selectedPet.vitals?.weight || '—'} kg`,
      '',
      'MEDICAL INFO:',
      `Next Vaccination: ${selectedPet.medical?.nextVaccination || '—'}`,
      `Last Checkup: ${selectedPet.medical?.lastCheckup || '—'}`,
      `Vaccination Status: ${selectedPet.medical?.vaccinationStatus || '—'}`,
    ].join('\n');
    const blob = new Blob([lines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${selectedPet.name}_vet_report.txt`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    toast('Vet report exported 🏥');
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
      <ToastContainer toasts={toasts} />

      <PageHeader
        title="Health Tracker"
        subtitle={`Medical records & vitals for ${selectedPet.name}`}
        action={
          <div style={{ display: 'flex', gap: 10 }}>
            <PillBtn onClick={exportVetReport} variant="outline" icon={<FileText size={16} />}>Vet Report</PillBtn>
            <PillBtn onClick={() => setShowModal(true)} icon={<Plus size={16} />}>Add Record</PillBtn>
          </div>
        }
      />

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { icon: <Syringe size={20} />, label: 'Total Vaccinations', value: records.filter(r => r.type === 'Vaccination').length, color: '#ca8398' },
          { icon: <Bell size={20} />, label: 'Upcoming', value: records.filter(r => r.status === 'Upcoming').length, color: '#60a1b0', pulse: records.filter(r => r.status === 'Upcoming').length > 0 },
          { icon: <CheckCircle size={20} />, label: 'Completed', value: records.filter(r => r.status === 'Completed').length, color: '#676354' },
          { icon: <Pill size={20} />, label: 'Medications', value: records.filter(r => r.type === 'Medication').length, color: '#ca8398' },
        ].map(({ icon, label, value, color, pulse }, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: 18, padding: '18px 20px',
            border: '1px solid #eae8e2', animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0, position: 'relative' }}>
              {icon}
              {pulse && <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: color, borderRadius: '50%', animation: 'pulse 2s ease-in-out infinite' }} />}
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#3a3728', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 11, color: '#9a958c', marginTop: 3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        {/* Records Panel */}
        <div>
          <Card style={{ marginBottom: 20, animation: 'fadeUp 0.4s ease 0.1s both' }}>
            <CardHeader icon={<FileText size={18} />} title="Medical Records" color="#ca8398"
              right={
                <div style={{ display: 'flex', gap: 4 }}>
                  {['all', 'upcoming', 'completed', 'vaccination', 'medication'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{
                      padding: '5px 11px', borderRadius: 20, border: 'none', cursor: 'pointer',
                      background: filter === f ? '#ca8398' : 'transparent', color: filter === f ? 'white' : '#9a958c',
                      fontSize: 12, fontWeight: 600, transition: 'all 0.18s', fontFamily: "'Nunito', sans-serif",
                      textTransform: 'capitalize',
                    }}>{f}</button>
                  ))}
                </div>
              }
            />
            <div style={{ padding: filtered.length === 0 ? 0 : '8px 20px 20px' }}>
              {filtered.length === 0 ? (
                <EmptyState emoji="📋" message="No records match this filter" sub="Add a record or change the filter" />
              ) : (
                filtered.map((item, idx) => (
                  <RecordRow key={item.id} item={item}
                    onDelete={() => { deleteHealthRecord(selectedPet.id, item.id); toast('Record removed'); }}
                    onToggleReminder={() => { toggleReminder(selectedPet.id, item.id); toast(item.reminder ? 'Reminder off' : 'Reminder on 🔔'); }}
                    animDelay={idx * 0.05}
                  />
                ))
              )}
            </div>
          </Card>

          {/* Activity Chart */}
          <Card style={{ animation: 'fadeUp 0.4s ease 0.2s both' }}>
            <CardHeader icon={<Activity size={18} />} title="Weekly Activity (min)" color="#60a1b0" />
            <div style={{ padding: '20px' }}>
              <MiniBarChart data={activityData} color="#60a1b0" height={100} />
            </div>
          </Card>
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Vitals */}
          <Card style={{ animation: 'fadeUp 0.4s ease 0.15s both' }}>
            <CardHeader icon={<Heart size={18} />} title="Live Vitals" color="#ca8398" />
            <div style={{ padding: '16px 20px' }}>
              {[
                { icon: <Heart size={16} />, label: 'Heart Rate', value: selectedPet.vitals?.heartRate || 85, unit: 'bpm', color: '#ca8398' },
                { icon: <Activity size={16} />, label: 'Resp. Rate', value: selectedPet.vitals?.respiratoryRate || 24, unit: 'br/min', color: '#60a1b0' },
                { icon: <TrendingUp size={16} />, label: 'Weight', value: selectedPet.vitals?.weight || '—', unit: 'kg', color: '#676354' },
                { icon: <Moon size={16} />, label: 'Sleep', value: selectedPet.activity?.sleepHours || 7.2, unit: 'hrs', color: '#676354' },
              ].map(({ icon, label, value, unit, color }, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 3 ? '1px solid #f8f6f2' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color, display: 'flex' }}>{icon}</span>
                    <span style={{ fontSize: 13, color: '#9a958c' }}>{label}</span>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 800, color }}>{value}<span style={{ fontSize: 11, fontWeight: 400, color: '#9a958c', marginLeft: 3 }}>{unit}</span></span>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Reminders */}
          <Card style={{ animation: 'fadeUp 0.4s ease 0.2s both' }}>
            <CardHeader icon={<Bell size={18} />} title="Upcoming Reminders" color="#60a1b0" />
            <div style={{ padding: '8px 20px 16px' }}>
              {records.filter(r => r.reminder && r.status === 'Upcoming').length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#9a958c', fontSize: 13 }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
                  No upcoming reminders
                </div>
              ) : (
                records.filter(r => r.reminder && r.status === 'Upcoming').map((r, i) => (
                  <div key={r.id} style={{
                    display: 'flex', gap: 12, padding: '12px 0',
                    borderBottom: '1px solid #f0eeea', animation: `slideIn 0.25s ease ${i * 0.06}s both`,
                  }}>
                    <div style={{ width: 36, height: 36, borderRadius: 18, background: '#f7edf0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ca8398', flexShrink: 0 }}>
                      {r.type === 'Vaccination' ? <ShieldCheck size={16} /> : r.type === 'Medication' ? <Pill size={16} /> : <Stethoscope size={16} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#3a3728' }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: '#9a958c', marginTop: 2 }}>
                        {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <DaysChip date={r.date} />
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Weight trend */}
          <Card style={{ animation: 'fadeUp 0.4s ease 0.25s both' }}>
            <CardHeader icon={<TrendingUp size={18} />} title="Weight Trend (kg)" color="#676354" />
            <div style={{ padding: '20px' }}>
              <MiniBarChart data={weightData} color="#ca8398" height={90} />
            </div>
          </Card>

          {/* Environment */}
          <Card style={{ animation: 'fadeUp 0.4s ease 0.3s both' }}>
            <CardHeader icon={<Thermometer size={18} />} title="Environment" color="#60a1b0" />
            <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { emoji: '🌡️', label: 'Temp', value: `${(environment?.temp || 24).toFixed(1)}°C` },
                { emoji: '💧', label: 'Humidity', value: `${(environment?.humidity || 60).toFixed(0)}%` },
                { emoji: '🌬️', label: 'Air Quality', value: environment?.airQuality || 'Good' },
                { emoji: '🌿', label: 'THI', value: (environment?.thi || 72.5).toFixed(1) },
              ].map(({ emoji, label, value }, i) => (
                <div key={i} style={{ padding: '10px', background: '#f5f4f0', borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 18, marginBottom: 2 }}>{emoji}</div>
                  <div style={{ fontSize: 10, color: '#9a958c', fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#3a3728' }}>{value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Add Record Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="➕ Add Health Record"
        footer={<>
          <PillBtn variant="ghost" onClick={() => setShowModal(false)}>Cancel</PillBtn>
          <PillBtn onClick={handleAdd}>Save Record</PillBtn>
        </>}
      >
        <Field label="Record Type">
          <Select value={newRecord.type} onChange={update('type')}>
            <option>Vaccination</option>
            <option>Medication</option>
            <option>Checkup</option>
          </Select>
        </Field>
        <Field label="Name / Treatment">
          <Input value={newRecord.name} onChange={update('name')} placeholder="e.g. Rabies Vaccine" />
        </Field>
        <Field label="Date">
          <Input type="date" value={newRecord.date} onChange={update('date')} />
        </Field>
        <Field label="Notes (optional)">
          <textarea value={newRecord.notes} onChange={update('notes')} placeholder="Any additional notes…"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1.5px solid #e8e5df', fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: "'Nunito', sans-serif", minHeight: 80 }}
            onFocus={e => e.target.style.borderColor = '#ca8398'} onBlur={e => e.target.style.borderColor = '#e8e5df'}
          />
        </Field>
      </Modal>
    </div>
  );
};

const RecordRow = ({ item, onDelete, onToggleReminder, animDelay }) => {
  const typeConfig = {
    Vaccination: { icon: <ShieldCheck size={15} />, color: '#ca8398', bg: '#f7edf0' },
    Medication:  { icon: <Pill size={15} />,        color: '#60a1b0', bg: '#e4f2f5' },
    Checkup:     { icon: <Stethoscope size={15} />, color: '#676354', bg: '#eae8e2' },
  };
  const { icon, color, bg } = typeConfig[item.type] || typeConfig.Checkup;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '12px 14px', borderRadius: 14, marginBottom: 6,
      border: '1px solid #f0eeea', background: '#fdfcfb',
      animation: `slideIn 0.25s ease ${animDelay}s both`, transition: 'background 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = '#faf9f7'}
      onMouseLeave={e => e.currentTarget.style.background = '#fdfcfb'}
    >
      <div style={{ width: 36, height: 36, borderRadius: 18, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#3a3728', marginBottom: 2 }}>{item.name}</div>
        <div style={{ fontSize: 12, color: '#9a958c' }}>{item.notes}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: '#9a958c' }}>
          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
        <span style={{
          padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 700,
          background: item.status === 'Completed' ? '#e4f2f5' : '#f7edf0',
          color: item.status === 'Completed' ? '#60a1b0' : '#ca8398',
        }}>
          {item.status === 'Completed' ? '✓ Done' : '⏰ Soon'}
        </span>
        <button onClick={onToggleReminder} style={{
          background: item.reminder ? '#f7edf0' : 'transparent',
          border: '1px solid', borderColor: item.reminder ? '#ca8398' : '#eae8e2',
          borderRadius: 20, padding: '3px 8px', cursor: 'pointer', fontSize: 11,
          color: item.reminder ? '#ca8398' : '#9a958c', fontWeight: 600, transition: 'all 0.2s', fontFamily: "'Nunito', sans-serif",
        }}>🔔</button>
        <button onClick={onDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dadbd5', padding: 3, display: 'flex', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#ca8398'} onMouseLeave={e => e.currentTarget.style.color = '#dadbd5'}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

const DaysChip = ({ date }) => {
  const days = Math.ceil((new Date(date) - new Date()) / 86400000);
  if (days < 0) return <span style={{ fontSize: 11, fontWeight: 700, color: '#60a1b0' }}>Done</span>;
  return (
    <span style={{
      fontSize: 12, fontWeight: 800, color: days <= 7 ? '#ca8398' : '#676354',
      background: days <= 7 ? '#f7edf0' : '#f5f4f0', padding: '3px 8px', borderRadius: 20, whiteSpace: 'nowrap',
    }}>
      {days}d
    </span>
  );
};

export default Health;