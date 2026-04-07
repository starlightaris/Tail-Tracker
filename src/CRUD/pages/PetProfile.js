// PetProfile.js
import React, { useContext, useState } from 'react';
import { PetContext } from '../../context/PetContext';
import { 
  PawPrint, Cake, Ruler, Heart, Syringe, Activity, 
  MapPin, Moon, Plus, X, Edit2, Save, Trash2,
  Calendar, Droplets, Thermometer, Award, Clock
} from 'lucide-react';

const PetProfile = () => {
  const { selectedPet, allPets, setSelectedPet, addPet, removePet, environment } = useContext(PetContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [newPet, setNewPet] = useState({
    name: '',
    breed: '',
    age: '',
    weight: '',
    bio: ''
  });

  // Mock health history data
  const healthHistory = {
    weight: [
      { date: 'Jan', value: 28 },
      { date: 'Feb', value: 29 },
      { date: 'Mar', value: 30 },
      { date: 'Apr', value: 30 },
      { date: 'May', value: 31 }
    ],
    activities: [
      { day: 'Mon', steps: 2843, active: 47 },
      { day: 'Tue', steps: 3120, active: 52 },
      { day: 'Wed', steps: 2980, active: 49 },
      { day: 'Thu', steps: 3450, active: 58 },
      { day: 'Fri', steps: 4100, active: 65 }
    ]
  };

  const handleAddPet = () => {
    if (newPet.name && newPet.breed) {
      addPet({
        ...newPet,
        age: parseInt(newPet.age) || 0,
        weight: newPet.weight ? `${newPet.weight}kg` : '0kg'
      });
      setNewPet({ name: '', breed: '', age: '', weight: '', bio: '' });
      setShowAddForm(false);
    }
  };

  const handleRemovePet = (petId, petName) => {
    if (window.confirm(`Are you sure you want to remove ${petName}?`)) {
      removePet(petId);
    }
  };

  const getActivityLevel = () => {
    const avgSteps = healthHistory.activities.reduce((sum, d) => sum + d.steps, 0) / healthHistory.activities.length;
    if (avgSteps > 3500) return { level: 'Very Active', color: '#60a1b0', icon: '⚡' };
    if (avgSteps > 2500) return { level: 'Active', color: '#ca8398', icon: '🐾' };
    return { level: 'Moderate', color: '#676354', icon: '😴' };
  };

  const activityInfo = getActivityLevel();

  if (!selectedPet) {
    return (
      <div style={styles.emptyState}>
        <PawPrint size={64} color="#dadbd5" />
        <h3>No Pet Selected</h3>
        <p>Click "Add New Pet" to get started</p>
        <button onClick={() => setShowAddForm(true)} style={styles.addBtnLarge}>
          <Plus size={20} /> Add Your First Pet
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Pet Profile</h1>
          <p style={styles.subtitle}>Manage your pet's information and health records</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} style={styles.addPetBtn}>
          <Plus size={18} />
          {showAddForm ? "Cancel" : "Add New Pet"}
        </button>
      </div>

      {/* Add Pet Form */}
      {showAddForm && (
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <h3 style={styles.formTitle}>✨ Register New Pet</h3>
            <button onClick={() => setShowAddForm(false)} style={styles.closeBtn}>
              <X size={20} />
            </button>
          </div>
          <div style={styles.formGrid}>
            <input
              type="text"
              placeholder="Pet Name *"
              value={newPet.name}
              onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
              style={styles.formInput}
            />
            <input
              type="text"
              placeholder="Breed *"
              value={newPet.breed}
              onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
              style={styles.formInput}
            />
            <input
              type="number"
              placeholder="Age (years)"
              value={newPet.age}
              onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
              style={styles.formInput}
            />
            <input
              type="text"
              placeholder="Weight (kg)"
              value={newPet.weight}
              onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
              style={styles.formInput}
            />
            <textarea
              placeholder="Bio / Description"
              value={newPet.bio}
              onChange={(e) => setNewPet({ ...newPet, bio: e.target.value })}
              style={styles.formTextarea}
              rows="2"
            />
          </div>
          <button onClick={handleAddPet} style={styles.savePetBtn}>
            <Save size={18} /> Save Pet Profile
          </button>
        </div>
      )}

      {/* Main Profile Card */}
      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          <div style={styles.avatarSection}>
            <img 
              src={selectedPet.img || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150&h=150&fit=crop"} 
              alt={selectedPet.name} 
              style={styles.avatar}
            />
            <div style={styles.activityBadge} style={{...styles.activityBadge, backgroundColor: activityInfo.color + '20', color: activityInfo.color}}>
              {activityInfo.icon} {activityInfo.level}
            </div>
          </div>
          <div style={styles.profileInfo}>
            <h2 style={styles.petName}>{selectedPet.name}</h2>
            <div style={styles.petTags}>
              <span style={styles.tag}><PawPrint size={14} /> {selectedPet.breed}</span>
              <span style={styles.tag}><Cake size={14} /> {selectedPet.age} years</span>
              <span style={styles.tag}><Ruler size={14} /> {selectedPet.weight}</span>
            </div>
            <p style={styles.bio}>{selectedPet.bio || "Loves playing fetch, enjoys long walks, and is very friendly with other pets. Regular vet checkups keep this happy pup healthy!"}</p>
          </div>
          <div style={styles.profileActions}>
            <button onClick={() => handleRemovePet(selectedPet.id, selectedPet.name)} style={styles.removeBtn}>
              <Trash2 size={16} /> Remove
            </button>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div style={styles.quickStats}>
          <div style={styles.quickStat}>
            <Heart size={20} color="#ca8398" />
            <div>
              <div style={styles.quickStatLabel}>Heart Rate</div>
              <div style={styles.quickStatValue}>85 bpm</div>
            </div>
          </div>
          <div style={styles.quickStat}>
            <Activity size={20} color="#60a1b0" />
            <div>
              <div style={styles.quickStatLabel}>Activity</div>
              <div style={styles.quickStatValue}>2,843 steps</div>
            </div>
          </div>
          <div style={styles.quickStat}>
            <Moon size={20} color="#676354" />
            <div>
              <div style={styles.quickStatLabel}>Sleep</div>
              <div style={styles.quickStatValue}>7.2 hrs</div>
            </div>
          </div>
          <div style={styles.quickStat}>
            <Thermometer size={20} color="#ca8398" />
            <div>
              <div style={styles.quickStatLabel}>Room Temp</div>
              <div style={styles.quickStatValue}>{environment?.temp || 24}°C</div>
            </div>
          </div>
        </div>
      </div>

      {/* Health & Medical Section */}
      <div style={styles.sectionGrid}>
        {/* Medical Records */}
        <div style={styles.infoCard}>
          <div style={styles.cardHeader}>
            <Syringe size={20} color="#ca8398" />
            <h3 style={styles.cardTitle}>Medical Records</h3>
          </div>
          <div style={styles.medicalList}>
            <div style={styles.medicalItem}>
              <Calendar size={16} color="#60a1b0" />
              <div>
                <div style={styles.medicalLabel}>Next Vaccination</div>
                <div style={styles.medicalValue}>May 15, 2026</div>
              </div>
            </div>
            <div style={styles.medicalItem}>
              <Clock size={16} color="#60a1b0" />
              <div>
                <div style={styles.medicalLabel}>Last Checkup</div>
                <div style={styles.medicalValue}>Mar 10, 2026</div>
              </div>
            </div>
            <div style={styles.medicalItem}>
              <Award size={16} color="#60a1b0" />
              <div>
                <div style={styles.medicalLabel}>Vaccination Status</div>
                <div style={styles.medicalValue}>Up to Date ✓</div>
              </div>
            </div>
          </div>
        </div>

        {/* Diet Summary */}
        <div style={styles.infoCard}>
          <div style={styles.cardHeader}>
            <PawPrint size={20} color="#ca8398" />
            <h3 style={styles.cardTitle}>Diet Summary</h3>
          </div>
          <div style={styles.dietStats}>
            <div style={styles.dietStat}>
              <span>Daily Intake</span>
              <strong>280g</strong>
            </div>
            <div style={styles.dietStat}>
              <span>Meals/Day</span>
              <strong>{selectedPet.diet?.schedule?.length || 2}</strong>
            </div>
            <div style={styles.dietStat}>
              <span>Bowl Weight</span>
              <strong>{selectedPet.diet?.bowlWeight || 100}g</strong>
            </div>
          </div>
          <div style={styles.schedulePreview}>
            <div style={styles.scheduleLabel}>Feeding Schedule</div>
            <div style={styles.scheduleTimes}>
              {selectedPet.diet?.schedule?.map((s, i) => (
                <span key={i} style={styles.scheduleTime}>{s.time}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Chart (Mock) */}
        <div style={styles.infoCard}>
          <div style={styles.cardHeader}>
            <Activity size={20} color="#60a1b0" />
            <h3 style={styles.cardTitle}>Weekly Activity</h3>
          </div>
          <div style={styles.chartContainer}>
            {healthHistory.activities.map((day, i) => (
              <div key={i} style={styles.chartBar}>
                <div style={styles.chartLabel}>{day.day}</div>
                <div style={styles.barWrapper}>
                  <div style={{ ...styles.bar, width: `${(day.steps / 4500) * 100}%`, backgroundColor: '#ca8398' }} />
                </div>
                <div style={styles.chartValue}>{day.steps}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pet Selector - All Pets */}
        <div style={styles.infoCard}>
          <div style={styles.cardHeader}>
            <PawPrint size={20} color="#676354" />
            <h3 style={styles.cardTitle}>My Pets</h3>
          </div>
          <div style={styles.petList}>
            {allPets.map(pet => (
              <div 
                key={pet.id} 
                onClick={() => setSelectedPet(pet)}
                style={{
                  ...styles.petListItem,
                  ...(selectedPet?.id === pet.id ? styles.petListItemActive : {})
                }}
              >
                <img src={pet.img} alt={pet.name} style={styles.petListAvatar} />
                <div style={styles.petListInfo}>
                  <div style={styles.petListName}>{pet.name}</div>
                  <div style={styles.petListBreed}>{pet.breed}</div>
                </div>
                {selectedPet?.id === pet.id && <div style={styles.activeIndicator}>✓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Environment Card */}
      <div style={styles.envCard}>
        <div style={styles.envHeader}>
          <Droplets size={18} color="#60a1b0" />
          <span>Current Environment</span>
        </div>
        <div style={styles.envStats}>
          <div><Thermometer size={16} /> {environment?.temp || 24}°C</div>
          <div><Droplets size={16} /> {environment?.humidity || 60}% Humidity</div>
          <div>🌬️ THI: {environment?.thi || 72}</div>
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
    textAlign: 'center',
    padding: '80px 20px',
    color: '#9a958c',
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
  addPetBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#ca8398',
    border: 'none',
    borderRadius: '40px',
    color: 'white',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '14px',
  },
  addBtnLarge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#ca8398',
    border: 'none',
    borderRadius: '40px',
    color: 'white',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '20px auto 0',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '24px',
    border: '1px solid #eae8e4',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  formTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#676354',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9a958c',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
  },
  formInput: {
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1px solid #dadbd5',
    fontSize: '14px',
    outline: 'none',
  },
  formTextarea: {
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1px solid #dadbd5',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    gridColumn: 'span 2',
  },
  savePetBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '12px',
    backgroundColor: '#60a1b0',
    border: 'none',
    borderRadius: '40px',
    color: 'white',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '16px',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '24px',
    marginBottom: '24px',
    border: '1px solid #eae8e4',
    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
  },
  profileHeader: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  avatarSection: {
    position: 'relative',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '60px',
    objectFit: 'cover',
    border: '3px solid #ca8398',
  },
  activityBadge: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    backgroundColor: '#60a1b020',
    color: '#60a1b0',
  },
  profileInfo: {
    flex: 1,
  },
  petName: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#676354',
    margin: '0 0 8px 0',
  },
  petTags: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '12px',
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    backgroundColor: '#f5f3f0',
    borderRadius: '20px',
    fontSize: '13px',
    color: '#676354',
  },
  bio: {
    fontSize: '14px',
    color: '#9a958c',
    lineHeight: '1.5',
    margin: 0,
  },
  profileActions: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  removeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #ca8398',
    borderRadius: '40px',
    color: '#ca8398',
    cursor: 'pointer',
    fontSize: '13px',
  },
  quickStats: {
    display: 'flex',
    gap: '32px',
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid #eae8e4',
    flexWrap: 'wrap',
  },
  quickStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  quickStatLabel: {
    fontSize: '12px',
    color: '#9a958c',
  },
  quickStatValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#676354',
  },
  sectionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '24px',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '20px',
    border: '1px solid #eae8e4',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '2px solid #dadbd5',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#676354',
    margin: 0,
  },
  medicalList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  medicalItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  medicalLabel: {
    fontSize: '12px',
    color: '#9a958c',
  },
  medicalValue: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#676354',
  },
  dietStats: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #f0eeea',
  },
  dietStat: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#9a958c',
    '& strong': {
      display: 'block',
      fontSize: '20px',
      color: '#ca8398',
      marginTop: '4px',
    },
  },
  schedulePreview: {
    backgroundColor: '#faf9f7',
    padding: '12px',
    borderRadius: '12px',
  },
  scheduleLabel: {
    fontSize: '12px',
    color: '#9a958c',
    marginBottom: '8px',
  },
  scheduleTimes: {
    display: 'flex',
    gap: '12px',
  },
  scheduleTime: {
    padding: '4px 12px',
    backgroundColor: '#e8f0f2',
    borderRadius: '20px',
    fontSize: '13px',
    color: '#60a1b0',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  chartBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  chartLabel: {
    width: '40px',
    fontSize: '12px',
    color: '#9a958c',
  },
  barWrapper: {
    flex: 1,
    height: '8px',
    backgroundColor: '#dadbd5',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: '4px',
  },
  chartValue: {
    width: '45px',
    fontSize: '12px',
    color: '#676354',
    textAlign: 'right',
  },
  petList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  petListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  petListItemActive: {
    backgroundColor: '#f5f3f0',
    border: '1px solid #eae8e4',
  },
  petListAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    objectFit: 'cover',
  },
  petListInfo: {
    flex: 1,
  },
  petListName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#676354',
  },
  petListBreed: {
    fontSize: '12px',
    color: '#9a958c',
  },
  activeIndicator: {
    color: '#ca8398',
    fontWeight: 'bold',
  },
  envCard: {
    backgroundColor: '#eef4f5',
    borderRadius: '16px',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  envHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#60a1b0',
  },
  envStats: {
    display: 'flex',
    gap: '20px',
    fontSize: '13px',
    color: '#676354',
  },
};

export default PetProfile;