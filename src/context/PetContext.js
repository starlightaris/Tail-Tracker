// src/context/PetContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const PetContext = createContext();

const DEFAULT_PETS = [
  {
    id: 1, name: "Buddy", breed: "Golden Retriever", age: 3, weight: "30kg",
    img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop",
    color: "#ca8398",
    bio: "Loves fetch and long walks. Extremely friendly with everyone!",
    diet: {
      bowlWeight: 120, lastFed: "09:15 AM", status: "Ready",
      schedule: [
        { id: "101", time: "07:00", amount: 100 },
        { id: "102", time: "19:00", amount: 150 }
      ]
    },
    vitals: { heartRate: 85, respiratoryRate: 24, weight: 30.2, weightChange: -0.1 },
    activity: { steps: 2843, activeMinutes: 47, sleepHours: 7.2 },
    gps: { lastLocation: "Central Park", distanceTraveled: "1.2 km" },
    medical: { nextVaccination: "2026-05-15", lastCheckup: "2026-03-10", vaccinationStatus: "Up to Date" }
  },
  {
    id: 2, name: "Luna", breed: "Indie", age: 2, weight: "15kg",
  img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150&h=150&fit=crop",
    color: "#60a1b0",
    bio: "Playful street dog with a heart of gold.",
    diet: {
      bowlWeight: 45, lastFed: "10:30 AM", status: "Ready",
      schedule: [
        { id: "201", time: "08:00", amount: 30 },
        { id: "202", time: "18:00", amount: 50 }
      ]
    },
    vitals: { heartRate: 92, respiratoryRate: 26, weight: 15.0, weightChange: 0.2 },
    activity: { steps: 3450, activeMinutes: 58, sleepHours: 8.1 },
    gps: { lastLocation: "Riverside Trail", distanceTraveled: "2.1 km" },
    medical: { nextVaccination: "2026-06-01", lastCheckup: "2026-02-15", vaccinationStatus: "Up to Date" }
  },
  {
    id: 3, name: "Charlie", breed: "Beagle", age: 1, weight: "12kg",
    img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150&h=150&fit=crop",
    color: "#676354",
    bio: "Curious and energetic. Champion nose, will sniff everything!",
    diet: {
      bowlWeight: 80, lastFed: "08:00 AM", status: "Ready",
      schedule: [
        { id: "301", time: "07:30", amount: 60 },
        { id: "302", time: "12:30", amount: 50 },
        { id: "303", time: "18:30", amount: 70 }
      ]
    },
    vitals: { heartRate: 98, respiratoryRate: 28, weight: 12.1, weightChange: 0.3 },
    activity: { steps: 4200, activeMinutes: 71, sleepHours: 6.8 },
    gps: { lastLocation: "Dog Park", distanceTraveled: "3.4 km" },
    medical: { nextVaccination: "2026-07-20", lastCheckup: "2026-01-05", vaccinationStatus: "Due Soon" }
  }
];

const DEFAULT_ENVIRONMENT = {
  temp: 24, humidity: 60, thi: 72.5, airQuality: "Good"
};

const DEFAULT_HEALTH_RECORDS = {
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
};

function loadFromStorage(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

export const PetProvider = ({ children }) => {
  const [allPets, setAllPets] = useState(() => loadFromStorage('tt_pets', DEFAULT_PETS));
  const [selectedPetId, setSelectedPetId] = useState(() => {
    const saved = loadFromStorage('tt_selectedPetId', null);
    return saved || (loadFromStorage('tt_pets', DEFAULT_PETS)[0]?.id ?? 1);
  });
  const [environment, setEnvironment] = useState(DEFAULT_ENVIRONMENT);
  const [healthRecords, setHealthRecords] = useState(() => loadFromStorage('tt_health', DEFAULT_HEALTH_RECORDS));

  const selectedPet = allPets.find(p => p.id === selectedPetId) || allPets[0] || null;

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('tt_pets', JSON.stringify(allPets)); }, [allPets]);
  useEffect(() => { localStorage.setItem('tt_selectedPetId', JSON.stringify(selectedPetId)); }, [selectedPetId]);
  useEffect(() => { localStorage.setItem('tt_health', JSON.stringify(healthRecords)); }, [healthRecords]);

  // Simulate IoT sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnvironment(prev => ({
        ...prev,
        temp: parseFloat((22 + Math.random() * 4).toFixed(1)),
        humidity: parseFloat((55 + Math.random() * 10).toFixed(1)),
        thi: parseFloat((70 + Math.random() * 8).toFixed(1))
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const setSelectedPet = useCallback((petOrId) => {
    if (typeof petOrId === 'object') setSelectedPetId(petOrId.id);
    else setSelectedPetId(petOrId);
  }, []);

  const updatePetDiet = useCallback((petId, updatedDiet) => {
    setAllPets(prev => prev.map(p =>
      p.id === petId ? { ...p, diet: { ...p.diet, ...updatedDiet } } : p
    ));
  }, []);

  const addPet = useCallback((petData) => {
    const newId = Math.max(...allPets.map(p => p.id), 0) + 1;
    const newPet = {
      id: newId,
      name: petData.name, breed: petData.breed, age: petData.age,
      weight: petData.weight, bio: petData.bio || '',
      img: petData.img || `https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop`,
      color: '#ca8398',
      diet: { bowlWeight: 100, lastFed: '--:--', status: 'Ready', schedule: [] },
      vitals: { heartRate: 85, respiratoryRate: 24, weight: parseFloat(petData.weight) || 0, weightChange: 0 },
      activity: { steps: 0, activeMinutes: 0, sleepHours: 0 },
      gps: { lastLocation: 'Unknown', distanceTraveled: '0 km' },
      medical: { nextVaccination: 'Not scheduled', lastCheckup: 'Not recorded', vaccinationStatus: 'Unknown' }
    };
    setAllPets(prev => [...prev, newPet]);
    setHealthRecords(prev => ({ ...prev, [newId]: [] }));
    return newPet;
  }, [allPets]);

  const removePet = useCallback((petId) => {
    setAllPets(prev => {
      const next = prev.filter(p => p.id !== petId);
      if (selectedPetId === petId && next.length > 0) setSelectedPetId(next[0].id);
      return next;
    });
  }, [selectedPetId]);

  const addHealthRecord = useCallback((petId, record) => {
    setHealthRecords(prev => ({
      ...prev,
      [petId]: [...(prev[petId] || []), { ...record, id: Date.now() }]
    }));
  }, []);

  const deleteHealthRecord = useCallback((petId, recordId) => {
    setHealthRecords(prev => ({
      ...prev,
      [petId]: (prev[petId] || []).filter(r => r.id !== recordId)
    }));
  }, []);

  const toggleReminder = useCallback((petId, recordId) => {
    setHealthRecords(prev => ({
      ...prev,
      [petId]: (prev[petId] || []).map(r => r.id === recordId ? { ...r, reminder: !r.reminder } : r)
    }));
  }, []);

  return (
    <PetContext.Provider value={{
      selectedPet, setSelectedPet,
      allPets, setAllPets,
      environment, setEnvironment,
      healthRecords,
      updatePetDiet, addPet, removePet,
      addHealthRecord, deleteHealthRecord, toggleReminder
    }}>
      {children}
    </PetContext.Provider>
  );
};