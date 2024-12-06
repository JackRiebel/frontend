// src/pages/Services.js
import React, { useState, useEffect } from 'react';
import '../styles/services.css';
import { Card, Button, InputGroup, FormControl, Row, Col, Form} from 'react-bootstrap';

// Helper function to calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // in km
};

const Services = () => {
  // Define service categories and animal types
  const serviceTypes = ['All', 'Grooming', 'Training', 'Veterinary'];
  const animalTypes = ['All', 'Dogs', 'Cats', 'Birds'];

  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Happy Tails Grooming',
      price: '$50 per session',
      location: '123 Pet Street, Springfield',
      latitude: 40.7128, // Example latitude
      longitude: -74.006, // Example longitude
      about: 'Happy Tails Grooming is a professional pet grooming service with 10+ years of experience.',
      description: 'We offer full grooming packages including bathing, haircuts, nail trimming, and ear cleaning.',
      type: 'Grooming',
      animal: 'Dogs',
      image: 'https://via.placeholder.com/300x200?text=Happy+Tails+Grooming',
    },
    {
      id: 2,
      name: 'Pawsitive Vets',
      price: '$100 per visit',
      location: '456 Animal Avenue, Greenfield',
      latitude: 40.73061,
      longitude: -73.935242,
      about: 'Pawsitive Vets is a highly trusted veterinary clinic, ensuring your pets receive the best care.',
      description: 'Services include general health checkups, vaccinations, dental care, and surgical procedures.',
      type: 'Veterinary',
      animal: 'Cats',
      image: 'https://via.placeholder.com/300x200?text=Pawsitive+Vets',
    },
    {
      id: 3,
      name: 'Sit & Stay Trainers',
      price: '$30 per session',
      location: '789 Training Lane, Dogsville',
      latitude: 40.758896,
      longitude: -73.98513,
      about: 'Experienced trainers specializing in obedience training and behavioral management.',
      description: 'We provide private and group training sessions to help your pet become well-behaved and happy.',
      type: 'Training',
      animal: 'Dogs',
      image: 'https://via.placeholder.com/300x200?text=Sit+%26+Stay+Trainers',
    },
    // Add more services as needed
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);
  const [activeServiceType, setActiveServiceType] = useState('All');
  const [activeAnimalType, setActiveAnimalType] = useState('All');
  const [userLocation, setUserLocation] = useState(null);
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [recentlyUsed, setRecentlyUsed] = useState([]);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error fetching location:', error);
          // Optionally, set a default location
          setUserLocation({
            latitude: 40.7128,
            longitude: -74.0060,
          });
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Optionally, set a default location
      setUserLocation({
        latitude: 40.7128,
        longitude: -74.0060,
      });
    }
  }, []);

  // Calculate recommended services based on proximity
  useEffect(() => {
    if (userLocation) {
      const servicesWithDistance = services.map((service) => ({
        ...service,
        distance: calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          service.latitude,
          service.longitude
        ),
      }));
      const sortedServices = servicesWithDistance.sort((a, b) => a.distance - b.distance);
      setRecommendedServices(sortedServices.slice(0, 3)); // Top 3 closest services
    }
  }, [userLocation, services]);

  // Load recently used services from localStorage
  useEffect(() => {
    const storedRecentlyUsed = JSON.parse(localStorage.getItem('recentlyUsed')) || [];
    setRecentlyUsed(storedRecentlyUsed);
  }, []);

  // Update filtered services based on search and filters
  useEffect(() => {
    let tempServices = [...services];

    // Filter by service type
    if (activeServiceType !== 'All') {
      tempServices = tempServices.filter((service) => service.type === activeServiceType);
    }

    // Filter by animal type
    if (activeAnimalType !== 'All') {
      tempServices = tempServices.filter((service) => service.animal === activeAnimalType);
    }

    // Search filter
    if (searchQuery.trim() !== '') {
      tempServices = tempServices.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.about.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredServices(tempServices);
  }, [searchQuery, activeServiceType, activeAnimalType, services]);

  // Handle service usage (e.g., clicking 'Contact')
  const handleUseService = (service) => {
    // Update recently used services
    const updatedRecentlyUsed = [service, ...recentlyUsed.filter((s) => s.id !== service.id)];
    setRecentlyUsed(updatedRecentlyUsed.slice(0, 5)); // Keep only last 5
    localStorage.setItem('recentlyUsed', JSON.stringify(updatedRecentlyUsed.slice(0, 5)));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Pet Services</h1>

      {/* Search Bar and Create Post Button */}
      <Row className="mb-4 align-items-center">
        <Col md={8} sm={12} className="mb-2 mb-md-0">
          <InputGroup>
            <FormControl
              placeholder="Search for services..."
              aria-label="Search for services"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4} sm={12} className="text-md-end">
          <Button variant="primary" onClick={() => alert('Feature to create a new service coming soon!')}>
            Create New Service
          </Button>
        </Col>
      </Row>

      {/* Tabs for Service Types and Animal Categories */}
      <Row className="mb-4">
        <Col md={6} sm={12} className="mb-3 mb-md-0">
          <Form.Select
            value={activeServiceType}
            onChange={(e) => setActiveServiceType(e.target.value)}
          >
            {serviceTypes.map((type) => (
              <option key={type} value={type}>
                {type} Services
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={6} sm={12}>
          <Form.Select
            value={activeAnimalType}
            onChange={(e) => setActiveAnimalType(e.target.value)}
          >
            {animalTypes.map((animal) => (
              <option key={animal} value={animal}>
                {animal} Services
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Recently Used Services */}
      {recentlyUsed.length > 0 && (
        <div className="mb-5">
          <h2>Recently Used Services</h2>
          <Row>
            {recentlyUsed.map((service) => (
              <Col key={service.id} md={4} sm={6} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Img variant="top" src={service.image} alt={service.name} />
                  <Card.Body>
                    <Card.Title>{service.name}</Card.Title>
                    <Card.Text>
                      <strong>Price:</strong> {service.price}<br />
                      <strong>Location:</strong> {service.location}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        alert(`Contacting ${service.name}`);
                        handleUseService(service);
                      }}
                    >
                      Contact {service.name}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Recommended Services Based on Proximity */}
      {recommendedServices.length > 0 && (
        <div className="mb-5">
          <h2>Recommended Services Near You</h2>
          <Row>
            {recommendedServices.map((service) => (
              <Col key={service.id} md={4} sm={6} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Img variant="top" src={service.image} alt={service.name} />
                  <Card.Body>
                    <Card.Title>{service.name}</Card.Title>
                    <Card.Text>
                      <strong>Price:</strong> {service.price}<br />
                      <strong>Location:</strong> {service.location}<br />
                      <strong>Distance:</strong> {service.distance.toFixed(2)} km
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        alert(`Contacting ${service.name}`);
                        handleUseService(service);
                      }}
                    >
                      Contact {service.name}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* All Services */}
      <div>
        <h2>All Services</h2>
        <Row>
          {filteredServices.map((service) => (
            <Col key={service.id} md={4} sm={6} className="mb-4">
              <Card className="shadow-sm">
                <Card.Img variant="top" src={service.image} alt={service.name} />
                <Card.Body>
                  <Card.Title>{service.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> {service.price}<br />
                    <strong>Location:</strong> {service.location}<br />
                    <strong>About:</strong> {service.about}<br />
                    <strong>Description:</strong> {service.description}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      alert(`Contacting ${service.name}`);
                      handleUseService(service);
                    }}
                  >
                    Contact {service.name}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {filteredServices.length === 0 && (
            <Col>
              <p className="text-center">No services found matching your criteria.</p>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

// Ensure that the export statement is outside the component function
export default Services;
