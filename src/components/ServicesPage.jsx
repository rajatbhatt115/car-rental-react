import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBan, FaShieldAlt, FaMapMarkerAlt, FaGasPump } from 'react-icons/fa';
import axios from 'axios';
import {
  FaCar,
  FaSuitcase,
  FaUsers,
  FaShip,
  FaUmbrellaBeach
} from "react-icons/fa";

const serviceIcons = {
  car: <FaCar size={52} />,
  suitcase: <FaSuitcase size={52} />,
  users: <FaUsers size={52} />,
  ship: <FaShip size={52} />,
  beach: <FaUmbrellaBeach size={52} />
};
// Updated mock data for services (HTML section ke according)
  const mockServices = [
    {
      id: 1,
      number: "01",
      title: "Corporate Car Hire.",
      icon: "car",
      description: "Tirth travels Corporate Car Hire service is the most recognized and well received services that the corporate houses enjoy. Our customers have the privilege to pick and choose from the range of services that are available to them. Tirth travels offers expert business solutions that are designed to meet all the car booking requirements of our esteemed customers."
    },
    {
      id: 2,
      number: "02",
      title: "Business Travel.",
      icon: "suitcase",
      description: "Tirth travels Car Rental Service has the capability and expertise to design special packages, contracts, rates, and billing cycles for our business customers. We can easily design special requirements such as addition, complementary service for site inspectors, meeting planners, and client VIPs are available for classified customers."
    },
    {
      id: 3,
      number: "03",
      title: "Employee Transportation.",
      icon: "users",
      description: "Tirth travels is up to date with the modernization and we have designed our wide range of services to meet all the needs of our customers. With this in mind we have designed employee transportation service for various companies with the ever growing needs."
    },
    {
      id: 4,
      number: "04",
      title: "Fleet Management.",
      icon: "ship",
      description: "Tirth travels' Fleet management System is unmatched as we have a fleet of top notch vehicles in the industry today. With our enviable fleet of vehicles we are equipped to handle and meet all the requirements of our customers."
    },
    {
      id: 5,
      number: "05",
      title: "Weekend Tours.",
      icon: "beach",
      description: "If you are looking to get away from your hectic work schedules, then Tirth travels can help you do just that. We specialize in organizing tours across India and customize them as per your requirements according the group size, budget and duration."
    }
  ];


const ServicesPage = () => {
  const [services, setServices] = useState(mockServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API configuration
  const API_BASE_URL = 'http://localhost:3001';

  


  const features = [
    {
      icon: <FaBan size={30} />,
      title: "Free Cancellation",
      description: "Pellente ornare sem urpibur blandit tempus lacinia quam venenatis nulla metus auctor."
    },
    {
      icon: <FaShieldAlt size={30} />,
      title: "Theft Protection",
      description: "Pellente ornare sem urpibur blandit tempus lacinia quam venenatis nulla metus auctor."
    },
    {
      icon: <FaMapMarkerAlt size={30} />,
      title: "GPS on Every Vehicle",
      description: "Pellente ornare sem urpibur blandit tempus lacinia quam venenatis nulla metus auctor."
    },
    {
      icon: <FaGasPump size={30} />,
      title: "Refueling Policy",
      description: "Pellente ornare sem urpibur blandit tempus lacinia quam venenatis nulla metus auctor."
    }
  ];

  const discounts = [
    { days: "1-2 Days", discount: "2% Discount" },
    { days: "2-5 Days", discount: "5% Discount" },
    { days: "6-15 Days", discount: "10% Discount" },
    { days: "10-15 Days", discount: "15% Discount" },
    { days: "Above 15 Days", discount: "20% Discount" }
  ];

  // API function to get services
  const getServices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/services`);
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching services:', error);
      return { data: mockServices };
    }
  };

  useEffect(() => {
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getServices();

      // 🔥 IMPORTANT FIX HERE
      const apiData = response.data;

      // agar API ka data ServicesPage ke format ka nahi hai
      const validServices = apiData?.filter(
        item => item.number && item.icon
      );

      if (validServices && validServices.length > 0) {
        setServices(validServices);
      } else {
        setServices(mockServices);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching services:', err);
      setServices(mockServices);
    } finally {
      setLoading(false);
    }
  };

  fetchServices();
}, []);

  if (loading && services.length === 0) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Loading services...</p>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section-service">
        <Container>
          <Row className="align-items-center banner-gap">
            <Col lg={6}>
              <img src="/img/banner_service.png" alt="Services" className="img-fluid" />
            </Col>
            <Col lg={6}>
              <h1>Our <span className="highlight">Services</span></h1>
              <p className="lead mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <nav className="breadcrumb-custom mt-3">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
                <span className="mx-2 text-white">::</span>
                <span style={{ color: '#ff6b35' }}>Services</span>
              </nav>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services section */}
      <section className="services-section">
        <Container>
          <Row className="mb-5">
            <h2 className="text-center">
              Our <span style={{ color: "#ff6b35" }}>Services</span>
            </h2>
          </Row>

          <Row className='d-flex justify-content-center'>
            {services.map((service) => (
              <Col lg={4} md={6} key={service.id} className="mb-4">
                <div className="service-card h-100">

                  <div className="service-number">
                    {service.number}
                  </div>

                  <div className="service-icon text-warning mb-3">
                    {serviceIcons[service.icon]}
                  </div>

                  <h3 className="service-title">
                    {service.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span style={{ color: "#ff6b35" }}>
                      {service.title.split(" ").slice(-1)}
                    </span>
                  </h3>

                  <p>{service.description}</p>

                </div>
              </Col>
            ))}
          </Row>

        </Container>
      </section>


      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="mb-4">
                Call <span style={{ color: '#ff6b35' }}>Now</span> & Book Our <span style={{ color: '#ff6b35' }}>Cab</span> For
                Your <span style={{ color: '#ff6b35' }}>Next</span> Ride.
              </h2>
              <Button size="lg" className="mt-3">
                Book Now
              </Button>
            </Col>
            <Col lg={6} className="text-center">
              <img src="/img/img_call.png" alt="Book Now" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

     {/* Pricing Section */}
<section className="pricing-section">
  <Container>
    <h2 className="d-flex justify-content-center align-items-center" style={{gap: "5px"}}>
      Our <span style={{color: "#ff6b35"}}>Rates</span>
    </h2>
    
    <div className="container mt-4">
      <Row className="justify-content-center">
        {/* Left Pricing Card */}
        <Col lg={4} md={6} className="col-12 mb-4">
          <div className="pricing-card">
            <span className="discount-badge">Save Up To 30%</span>
            <h3 className="mt-3 mb-4">Ride <span className="orange-text">More</span> Save <span className="orange-text">More.</span></h3>

            {discounts.map((item, index) => (
              <div key={index} className="pricing-row">
                <span>{item.days}</span>
                <span className="discount-pill">{item.discount}</span>
              </div>
            ))}
          </div>
        </Col>

        {/* Right Feature Cards */}
        <Col lg={8} md={6} className="col-12">
          <Row>
            {features.map((feature, index) => (
              <Col md={6} className="col-12 mb-4" key={index}>
                <div className="feature-card">
                  <div className="feature-icon-service">
                    {feature.icon}
                  </div>
                  <h5 style={{textAlign: 'start'}}>{feature.title}</h5>
                  <p style={{textAlign: 'start'}}>{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  </Container>
</section>
    </>
  );
};

export default ServicesPage;