import React, { useState } from 'react';
import '../styles/petProfiles.css';


const PetProfiles = () => {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({
    name: '',
    age: '',
    breed: '',
    about: '',
    image: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleAddPet = (e) => {
    e.preventDefault();
    setPets([...pets, { ...newPet, id: pets.length + 1 }]);
    setNewPet({ name: '', age: '', breed: '', about: '', image: '' });
    setShowForm(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Your Pet Profiles</h1>

      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Close Form' : 'Add a New Pet'}
      </button>

      {showForm && (
        <div className="card p-4 mb-4">
          <h2 className="text-center mb-3">Add Pet Profile</h2>
          <form onSubmit={handleAddPet}>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label>Age (Years)</label>
              <input
                type="number"
                className="form-control"
                value={newPet.age}
                onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label>Breed</label>
              <input
                type="text"
                className="form-control"
                value={newPet.breed}
                onChange={(e) =>
                  setNewPet({ ...newPet, breed: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label>About</label>
              <textarea
                className="form-control"
                rows="3"
                value={newPet.about}
                onChange={(e) =>
                  setNewPet({ ...newPet, about: e.target.value })
                }
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label>Image URL</label>
              <input
                type="url"
                className="form-control"
                value={newPet.image}
                onChange={(e) =>
                  setNewPet({ ...newPet, image: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Add Pet
            </button>
          </form>
        </div>
      )}

      {pets.length === 0 ? (
        <p className="text-center">You haven't added any pets yet.</p>
      ) : (
        <div className="row">
          {pets.map((pet) => (
            <div key={pet.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src={pet.image}
                  className="card-img-top"
                  alt={pet.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{pet.name}</h5>
                  <p className="card-text">
                    <strong>Age:</strong> {pet.age} years<br />
                    <strong>Breed:</strong> {pet.breed}<br />
                    {pet.about}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetProfiles;
