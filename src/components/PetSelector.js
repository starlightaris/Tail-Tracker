// src/components/PetSelector.js
import React, { useContext } from 'react';
import { PetContext } from '../context/PetContext';

const PetSelector = () => {
  const { allPets, setSelectedPet, selectedPet } = useContext(PetContext);

  return (
    <div style={{ padding: '10px' }}>
      <label>Active Pet: </label>
      <select 
        value={selectedPet.id} 
        onChange={(e) => {
          const pet = allPets.find(p => p.id === parseInt(e.target.value));
          setSelectedPet(pet);
        }}
      >
        {allPets.map(pet => (
          <option key={pet.id} value={pet.id}>{pet.name}</option>
        ))}
      </select>
    </div>
  );
};

export default PetSelector;