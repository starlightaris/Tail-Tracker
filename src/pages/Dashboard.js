import React, { useContext } from 'react';
import { PetContext } from '../context/PetContext';
import { 
  Thermometer, Droplets, Activity, Heart, 
  Syringe, UtensilsCrossed, MapPin, Moon,
  TrendingUp, Droplet, Wind, Coffee
} from 'lucide-react';

const Dashboard = () => {
  const { selectedPet } = useContext(PetContext);

  // Comprehensive mock IoT and health data linked to the prototype
  const healthData = {
    // Environmental
    temp: "24°C",
    humidity: "60%",
    airQuality: "Good",
    
    // Diet & Feeder
    foodDispensed: "200g",
    waterConsumed: "150ml",
    lastFeeding: "08:30 AM",
    weight: "4.2 kg",
    weightChange: "-0.1 kg",
    
    // Vital Signs
    heartRate: "85 bpm",
    respiratoryRate: "24 breaths/min",
    
    // Medical
    nextVaccination: "May 15, 2026",
    lastCheckup: "Mar 10, 2026",
    
    // Activity & Sleep
    activeMinutes: "47 min",
    steps: "2,843",
    sleepHours: "7.2 hrs",
    
    // GPS
    lastLocation: "Central Park",
    distanceTraveled: "1.2 km"
  };

  return (
    <div style={styles.container}>
      {/* Welcome Banner */}
      <div style={styles.welcomeBanner}>
        <div>
          <h1 style={styles.welcomeTitle}>Hello, {selectedPet.name}! 🐾</h1>
          <p style={styles.welcomeSubtitle}>Here's your daily health & activity overview</p>
        </div>
        <div style={styles.dateBadge}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.grid}>
        {/* Environmental Section */}
        <Section title="Environment" icon={<Thermometer size={18} />}>
          <StatCard icon={<Thermometer />} label="Ambient Temp" value={healthData.temp} color="#ca8398" />
          <StatCard icon={<Droplets />} label="Humidity" value={healthData.humidity} color="#60a1b0" />
          <StatCard icon={<Wind />} label="Air Quality" value={healthData.airQuality} color="#676354" />
        </Section>

        {/* Diet & Nutrition Section */}
        <Section title="Diet & Nutrition" icon={<UtensilsCrossed size={18} />}>
          <StatCard icon={<Coffee />} label="Food Dispensed" value={healthData.foodDispensed} color="#ca8398" />
          <StatCard icon={<Droplet />} label="Water Consumed" value={healthData.waterConsumed} color="#60a1b0" />
          <StatCard icon={<Activity />} label="Weight" value={healthData.weight} trend={healthData.weightChange} color="#676354" />
          <StatCard icon={<ClockIcon />} label="Last Feeding" value={healthData.lastFeeding} color="#dadbd5" />
        </Section>

        {/* Vital Signs Section */}
        <Section title="Vital Signs" icon={<Heart size={18} />}>
          <StatCard icon={<Heart />} label="Heart Rate" value={healthData.heartRate} color="#ca8398" />
          <StatCard icon={<Activity />} label="Respiratory Rate" value={healthData.respiratoryRate} color="#60a1b0" />
        </Section>

        {/* Medical Section */}
        <Section title="Medical Tracking" icon={<Syringe size={18} />}>
          <StatCard icon={<Syringe />} label="Next Vaccination" value={healthData.nextVaccination} color="#ca8398" />
          <StatCard icon={<Activity />} label="Last Checkup" value={healthData.lastCheckup} color="#676354" />
        </Section>

        {/* Activity & Sleep Section */}
        <Section title="Activity & Sleep" icon={<TrendingUp size={18} />}>
          <StatCard icon={<Activity />} label="Active Minutes" value={healthData.activeMinutes} color="#60a1b0" />
          <StatCard icon={<TrendingUp />} label="Steps" value={healthData.steps} color="#ca8398" />
          <StatCard icon={<Moon />} label="Sleep" value={healthData.sleepHours} color="#676354" />
        </Section>

        {/* GPS Tracking Section */}
        <Section title="GPS Tracking" icon={<MapPin size={18} />}>
          <StatCard icon={<MapPin />} label="Last Location" value={healthData.lastLocation} color="#60a1b0" />
          <StatCard icon={<Activity />} label="Distance Today" value={healthData.distanceTraveled} color="#ca8398" />
        </Section>
      </div>

      {/* Health Insight Card */}
      <div style={styles.insightCard}>
        <div style={styles.insightIcon}>💡</div>
        <div>
          <h3 style={styles.insightTitle}>AI Health Insight</h3>
          <p style={styles.insightText}>
            {selectedPet.name} has been more active than usual today! +15% steps compared to yesterday. 
            Water consumption is optimal. Next vaccination due in 2 weeks.
          </p>
        </div>
      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, icon, children }) => (
  <div style={styles.section}>
    <div style={styles.sectionHeader}>
      {icon}
      <h2 style={styles.sectionTitle}>{title}</h2>
    </div>
    <div style={styles.sectionGrid}>
      {children}
    </div>
  </div>
);

// Stat Card Component
const StatCard = ({ icon, label, value, trend, color }) => (
  <div style={styles.statCard}>
    <div style={{ ...styles.statIconWrapper, backgroundColor: `${color}15` }}>
      <div style={{ ...styles.statIcon, color }}>{icon}</div>
    </div>
    <div style={styles.statContent}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
      {trend && (
        <div style={styles.statTrend}>
          {trend.startsWith('+') ? '📈' : '📉'} {trend}
        </div>
      )}
    </div>
  </div>
);

// Clock Icon Component
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

// Styles
const styles = {
  container: {
    padding: '28px 32px',
    maxWidth: '1400px',
    margin: '0 auto',
    backgroundColor: '#f8f6f4',
    minHeight: '100%',
  },
  welcomeBanner: {
    background: 'linear-gradient(135deg, #ca8398 0%, #b06d82 100%)',
    borderRadius: '24px',
    padding: '24px 32px',
    marginBottom: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 8px 20px rgba(202, 131, 152, 0.2)',
  },
  welcomeTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: 'white',
    margin: 0,
    letterSpacing: '-0.3px',
  },
  welcomeSubtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.85)',
    margin: '8px 0 0 0',
  },
  dateBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(4px)',
    padding: '8px 16px',
    borderRadius: '40px',
    color: 'white',
    fontSize: '13px',
    fontWeight: '500',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '20px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    border: '1px solid #eae8e4',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '2px solid #dadbd5',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#676354',
    margin: 0,
    letterSpacing: '-0.2px',
  },
  sectionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 16px',
    backgroundColor: '#fefefe',
    borderRadius: '16px',
    transition: 'all 0.2s ease',
    border: '1px solid #f0eeea',
  },
  statIconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#9a958c',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#676354',
    lineHeight: 1.2,
  },
  statTrend: {
    fontSize: '11px',
    color: '#60a1b0',
    marginTop: '4px',
    fontWeight: '500',
  },
  insightCard: {
    marginTop: '32px',
    backgroundColor: '#eef4f5',
    borderRadius: '20px',
    padding: '20px 28px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    border: '1px solid #d4e2e5',
  },
  insightIcon: {
    fontSize: '32px',
  },
  insightTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#60a1b0',
    margin: '0 0 6px 0',
  },
  insightText: {
    fontSize: '14px',
    color: '#5a6e6b',
    margin: 0,
    lineHeight: 1.5,
  },
};

export default Dashboard;