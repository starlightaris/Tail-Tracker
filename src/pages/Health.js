// Health.js
import React, { useContext, useState } from 'react';
import { PetContext } from '../context/PetContext';
import { 
  ShieldCheck, Pill, Bell, CheckCircle, Activity, 
  Heart, Thermometer, Droplets, Calendar, Plus, 
  X, AlertTriangle, FileText, Clock, TrendingUp,
  Syringe, Stethoscope, Weight, Moon, Zap
} from 'lucide-react';

const Health = () => {
  const { selectedPet, environment } = useContext(PetContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: 'Vaccination',
    name: '',
    date: '',
    notes: ''
  });
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [localRecords, setLocalRecords] = useState({
    1: [
      { id: 101, type: "Vaccination", name: "Rabies", date: "2026-05-20", status: "Upcoming", notes: "Annual rabies vaccination", reminder: true },
      { id: 102, type: "Medication", name: "Deworming", date: "2026-03-01", status: "Completed", notes: "Broad spectrum dewormer", reminder: false },
      { id: 103, type: "Checkup", name: "Annual Physical", date: "2026-02-10", status: "Completed", notes: "All vitals normal", reminder: false },
      { id: 104, type: "Vaccination", name: "Bordetella", date: "2026-06-10", status: "Upcoming", notes: "Kennel cough vaccine", reminder: true }
    ],
    2: [
      { id: 201, type: "Vaccination", name: "Parvovirus", date: "2026-06-15", status: "Upcoming", notes: "First dose", reminder: true },
      { id: 202, type: "Medication", name: "Flea Treatment", date: "2026-04-01", status: "Completed", notes: "Monthly topical treatment", reminder: false },
      { id: 203, type: "Checkup", name: "Wellness Visit", date: "2026-03-20", status: "Completed", notes: "Healthy and active", reminder: false }
    ],
    3: [
      { id: 301, type: "Vaccination", name: "DHPP", date: "2026-07-01", status: "Upcoming", notes: "Distemper combo vaccine", reminder: true },
      { id: 302, type: "Medication", name: "Heartworm Preventive", date: "2026-05-01", status: "Completed", notes: "Monthly chewable", reminder: false }
    ]
  });

  const currentRecords = localRecords[selectedPet.id] || [];
  
  // Health metrics data (mock)
  const healthMetrics = {
    weight: [
      { month: 'Jan', value: 28 },
      { month: 'Feb', value: 29 },
      { month: 'Mar', value: 30 },
      { month: 'Apr', value: 30 },
      { month: 'May', value: 31 }
    ],
    heartRate: [
      { week: 'Week 1', value: 82 },
      { week: 'Week 2', value: 85 },
      { week: 'Week 3', value: 84 },
      { week: 'Week 4', value: 87 }
    ],
    activity: [
      { day: 'Mon', value: 47 },
      { day: 'Tue', value: 52 },
      { day: 'Wed', value: 49 },
      { day: 'Thu', value: 58 },
      { day: 'Fri', value: 65 },
      { day: 'Sat', value: 71 },
      { day: 'Sun', value: 63 }
    ]
  };

  const addRecord = () => {
    if (!newRecord.name || !newRecord.date) return;
    const newId = Date.now();
    const record = {
      id: newId,
      type: newRecord.type,
      name: newRecord.name,
      date: newRecord.date,
      status: newRecord.type === 'Vaccination' ? 'Upcoming' : 'Completed',
      notes: newRecord.notes,
      reminder: true
    };
    setLocalRecords(prev => ({
      ...prev,
      [selectedPet.id]: [...(prev[selectedPet.id] || []), record]
    }));
    setNewRecord({ type: 'Vaccination', name: '', date: '', notes: '' });
    setShowAddModal(false);
  };

  const deleteRecord = (id) => {
    setLocalRecords(prev => ({
      ...prev,
      [selectedPet.id]: prev[selectedPet.id].filter(r => r.id !== id)
    }));
  };

  const toggleReminder = (id) => {
    setLocalRecords(prev => ({
      ...prev,
      [selectedPet.id]: prev[selectedPet.id].map(r => 
        r.id === id ? { ...r, reminder: !r.reminder } : r
      )
    }));
  };

  const getFilteredRecords = () => {
    if (selectedFilter === 'all') return currentRecords;
    if (selectedFilter === 'upcoming') return currentRecords.filter(r => r.status === 'Upcoming');
    if (selectedFilter === 'completed') return currentRecords.filter(r => r.status === 'Completed');
    return currentRecords.filter(r => r.type.toLowerCase() === selectedFilter);
  };

  const getUpcomingCount = () => currentRecords.filter(r => r.status === 'Upcoming').length;
  const getCompletedCount = () => currentRecords.filter(r => r.status === 'Completed').length;
  const getVaccinationCount = () => currentRecords.filter(r => r.type === 'Vaccination').length;

  if (!selectedPet) {
    return (
      <div style={styles.emptyState}>
        <Stethoscope size={64} color="#dadbd5" />
        <h3>No Pet Selected</h3>
        <p>Select a pet to view health records</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Health & Medical Tracker</h1>
          <p style={styles.subtitle}>Manage vaccinations, medications, and health records for {selectedPet.name}</p>
        </div>
        <button onClick={() => setShowAddModal(true)} style={styles.addBtn}>
          <Plus size={18} /> Add Record
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#ca839820', color: '#ca8398' }}>
            <Syringe size={24} />
          </div>
          <div>
            <div style={styles.statValue}>{getVaccinationCount()}</div>
            <div style={styles.statLabel}>Total Vaccinations</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#60a1b020', color: '#60a1b0' }}>
            <Bell size={24} />
          </div>
          <div>
            <div style={styles.statValue}>{getUpcomingCount()}</div>
            <div style={styles.statLabel}>Upcoming</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#67635420', color: '#676354' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div style={styles.statValue}>{getCompletedCount()}</div>
            <div style={styles.statLabel}>Completed</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#dadbd520', color: '#ca8398' }}>
            <Pill size={24} />
          </div>
          <div>
            <div style={styles.statValue}>{currentRecords.filter(r => r.type === 'Medication').length}</div>
            <div style={styles.statLabel}>Medications</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={styles.mainGrid}>
        {/* Records Table */}
        <div style={styles.recordsCard}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>
              <FileText size={20} color="#ca8398" />
              <h3>Medical Records</h3>
            </div>
            <div style={styles.filterTabs}>
              <button 
                onClick={() => setSelectedFilter('all')} 
                style={{ ...styles.filterTab, ...(selectedFilter === 'all' ? styles.filterTabActive : {}) }}
              >All</button>
              <button 
                onClick={() => setSelectedFilter('upcoming')} 
                style={{ ...styles.filterTab, ...(selectedFilter === 'upcoming' ? styles.filterTabActive : {}) }}
              >Upcoming</button>
              <button 
                onClick={() => setSelectedFilter('completed')} 
                style={{ ...styles.filterTab, ...(selectedFilter === 'completed' ? styles.filterTabActive : {}) }}
              >Completed</button>
              <button 
                onClick={() => setSelectedFilter('vaccination')} 
                style={{ ...styles.filterTab, ...(selectedFilter === 'vaccination' ? styles.filterTabActive : {}) }}
              >Vaccinations</button>
            </div>
          </div>

          {getFilteredRecords().length > 0 ? (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Treatment</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Reminder</th>
                    <th style={styles.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredRecords().map((item) => (
                    <tr key={item.id} style={styles.tableRow}>
                      <td style={styles.td}>
                        <span style={styles.typeBadge(item.type)}>
                          {item.type === 'Vaccination' ? <ShieldCheck size={14} /> : 
                           item.type === 'Medication' ? <Pill size={14} /> : <Stethoscope size={14} />}
                          {item.type}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.treatmentName}>{item.name}</div>
                        {item.notes && <div style={styles.treatmentNotes}>{item.notes}</div>}
                      </td>
                      <td style={styles.td}>
                        <div style={styles.dateDisplay}>
                          <Calendar size={12} color="#9a958c" />
                          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.statusBadge(item.status)}>
                          {item.status === 'Completed' ? <CheckCircle size={12} /> : <Bell size={12} />}
                          {item.status}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <button 
                          onClick={() => toggleReminder(item.id)}
                          style={{ ...styles.reminderBtn, ...(item.reminder ? styles.reminderOn : {}) }}
                        >
                          <Bell size={14} />
                          {item.reminder ? 'On' : 'Off'}
                        </button>
                      </td>
                      <td style={styles.td}>
                        <button onClick={() => deleteRecord(item.id)} style={styles.deleteBtn}>
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={styles.noRecords}>
              <p>No medical records found</p>
              <button onClick={() => setShowAddModal(true)} style={styles.addSmallBtn}>+ Add First Record</button>
            </div>
          )}
        </div>

        {/* Health Metrics Charts */}
        <div style={styles.metricsCard}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>
              <Activity size={20} color="#60a1b0" />
              <h3>Health Metrics</h3>
            </div>
          </div>
          
          {/* Weight Chart */}
          <div style={styles.chartSection}>
            <div style={styles.chartHeader}>
              <Weight size={16} color="#ca8398" />
              <span>Weight Trend (kg)</span>
            </div>
            <div style={styles.lineChart}>
              {healthMetrics.weight.map((point, i) => (
                <div key={i} style={styles.chartPoint}>
                  <div style={{ ...styles.chartBar, height: `${(point.value / 35) * 100}%`, backgroundColor: '#ca8398' }} />
                  <div style={styles.chartLabel}>{point.month}</div>
                  <div style={styles.chartValue}>{point.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Heart Rate Chart */}
          <div style={styles.chartSection}>
            <div style={styles.chartHeader}>
              <Heart size={16} color="#ca8398" />
              <span>Heart Rate (bpm)</span>
            </div>
            <div style={styles.lineChart}>
              {healthMetrics.heartRate.map((point, i) => (
                <div key={i} style={styles.chartPoint}>
                  <div style={{ ...styles.chartBar, height: `${(point.value / 100) * 100}%`, backgroundColor: '#ca8398' }} />
                  <div style={styles.chartLabel}>{point.week}</div>
                  <div style={styles.chartValue}>{point.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Chart */}
          <div style={styles.chartSection}>
            <div style={styles.chartHeader}>
              <TrendingUp size={16} color="#60a1b0" />
              <span>Weekly Activity (minutes)</span>
            </div>
            <div style={styles.activityBars}>
              {healthMetrics.activity.map((day, i) => (
                <div key={i} style={styles.activityBar}>
                  <div style={{ ...styles.barFill, height: `${(day.value / 80) * 100}%`, backgroundColor: '#60a1b0' }} />
                  <div style={styles.barLabel}>{day.day}</div>
                  <div style={styles.barValue}>{day.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vital Signs & Environment */}
        <div style={styles.vitalsCard}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>
              <Heart size={20} color="#ca8398" />
              <h3>Current Vital Signs</h3>
            </div>
          </div>
          
          <div style={styles.vitalsGrid}>
            <div style={styles.vitalItem}>
              <div style={{ ...styles.vitalIcon, backgroundColor: '#ca839820', color: '#ca8398' }}>
                <Heart size={20} />
              </div>
              <div>
                <div style={styles.vitalLabel}>Heart Rate</div>
                <div style={styles.vitalValue}>85 <span style={styles.vitalUnit}>bpm</span></div>
                <div style={styles.vitalTrend}>↑ 3 from yesterday</div>
              </div>
            </div>
            <div style={styles.vitalItem}>
              <div style={{ ...styles.vitalIcon, backgroundColor: '#60a1b020', color: '#60a1b0' }}>
                <Thermometer size={20} />
              </div>
              <div>
                <div style={styles.vitalLabel}>Body Temp</div>
                <div style={styles.vitalValue}>38.5 <span style={styles.vitalUnit}>°C</span></div>
                <div style={styles.vitalTrend}>Normal range</div>
              </div>
            </div>
            <div style={styles.vitalItem}>
              <div style={{ ...styles.vitalIcon, backgroundColor: '#67635420', color: '#676354' }}>
                <Activity size={20} />
              </div>
              <div>
                <div style={styles.vitalLabel}>Respiratory Rate</div>
                <div style={styles.vitalValue}>24 <span style={styles.vitalUnit}>breaths/min</span></div>
                <div style={styles.vitalTrend}>Healthy</div>
              </div>
            </div>
            <div style={styles.vitalItem}>
              <div style={{ ...styles.vitalIcon, backgroundColor: '#dadbd520', color: '#ca8398' }}>
                <Weight size={20} />
              </div>
              <div>
                <div style={styles.vitalLabel}>Current Weight</div>
                <div style={styles.vitalValue}>{selectedPet.weight || "30"} <span style={styles.vitalUnit}>kg</span></div>
                <div style={styles.vitalTrend}>Ideal range</div>
              </div>
            </div>
          </div>

          <div style={styles.environmentBox}>
            <div style={styles.environmentHeader}>
              <Droplets size={16} color="#60a1b0" />
              <span>Room Environment</span>
            </div>
            <div style={styles.environmentGrid}>
              <div><Thermometer size={14} /> {environment?.temp || 24}°C</div>
              <div><Droplets size={14} /> {environment?.humidity || 60}% Humidity</div>
              <div><Zap size={14} /> THI: {environment?.thi || 72}</div>
            </div>
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div style={styles.remindersCard}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>
              <Bell size={20} color="#ca8398" />
              <h3>Upcoming Reminders</h3>
            </div>
          </div>
          
          {currentRecords.filter(r => r.status === 'Upcoming' && r.reminder).length > 0 ? (
            <div style={styles.remindersList}>
              {currentRecords.filter(r => r.status === 'Upcoming' && r.reminder).map(reminder => (
                <div key={reminder.id} style={styles.reminderItem}>
                  <div style={styles.reminderIcon}>
                    {reminder.type === 'Vaccination' ? <ShieldCheck size={20} /> : <Pill size={20} />}
                  </div>
                  <div style={styles.reminderContent}>
                    <div style={styles.reminderTitle}>{reminder.name}</div>
                    <div style={styles.reminderDate}>
                      <Calendar size={12} />
                      {new Date(reminder.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    {reminder.notes && <div style={styles.reminderNotes}>{reminder.notes}</div>}
                  </div>
                  <div style={styles.reminderDays}>
                    {Math.ceil((new Date(reminder.date) - new Date()) / (1000 * 60 * 60 * 24))} days
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.noReminders}>
              <CheckCircle size={32} color="#60a1b0" />
              <p>All caught up! No upcoming reminders.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Add Medical Record</h3>
              <button onClick={() => setShowAddModal(false)} style={styles.modalClose}>
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.modalField}>
                <label>Record Type</label>
                <select 
                  value={newRecord.type} 
                  onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                  style={styles.modalSelect}
                >
                  <option value="Vaccination">Vaccination</option>
                  <option value="Medication">Medication</option>
                  <option value="Checkup">Checkup</option>
                </select>
              </div>
              <div style={styles.modalField}>
                <label>Treatment Name</label>
                <input 
                  type="text" 
                  value={newRecord.name} 
                  onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                  placeholder="e.g., Rabies Vaccine"
                  style={styles.modalInput}
                />
              </div>
              <div style={styles.modalField}>
                <label>Date</label>
                <input 
                  type="date" 
                  value={newRecord.date} 
                  onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                  style={styles.modalInput}
                />
              </div>
              <div style={styles.modalField}>
                <label>Notes (optional)</label>
                <textarea 
                  value={newRecord.notes} 
                  onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                  placeholder="Additional details..."
                  style={styles.modalTextarea}
                  rows="3"
                />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={() => setShowAddModal(false)} style={styles.modalCancelBtn}>Cancel</button>
              <button onClick={addRecord} style={styles.modalSaveBtn}>Save Record</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '28px 32px',
    maxWidth: '1400px',
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
  addBtn: {
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '28px',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    border: '1px solid #eae8e4',
  },
  statIcon: {
    width: '52px',
    height: '52px',
    borderRadius: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#676354',
  },
  statLabel: {
    fontSize: '13px',
    color: '#9a958c',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  recordsCard: {
    gridColumn: 'span 2',
    backgroundColor: 'white',
    borderRadius: '20px',
    border: '1px solid #eae8e4',
    overflow: 'hidden',
  },
  metricsCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    border: '1px solid #eae8e4',
    overflow: 'hidden',
  },
  vitalsCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    border: '1px solid #eae8e4',
    overflow: 'hidden',
  },
  remindersCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    border: '1px solid #eae8e4',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: '18px 20px',
    borderBottom: '1px solid #eae8e4',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '& h3': {
      margin: 0,
      fontSize: '16px',
      fontWeight: '600',
      color: '#676354',
    },
  },
  filterTabs: {
    display: 'flex',
    gap: '8px',
  },
  filterTab: {
    padding: '6px 14px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#f5f3f0',
    color: '#676354',
    fontSize: '13px',
    cursor: 'pointer',
  },
  filterTabActive: {
    backgroundColor: '#ca8398',
    color: 'white',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    borderBottom: '1px solid #eae8e4',
    backgroundColor: '#faf9f7',
  },
  th: {
    textAlign: 'left',
    padding: '14px 16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#676354',
  },
  tableRow: {
    borderBottom: '1px solid #f0eeea',
    '&:hover': {
      backgroundColor: '#faf9f7',
    },
  },
  td: {
    padding: '14px 16px',
    fontSize: '14px',
    verticalAlign: 'middle',
  },
  typeBadge: (type) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: type === 'Vaccination' ? '#ca839820' : type === 'Medication' ? '#60a1b020' : '#67635420',
    color: type === 'Vaccination' ? '#ca8398' : type === 'Medication' ? '#60a1b0' : '#676354',
  }),
  treatmentName: {
    fontWeight: '500',
    color: '#676354',
  },
  treatmentNotes: {
    fontSize: '11px',
    color: '#9a958c',
    marginTop: '2px',
  },
  dateDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#676354',
  },
  statusBadge: (status) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    backgroundColor: status === 'Upcoming' ? '#fff3cd' : '#d4edda',
    color: status === 'Upcoming' ? '#856404' : '#155724',
  }),
  reminderBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '20px',
    border: '1px solid #dadbd5',
    backgroundColor: 'white',
    color: '#9a958c',
    fontSize: '11px',
    cursor: 'pointer',
  },
  reminderOn: {
    backgroundColor: '#60a1b0',
    borderColor: '#60a1b0',
    color: 'white',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#ca8398',
    padding: '4px',
  },
  noRecords: {
    textAlign: 'center',
    padding: '40px',
    color: '#9a958c',
  },
  addSmallBtn: {
    marginTop: '12px',
    padding: '8px 16px',
    backgroundColor: '#ca8398',
    border: 'none',
    borderRadius: '20px',
    color: 'white',
    cursor: 'pointer',
  },
  chartSection: {
    padding: '16px 20px',
    borderBottom: '1px solid #eae8e4',
  },
  chartHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#676354',
    marginBottom: '16px',
  },
  lineChart: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '12px',
    height: '120px',
  },
  chartPoint: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  chartBar: {
    width: '100%',
    maxWidth: '40px',
    minHeight: '4px',
    borderRadius: '4px',
    transition: 'height 0.3s',
  },
  chartLabel: {
    fontSize: '10px',
    color: '#9a958c',
  },
  chartValue: {
    fontSize: '11px',
    fontWeight: '500',
    color: '#676354',
  },
  activityBars: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    height: '140px',
  },
  activityBar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    height: '100%',
  },
  barFill: {
    width: '100%',
    maxWidth: '35px',
    borderRadius: '4px',
    transition: 'height 0.3s',
  },
  barLabel: {
    fontSize: '10px',
    color: '#9a958c',
  },
  barValue: {
    fontSize: '10px',
    fontWeight: '500',
    color: '#676354',
  },
  vitalsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    padding: '20px',
  },
  vitalItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  vitalIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vitalLabel: {
    fontSize: '12px',
    color: '#9a958c',
  },
  vitalValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#676354',
  },
  vitalUnit: {
    fontSize: '12px',
    fontWeight: '400',
    color: '#9a958c',
  },
  vitalTrend: {
    fontSize: '10px',
    color: '#60a1b0',
  },
  environmentBox: {
    margin: '0 20px 20px 20px',
    padding: '16px',
    backgroundColor: '#eef4f5',
    borderRadius: '16px',
  },
  environmentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#60a1b0',
    marginBottom: '12px',
  },
  environmentGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#676354',
  },
  remindersList: {
    padding: '20px',
  },
  reminderItem: {
    display: 'flex',
    gap: '14px',
    padding: '14px 0',
    borderBottom: '1px solid #f0eeea',
  },
  reminderIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    backgroundColor: '#ca839820',
    color: '#ca8398',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#676354',
    marginBottom: '4px',
  },
  reminderDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#9a958c',
    marginBottom: '4px',
  },
  reminderNotes: {
    fontSize: '12px',
    color: '#60a1b0',
  },
  reminderDays: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#ca8398',
    alignSelf: 'center',
  },
  noReminders: {
    textAlign: 'center',
    padding: '40px',
    color: '#9a958c',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '24px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid #eae8e4',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#676354',
    margin: 0,
  },
  modalClose: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9a958c',
  },
  modalBody: {
    padding: '24px',
  },
  modalField: {
    marginBottom: '16px',
    '& label': {
      display: 'block',
      fontSize: '13px',
      fontWeight: '500',
      color: '#676354',
      marginBottom: '6px',
    },
  },
  modalInput: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1px solid #dadbd5',
    fontSize: '14px',
    outline: 'none',
  },
  modalSelect: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1px solid #dadbd5',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white',
  },
  modalTextarea: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1px solid #dadbd5',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    resize: 'vertical',
  },
  modalFooter: {
    padding: '16px 24px',
    borderTop: '1px solid #eae8e4',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  modalCancelBtn: {
    padding: '10px 20px',
    borderRadius: '40px',
    border: '1px solid #dadbd5',
    backgroundColor: 'white',
    color: '#676354',
    cursor: 'pointer',
  },
  modalSaveBtn: {
    padding: '10px 20px',
    borderRadius: '40px',
    border: 'none',
    backgroundColor: '#ca8398',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Health;