import React, { useContext } from 'react';
import { PetContext } from '../context/PetContext';
import {
  Thermometer, Droplets, Activity, Heart, Syringe,
  UtensilsCrossed, MapPin, Moon, TrendingUp, Droplet,
  Wind, Coffee, Zap
} from 'lucide-react';
import { StatChip, Card, CardHeader, MiniBarChart } from '../components/ui';

const Dashboard = () => {
  const { selectedPet, environment } = useContext(PetContext);
  if (!selectedPet) return null;

  const p = selectedPet;
  const activityData = [
    { label: 'Mon', value: 47 }, { label: 'Tue', value: 52 },
    { label: 'Wed', value: 49 }, { label: 'Thu', value: 58 },
    { label: 'Fri', value: 65 }, { label: 'Sat', value: 71 },
    { label: 'Sun', value: 63 }
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', animation: 'fadeIn 0.35s ease' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #ca8398 0%, #a5637a 60%, #60a1b0 100%)',
        borderRadius: 24, padding: '24px 30px', marginBottom: 28,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 8px 28px rgba(202,131,152,0.3)', position: 'relative', overflow: 'hidden',
        animation: 'fadeUp 0.4s ease',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', right: 80, top: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', right: 20, top: 10, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 18, zIndex: 1 }}>
          <img src={p.img} alt={p.name} style={{
            width: 64, height: 64, borderRadius: 32, objectFit: 'cover',
            border: '3px solid rgba(255,255,255,0.6)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            animation: 'float 4s ease-in-out infinite',
          }} />
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: 'white', fontFamily: "'Fraunces', serif" }}>
              Hey, {p.name}! 🐾
            </h1>
            <p style={{ margin: '5px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
              {p.breed} · {p.age} years old · Here's your daily overview
            </p>
          </div>
        </div>

        <div style={{ zIndex: 1, textAlign: 'right' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: 40, padding: '8px 16px', color: 'white', fontSize: 13, fontWeight: 600 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '4px 10px', color: 'white', fontSize: 11, fontWeight: 600 }}>
              🌡️ {environment?.temp?.toFixed(1) || 24}°C
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '4px 10px', color: 'white', fontSize: 11, fontWeight: 600 }}>
              💧 {environment?.humidity?.toFixed(0) || 60}%
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 28 }}>
        <StatChip icon={<Heart size={20} />} label="Heart Rate" value={`${p.vitals?.heartRate || 85} bpm`} color="#ca8398" animDelay={0.05} />
        <StatChip icon={<Activity size={20} />} label="Steps Today" value={p.activity?.steps?.toLocaleString() || '2,843'} color="#60a1b0" animDelay={0.1} />
        <StatChip icon={<Moon size={20} />} label="Sleep" value={`${p.activity?.sleepHours || 7.2} hrs`} color="#676354" animDelay={0.15} />
        <StatChip icon={<TrendingUp size={20} />} label="Active Minutes" value={`${p.activity?.activeMinutes || 47} min`} color="#ca8398" animDelay={0.2} />
        <StatChip icon={<Droplet size={20} />} label="Water" value="150 ml" color="#60a1b0" animDelay={0.25} />
        <StatChip icon={<MapPin size={20} />} label="Distance" value={p.gps?.distanceTraveled || '1.2 km'} color="#676354" animDelay={0.3} />
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Vital Signs */}
        <Card style={{ animation: 'fadeUp 0.4s ease 0.1s both' }}>
          <CardHeader icon={<Heart size={18} />} title="Vital Signs" color="#ca8398" />
          <div style={{ padding: 20 }}>
            <VitalRow icon={<Heart size={16} color="#ca8398" />} label="Heart Rate" value={`${p.vitals?.heartRate || 85}`} unit="bpm" color="#ca8398" />
            <VitalRow icon={<Activity size={16} color="#60a1b0" />} label="Resp. Rate" value={`${p.vitals?.respiratoryRate || 24}`} unit="br/min" color="#60a1b0" />
            <VitalRow icon={<TrendingUp size={16} color="#676354" />} label="Weight" value={`${p.vitals?.weight || 30.2}`} unit="kg" color="#676354" trend={p.vitals?.weightChange} />
            <div style={{ marginTop: 14, padding: '12px 14px', background: 'linear-gradient(135deg, #f7edf0, #fce9ef)', borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: '#ca8398', fontWeight: 700, marginBottom: 4 }}>💡 Health Status</div>
              <div style={{ fontSize: 13, color: '#676354' }}>All vitals within healthy range 🐶</div>
            </div>
          </div>
        </Card>

        {/* Activity */}
        <Card style={{ animation: 'fadeUp 0.4s ease 0.15s both' }}>
          <CardHeader icon={<Activity size={18} />} title="Weekly Activity" color="#60a1b0" />
          <div style={{ padding: 20 }}>
            <MiniBarChart data={activityData} color="#60a1b0" height={100} />
            <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
              <div style={{ flex: 1, padding: '10px', background: '#e4f2f5', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#60a1b0' }}>{p.activity?.activeMinutes || 47}</div>
                <div style={{ fontSize: 11, color: '#3d7f8f', marginTop: 2, fontWeight: 600 }}>avg min/day</div>
              </div>
              <div style={{ flex: 1, padding: '10px', background: '#f7edf0', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#ca8398' }}>{p.activity?.sleepHours || 7.2}</div>
                <div style={{ fontSize: 11, color: '#a5637a', marginTop: 2, fontWeight: 600 }}>hrs sleep</div>
              </div>
            </div>
          </div>
        </Card>

        {/* GPS + Environment */}
        <Card style={{ animation: 'fadeUp 0.4s ease 0.2s both' }}>
          <CardHeader icon={<MapPin size={18} />} title="GPS & Location" color="#676354" />
          <div style={{ padding: 20 }}>
            <div style={{ background: 'linear-gradient(135deg, #eae8e2, #f5f4f0)', borderRadius: 16, padding: '16px', marginBottom: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>📍</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#3a3728' }}>{p.gps?.lastLocation || 'Central Park'}</div>
              <div style={{ fontSize: 12, color: '#9a958c', marginTop: 4 }}>Last known location</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0eeea' }}>
              <span style={{ fontSize: 13, color: '#9a958c' }}>Distance today</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#676354' }}>{p.gps?.distanceTraveled || '1.2 km'}</span>
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9a958c', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Environment</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <EnvChip icon="🌡️" label="Temp" value={`${environment?.temp?.toFixed(1) || 24}°C`} />
                <EnvChip icon="💧" label="Humidity" value={`${environment?.humidity?.toFixed(0) || 60}%`} />
                <EnvChip icon="🌬️" label="Air Quality" value={environment?.airQuality || 'Good'} />
                <EnvChip icon="🌿" label="THI Index" value={(environment?.thi || 72.5).toFixed(1)} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Diet + Medical row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Diet */}
        <Card style={{ animation: 'fadeUp 0.4s ease 0.25s both' }}>
          <CardHeader icon={<UtensilsCrossed size={18} />} title="Diet & Feeding" color="#ca8398" />
          <div style={{ padding: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
              <MiniStat label="Food Today" value="200g" color="#ca8398" />
              <MiniStat label="Water" value="150ml" color="#60a1b0" />
              <MiniStat label="Bowl Wt." value={`${p.diet?.bowlWeight || 100}g`} color="#676354" />
            </div>
            <div style={{ padding: '12px 14px', background: '#f8f6f2', borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: '#9a958c', marginBottom: 6, fontWeight: 600 }}>FEEDING SCHEDULE</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(p.diet?.schedule || []).map((s, i) => (
                  <span key={i} style={{ padding: '4px 12px', background: '#e4f2f5', borderRadius: 20, fontSize: 13, fontWeight: 600, color: '#60a1b0' }}>
                    🕐 {s.time}
                  </span>
                ))}
                {(!p.diet?.schedule || p.diet.schedule.length === 0) && (
                  <span style={{ fontSize: 13, color: '#9a958c' }}>No schedule set</span>
                )}
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: '#9a958c' }}>
                Last fed: <strong style={{ color: '#ca8398' }}>{p.diet?.lastFed || '--:--'}</strong>
              </div>
            </div>
          </div>
        </Card>

        {/* Medical */}
        <Card style={{ animation: 'fadeUp 0.4s ease 0.3s both' }}>
          <CardHeader icon={<Syringe size={18} />} title="Medical Overview" color="#60a1b0" />
          <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              <MedRow icon="💉" label="Next Vaccination" value={formatDate(p.medical?.nextVaccination)} urgent={isUpcoming(p.medical?.nextVaccination)} />
              <MedRow icon="🩺" label="Last Checkup" value={formatDate(p.medical?.lastCheckup)} />
              <MedRow icon="✅" label="Vaccination Status" value={p.medical?.vaccinationStatus || 'Unknown'}
                valueColor={p.medical?.vaccinationStatus === 'Up to Date' ? '#60a1b0' : '#ca8398'} />
            </div>
            <div style={{ padding: '12px 14px', background: 'linear-gradient(135deg, #e4f2f5, #d6eef3)', borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: '#3d7f8f', fontWeight: 700, marginBottom: 4 }}>🏥 Vet Report</div>
              <div style={{ fontSize: 13, color: '#676354' }}>All records up to date. Next visit recommended in {daysUntil(p.medical?.nextVaccination)} days.</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

/* Helpers */
const formatDate = (d) => {
  if (!d || d.includes('Not')) return d || '—';
  try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  catch { return d; }
};
const isUpcoming = (d) => {
  if (!d) return false;
  const diff = new Date(d) - new Date();
  return diff > 0 && diff < 21 * 86400000;
};
const daysUntil = (d) => {
  if (!d) return '?';
  const diff = Math.ceil((new Date(d) - new Date()) / 86400000);
  return diff > 0 ? diff : 0;
};

const VitalRow = ({ icon, label, value, unit, color, trend }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f8f6f2' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {icon}
      <span style={{ fontSize: 13, color: '#9a958c' }}>{label}</span>
    </div>
    <div style={{ textAlign: 'right' }}>
      <span style={{ fontSize: 16, fontWeight: 800, color }}>{value}</span>
      <span style={{ fontSize: 11, color: '#9a958c', marginLeft: 3 }}>{unit}</span>
      {trend !== undefined && <div style={{ fontSize: 11, color: trend < 0 ? '#ca8398' : '#60a1b0', fontWeight: 600 }}>
        {trend < 0 ? '↓' : '↑'} {Math.abs(trend)} kg
      </div>}
    </div>
  </div>
);

const EnvChip = ({ icon, label, value }) => (
  <div style={{ padding: '8px 10px', background: '#f5f4f0', borderRadius: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
    <span style={{ fontSize: 14 }}>{icon}</span>
    <div>
      <div style={{ fontSize: 10, color: '#9a958c', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 800, color: '#3a3728' }}>{value}</div>
    </div>
  </div>
);

const MiniStat = ({ label, value, color }) => (
  <div style={{ background: `${color}12`, borderRadius: 12, padding: '10px', textAlign: 'center' }}>
    <div style={{ fontSize: 17, fontWeight: 800, color }}>{value}</div>
    <div style={{ fontSize: 10, color: '#9a958c', marginTop: 2, fontWeight: 600 }}>{label}</div>
  </div>
);

const MedRow = ({ icon, label, value, urgent, valueColor }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ fontSize: 13, color: '#9a958c' }}>{label}</span>
    </div>
    <span style={{ fontSize: 13, fontWeight: 700, color: valueColor || (urgent ? '#ca8398' : '#676354') }}>
      {value} {urgent && '⚠️'}
    </span>
  </div>
);

export default Dashboard;