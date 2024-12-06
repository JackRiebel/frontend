import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';


const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light text-center p-5">
        <div className="container">
          <h1 className="display-4">Welcome to PetConnect</h1>
          <p className="lead">
            Your one-stop platform for pet care, community, and resources.
          </p>
          <Link to="/adoption" className="btn btn-primary btn-lg mx-2">
            Find a Pet to Adopt
          </Link>
          <Link to="/services" className="btn btn-outline-primary btn-lg mx-2">
            Explore Services
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Why Choose PetConnect?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src="https://images.ctfassets.net/sfnkq8lmu5d7/2LUZAR1nyO0sZJC0nqL5cU/80275803d53b895ebe46cd57fb983e9d/2021-11-18_Is_Your_Dog-s_Rough_Play_Appropriate_.jpg"
                  className="card-img-top"
                  alt="Pet Profiles"
                />
                <div className="card-body">
                  <h5 className="card-title">Pet Profiles</h5>
                  <p className="card-text">
                    Create and manage detailed profiles for your pets, including photos and health records.
                  </p>
                  <Link to="/profiles" className="btn btn-sm btn-primary">
                    Manage Profiles
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src="https://www.veterinarypracticenews.com/wp-content/uploads/2019/11/SA_Mars.jpg"
                  className="card-img-top"
                  alt="Community Forum"
                />
                <div className="card-body">
                  <h5 className="card-title">Community Forum</h5>
                  <p className="card-text">
                    Connect with fellow pet lovers, share tips, and ask questions.
                  </p>
                  <Link to="/forum" className="btn btn-sm btn-primary">
                    Visit Forums
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src="https://www.cubesmart.com/blog/wp-content/uploads/MiamiShelters_01.jpg"
                  className="card-img-top"
                  alt="Adoption Portal"
                />
                <div className="card-body">
                  <h5 className="card-title">Adoption Portal</h5>
                  <p className="card-text">
                    Browse pets looking for forever homes and connect with shelters.
                  </p>
                  <Link to="/adoption" className="btn btn-sm btn-primary">
                    View Adoption Listings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">What Our Users Say</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <blockquote className="blockquote text-center">
                <p className="mb-0">"PetConnect made it so easy to find the perfect groomer for my dog."</p>
                <footer className="blockquote-footer">Sarah M.</footer>
              </blockquote>
            </div>
            <div className="col-md-4 mb-4">
              <blockquote className="blockquote text-center">
                <p className="mb-0">"I adopted my cat through PetConnect, and it was a seamless experience."</p>
                <footer className="blockquote-footer">James K.</footer>
              </blockquote>
            </div>
            <div className="col-md-4 mb-4">
              <blockquote className="blockquote text-center">
                <p className="mb-0">"The forums are such a great way to connect with other pet owners."</p>
                <footer className="blockquote-footer">Emma L.</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h2>Join the PetConnect Community Today!</h2>
          <p className="lead">
            Whether you’re a pet owner, enthusiast, or service provider, there’s something here for you.
          </p>
          <Link to="/signup" className="btn btn-light btn-lg">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
