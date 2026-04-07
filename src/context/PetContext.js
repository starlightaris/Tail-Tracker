import React, { createContext, useState } from 'react';

export const PetContext = createContext();

const MOCK_PETS = [
  { 
    id: 1, 
    name: "Buddy", 
    breed: "Golden Retriever", 
    age: 3, 
    weight: "30kg", 
    img: "https://via.placeholder.com/150",
    // Diet UI Data (Extracted logic from ManualFeed/FeederSettings)
    diet: {
      bowlWeight: 120,
      lastFed: "09:15 AM",
      status: "Idle",
      schedule: [
        { id: 101, time: "07:00", amount: 100 },
        { id: 102, time: "19:00", amount: 150 }
      ]
    }
  },
  { 
    id: 2, 
    name: "Luna", 
    breed: "Indie", 
    age: 2, 
    weight: "15kg", 
    img: "https://via.placeholder.com/150",
    diet: {
      bowlWeight: 45,
      lastFed: "10:30 AM",
      status: "Dispensing...",
      schedule: [
        { id: 201, time: "08:00", amount: 30 },
        { id: 202, time: "18:00", amount: 50 }
      ]
    }
  }
];

export const PetProvider = ({ children }) => {
  // IMPORTANT: Set the initial state to the FIRST pet, not the whole array
  const [selectedPet, setSelectedPet] = useState(MOCK_PETS);
  const [allPets, setAllPets] = useState(MOCK_PETS);

  // Global environment data (Shared across all pets)
  const environment = { temp: 28, humidity: 65, thi: 74.5 };

  return (
    <PetContext.Provider value={{ 
      selectedPet, 
      setSelectedPet, 
      allPets, 
      setAllPets,
      environment 
    }}>
      {children}
    </PetContext.Provider>
  );
};