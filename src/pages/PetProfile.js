import React, { useContext, useState } from 'react';
import { PetContext } from '../context/PetContext';

const PetProfile = () => {
  const { selectedPet, allPets } = useContext(PetContext);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pet Profile: {selectedPet.name}</h2>
      <div style={{ display: 'flex', gap: '20px', border: '1px solid #ddd', padding: '20px', borderRadius: '12px' }}>
        <img src={selectedPet.img} alt={selectedPet.name} style={{ width: '150px', borderRadius: '50%' }} />
        <div>
          <p><strong>Breed:</strong> {selectedPet.breed}</p>
          <p><strong>Age:</strong> {selectedPet.age} years</p>
          <p><strong>Weight:</strong> {selectedPet.weight}</p>
          <p><strong>Bio:</strong> Friendly and loves the automated feeder!</p>
        </div>
      </div>

      <button 
        onClick={() => setShowAddForm(!showAddForm)} 
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        {showAddForm ? "Close Form" : "+ Add New Pet"}
      </button>

      {showAddForm && (
        <div style={{ marginTop: '20px', background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
          <h3>Register New Pet</h3>
          <input type="text" placeholder="Pet Name" style={inputStyle} />
          <input type="text" placeholder="Breed" style={inputStyle} />
          <input type="number" placeholder="Age" style={inputStyle} />
          <button style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '10px' }}>Save Pet</button>
        </div>
      )}
    </div>
  );
};

const inputStyle = { display: 'block', margin: '10px 0', padding: '8px', width: '200px' };

export default PetProfile;