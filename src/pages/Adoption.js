import React, { useState } from 'react';
import '../styles/adoption.css';

const Adoption = () => {
  const [pets] = useState([
    {
      id: 1,
      name: 'Buddy',
      age: 3,
      breed: 'Golden Retriever',
      about: 'Friendly and energetic, loves long walks and playing fetch.',
      image: 'https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J',
    },
    {
      id: 2,
      name: 'Luna',
      age: 2,
      breed: 'Labrador Retriever',
      about: 'A sweet and calm companion, great with kids.',
      image: 'https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/bernese-mountain-dog.jpg?crop=1.00xw:0.668xh;0,0.252xh&resize=640:*',
    },
    {
      id: 3,
      name: 'Max',
      age: 4,
      breed: 'German Shepard',
      about: 'Curious and playful, loves exploring the outdoors.',
      image: 'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg',
    },
  ]);

  const [selectedPet, setSelectedPet] = useState(null);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    alert(`Message sent about ${selectedPet.name}: ${message}`);
    setMessage('');
    setSelectedPet(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Adopt a Pet</h1>
      <div className="row">
        {pets.map((pet) => (
          <div key={pet.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img src={pet.image} className="card-img-top" alt={pet.name} />
              <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">
                  <strong>Age:</strong> {pet.age} years<br />
                  <strong>Breed:</strong> {pet.breed}<br />
                  {pet.about}
                </p>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => setSelectedPet(pet)}
                >
                  Message About {pet.name}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPet && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message About {selectedPet.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedPet(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSendMessage}>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adoption;
