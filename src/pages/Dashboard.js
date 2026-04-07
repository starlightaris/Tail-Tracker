import React, { useContext } from 'react';
import { PetContext } from '../context/PetContext';
import { Thermometer, Droplets, Activity, Heart } from 'lucide-react';

const Dashboard = () => {
  const { selectedPet } = useContext(PetContext);

  // Mock IoT Data linked to the prototype
  const iotData = {
    temp: "24°C",
    humidity: "60%",
    foodDispensed: "200g",
    heartRate: "85 bpm"
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{selectedPet.name}'s Health Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1/4', gap: '20px' }}>
        <StatCard icon={<Thermometer />} label="Ambient Temp" value={iotData.temp} />
        <StatCard icon={<Droplets />} label="Humidity" value={iotData.humidity} />
        <StatCard icon={<Activity />} label="Food Dispensed" value={iotData.foodDispensed} />
        <StatCard icon={<Heart />} label="Heart Rate" value={iotData.heartRate} />
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
    {icon} <strong>{label}</strong>: {value}
  </div>
);

export default Dashboard;