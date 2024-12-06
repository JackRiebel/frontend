import React, { useState } from 'react';
import '../styles/myServices.css';

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    contact: '',
  });

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    setServices([...services, { ...newService, id: Date.now() }]);
    setNewService({ title: '', description: '', price: '', location: '', contact: '' });
    alert('Service added successfully!');
  };

  const handleDeleteService = (id) => {
    const updatedServices = services.filter((service) => service.id !== id);
    setServices(updatedServices);
  };

  const handleEditService = (id) => {
    const serviceToEdit = services.find((service) => service.id === id);
    setNewService(serviceToEdit);
    handleDeleteService(id); // Temporarily remove it for editing
  };

  return (
    <div className="my-services-page">
      <h1>My Services</h1>

      {/* Add New Service Section */}
      <div className="new-service-section">
        <h2>Create a New Service</h2>
        <form onSubmit={handleServiceSubmit}>
          <div className="form-group">
            <label>Service Title</label>
            <input
              type="text"
              value={newService.title}
              onChange={(e) => setNewService({ ...newService, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={newService.location}
              onChange={(e) => setNewService({ ...newService, location: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact Information</label>
            <input
              type="text"
              value={newService.contact}
              onChange={(e) => setNewService({ ...newService, contact: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn">Add Service</button>
        </form>
      </div>

      {/* Existing Services Section */}
      <div className="existing-services-section">
        <h2>Existing Services</h2>
        {services.length > 0 ? (
          <ul className="services-list">
            {services.map((service) => (
              <li key={service.id} className="service-item">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p>Price: {service.price}</p>
                <p>Location: {service.location}</p>
                <p>Contact: {service.contact}</p>
                <div className="service-actions">
                  <button className="btn btn-edit" onClick={() => handleEditService(service.id)}>
                    Edit
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDeleteService(service.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No services added yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyServices;
