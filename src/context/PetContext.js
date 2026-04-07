// PetContext.js
import React, { createContext, useState, useEffect } from 'react';

export const PetContext = createContext();

const MOCK_PETS = [
  { 
    id: 1, 
    name: "Buddy", 
    breed: "Golden Retriever", 
    age: 3, 
    weight: "30kg", 
    img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop",
    diet: {
      bowlWeight: 120,
      lastFed: "09:15 AM",
      status: "Ready",
      schedule: [
        { id: "101", time: "07:00", amount: 100 },
        { id: "102", time: "19:00", amount: 150 }
      ]
    },
    medical: {
      nextVaccination: "2026-05-15",
      lastCheckup: "2026-03-10"
    }
  },
  { 
    id: 2, 
    name: "Luna", 
    breed: "Indie", 
    age: 2, 
    weight: "15kg", 
    img: "https://images.unsplash.com/photo-1596492784531-6e6f9ea1d5db?w=150&h=150&fit=crop",
    diet: {
      bowlWeight: 45,
      lastFed: "10:30 AM",
      status: "Ready",
      schedule: [
        { id: "201", time: "08:00", amount: 30 },
        { id: "202", time: "18:00", amount: 50 }
      ]
    },
    medical: {
      nextVaccination: "2026-06-01",
      lastCheckup: "2026-02-15"
    }
  },
  { 
    id: 3, 
    name: "Charlie", 
    breed: "Beagle", 
    age: 1, 
    weight: "12kg", 
    img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150&h=150&fit=crop",
    diet: {
      bowlWeight: 80,
      lastFed: "08:00 AM",
      status: "Ready",
      schedule: [
        { id: "301", time: "07:30", amount: 60 },
        { id: "302", time: "12:30", amount: 50 },
        { id: "303", time: "18:30", amount: 70 }
      ]
    },
    medical: {
      nextVaccination: "2026-07-20",
      lastCheckup: "2026-01-05"
    }
  }
];

// Global environment data (Shared across all pets)
const DEFAULT_ENVIRONMENT = { 
  temp: 24, 
  humidity: 60, 
  thi: 72.5,
  airQuality: "Good"
};

export const PetProvider = ({ children }) => {
  // IMPORTANT: Initialize selectedPet as the FIRST pet object, not the array
  const [allPets, setAllPets] = useState(MOCK_PETS);
  const [selectedPet, setSelectedPet] = useState(MOCK_PETS[0]); // ← Fixed: single pet object
  const [environment, setEnvironment] = useState(DEFAULT_ENVIRONMENT);

  // Update environment periodically (simulating IoT data)
  useEffect(() => {
    const interval = setInterval(() => {
      setEnvironment(prev => ({
        ...prev,
        temp: 22 + Math.random() * 4,
        humidity: 55 + Math.random() * 10,
        thi: 70 + Math.random() * 8
      }));
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Function to update a pet's diet
  const updatePetDiet = (petId, updatedDiet) => {
    setAllPets(prevPets => 
      prevPets.map(pet => 
        pet.id === petId 
          ? { 
              ...pet, 
              diet: { 
                ...pet.diet, 
                ...updatedDiet,
                schedule: updatedDiet.schedule || pet.diet.schedule,
                lastUpdated: new Date().toISOString()
              } 
            }
          : pet
      )
    );
    
    // Also update selectedPet if it's the current one
    if (selectedPet && selectedPet.id === petId) {
      setSelectedPet(prev => ({ 
        ...prev, 
        diet: { 
          ...prev.diet, 
          ...updatedDiet,
          schedule: updatedDiet.schedule || prev.diet.schedule
        } 
      }));
    }
  };

  // Function to add a new pet
  const addPet = (petData) => {
    const newId = Math.max(...allPets.map(p => p.id), 0) + 1;
    const newPet = {
      id: newId,
      name: petData.name,
      breed: petData.breed,
      age: petData.age,
      weight: petData.weight,
      img: petData.img || "https://via.placeholder.com/150",
      diet: {
        bowlWeight: 100,
        lastFed: "--:--",
        status: "Ready",
        schedule: []
      },
      medical: {
        nextVaccination: "Not scheduled",
        lastCheckup: "Not recorded"
      }
    };
    setAllPets(prev => [...prev, newPet]);
    return newPet;
  };

  // Function to remove a pet
  const removePet = (petId) => {
    const newPets = allPets.filter(pet => pet.id !== petId);
    setAllPets(newPets);
    if (selectedPet && selectedPet.id === petId) {
      setSelectedPet(newPets[0] || null);
    }
  };

  // Function to update environment manually
  const updateEnvironment = (newEnv) => {
    setEnvironment(prev => ({ ...prev, ...newEnv }));
  };

  return (
    <PetContext.Provider value={{ 
      selectedPet, 
      setSelectedPet, 
      allPets, 
      setAllPets,
      environment,
      updatePetDiet,
      addPet,
      removePet,
      updateEnvironment
    }}>
      {children}
    </PetContext.Provider>
  );
};