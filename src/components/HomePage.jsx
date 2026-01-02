import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheck, FaStar, FaCar, FaPlane, FaBriefcase, FaShieldAlt, FaClock, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaDollarSign, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import axios from 'axios';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [team, setTeam] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    yearsExperience: 20,
    happyClients: 1000,
    totalCars: 50
  });

  // API configuration
  const API_BASE_URL = 'http://localhost:3001';
  const USE_API = false; // Set to true if you want to use actual API
  
  // Mock data as per your HTML template
  const mockData = {
    cars: [
      {
        id: 1,
        category: 'Economy',
        type: 'Sedan',
        seats: 4,
        bags: 2,
        ac: true,
        hourlyRate: 400,
        dailyRate: 3500,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=300&h=200&fit=crop',
        description: '4 Seats • 2 Bags • AC'
      },
      {
        id: 2,
        category: 'SUV',
        type: 'SUV',
        seats: 7,
        bags: 3,
        ac: true,
        hourlyRate: 600,
        dailyRate: 5500,
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=300&h=200&fit=crop',
        description: '7 Seats • 3 Bags • AC'
      },
      {
        id: 3,
        category: 'Luxury',
        type: 'Premium',
        seats: 4,
        bags: 3,
        ac: true,
        hourlyRate: 900,
        dailyRate: 8500,
        image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=300&h=200&fit=crop',
        description: '4 Seats • 3 Bags • Premium AC'
      }
    ],
    
    testimonials: [
      {
        id: 1,
        name: "Handy Mann",
        rating: 5,
        text: "Excellent service! The car was clean and the driver was very professional. Highly recommended for anyone looking for reliable transportation."
      },
      {
        id: 2,
        name: "Alex Richardson",
        rating: 5,
        text: "Great experience from booking to drop-off. The prices are competitive and the service is top-notch. Will definitely use again!"
      }
    ],
    
    blogs: [
      {
        id: 1,
        title: "New Fleet Addition",
        date: "25 Jan 2025",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=250&fit=crop",
        excerpt: "We've added 10 new luxury vehicles to our fleet to serve you better."
      },
      {
        id: 2,
        title: "Safety First Initiative",
        date: "20 Jan 2025",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=250&fit=crop",
        excerpt: "All our vehicles now equipped with latest safety features and sanitized regularly."
      },
      {
        id: 3,
        title: "Special Winter Offers",
        date: "15 Jan 2025",
        image: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400&h=250&fit=crop",
        excerpt: "Book now and get up to 20% off on all weekly and monthly rentals."
      }
    ],
    
    team: [
      {
        id: 1,
        name: "John Brown",
        position: "Senior Driver",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop"
      },
      {
        id: 2,
        name: "Sarah Johnson",
        position: "Operations Manager",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop"
      },
      {
        id: 3,
        name: "Mike Wilson",
        position: "Customer Support",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&h=300&fit=crop"
      }
    ],
    
    services: [
      {
        id: 1,
        title: "City Transfer",
        description: "Comfortable and reliable transportation within the city for all your needs."
      },
      {
        id: 2,
        title: "Airport Transfer",
        description: "Hassle-free pickup and drop services to and from the airport."
      },
      {
        id: 3,
        title: "Business Travel",
        description: "Professional transportation solutions for your business meetings."
      }
    ]
  };

  const partners = [
    { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
    { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
    { name: "Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg" }
  ];

  const advantages = [
    { icon: <FaShieldAlt />, title: "Safety First", description: "All vehicles regularly serviced" },
    { icon: <FaClock />, title: "24/7 Service", description: "Available round the clock" },
    { icon: <FaDollarSign />, title: "Best Price", description: "Affordable rates guaranteed" },
    { icon: <FaUsers />, title: "Expert Drivers", description: "Professional & licensed" }
  ];

  const howItWorks = [
    { icon: <FaMapMarkerAlt size="2em" />, title: "Choose Location", description: "Select your pickup and drop location" },
    { icon: <FaCalendarAlt size="2em" />, title: "Pick-up Date", description: "Choose your preferred date and time" },
    { icon: <FaCar size="2em" />, title: "Book your Car", description: "Select vehicle and confirm booking" },
    { icon: <FaCheckCircle size="2em" />, title: "Sit back & Relax", description: "Enjoy your comfortable ride" }
  ];

  // API functions
  const fetchDataFromAPI = async () => {
    if (!USE_API) {
      return {
        cars: mockData.cars,
        testimonials: mockData.testimonials,
        blogs: mockData.blogs,
        team: mockData.team,
        services: mockData.services,
        stats: stats
      };
    }

    try {
      const [carsRes, testimonialsRes, blogsRes, teamRes, servicesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/cars`).catch(() => ({ data: mockData.cars })),
        axios.get(`${API_BASE_URL}/testimonials`).catch(() => ({ data: mockData.testimonials })),
        axios.get(`${API_BASE_URL}/blogs`).catch(() => ({ data: mockData.blogs })),
        axios.get(`${API_BASE_URL}/team`).catch(() => ({ data: mockData.team })),
        axios.get(`${API_BASE_URL}/services`).catch(() => ({ data: mockData.services }))
      ]);

      return {
        cars: carsRes.data?.slice(0, 3) || mockData.cars,
        testimonials: testimonialsRes.data || mockData.testimonials,
        blogs: blogsRes.data?.slice(0, 3) || mockData.blogs,
        team: teamRes.data?.slice(0, 3) || mockData.team,
        services: servicesRes.data?.slice(0, 3) || mockData.services,
        stats: stats
      };
    } catch (error) {
      console.error('Error fetching from API:', error);
      return {
        cars: mockData.cars,
        testimonials: mockData.testimonials,
        blogs: mockData.blogs,
        team: mockData.team,
        services: mockData.services,
        stats: stats
      };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchDataFromAPI();
        
        setCars(data.cars);
        setTestimonials(data.testimonials);
        setBlogs(data.blogs);
        setTeam(data.team);
        setServices(data.services);
        setStats(data.stats);
        
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Using local data.');
        setCars(mockData.cars);
        setTestimonials(mockData.testimonials);
        setBlogs(mockData.blogs);
        setTeam(mockData.team);
        setServices(mockData.services);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Container className="text-center py-5" style={{ marginTop: '76px' }}>
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Loading...</p>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section - Exact match with HTML */}
      <section className="hero-section-home" id="home">
        <Container>
          <Row className="align-items-center banner-gap">
            <Col lg={6}>
              <img src="/img/banner_home.png" alt="Car Rental Illustration" className="hero-illustration img-fluid" />
            </Col>
            <Col lg={6}>
              <h1 style={{ color: '#fff' }}>Enjoy Your <span className="highlight">Comfortable</span> Trip</h1>
              <p className="lead">Book your perfect ride with us and experience the best car rental service in town.
                Safe, reliable, and affordable.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Rates Section - Exact match with HTML */}
      <section className="rates-section" id="rates">
        <Container>
          <h2>Flexible <span className="highlight">Rates</span></h2>
          {error && <Alert variant="warning">{error}</Alert>}
          <Row>
            {cars.map((car, index) => (
              <Col md={4} key={car.id || index}>
                <div className="car-card">
                  <span className="car-badge">{car.category}</span>
                  <img src={car.image} alt={`${car.type} Car`} className="car-image" />
                  <h4>{car.type}</h4>
                  <p>{car.description}</p>
                  <div className="price-box">
                    <div style={{ color: 'black' }}> Per Hour: <span className="price">₹{car.hourlyRate}/-</span></div>
                    <div style={{ color: 'black' }} className="mt-2"> Per Day: <span className="price">₹{car.dailyRate}/-</span></div>
                    <Button as={Link} to={`/booking?carId=${car.id || index + 1}`} className="btn btn-primary mt-3 w-100">Book Now</Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Orange Info Section - Exact match with HTML */}
      <section className="orange-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2>Luxurioux A/c & Non A/c Car Provider</h2>
              <p>We provide the best luxury and economy cars for your comfortable journey. Our fleet includes a
                wide range of vehicles to suit every need and budget. Experience premium service with
                professional drivers and well-maintained vehicles.</p>
              <Button as={Link} to="/about" className="btn btn-light mt-3 custom-white-btn">Learn More</Button>
            </Col>
            <Col lg={6}>
              <img src="/img/img2.png" alt="Map Illustration" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Us Section - Exact match with HTML */}
      <section className="why-us-section" id="about">
        <Container>
          <h2 className="text-center">Why <span className="highlight">Us</span></h2>
          <Row className="align-items-center">
            <Col lg={6}>
              <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop"
                alt="Blue Car" className="img-fluid" />
            </Col>
            <Col lg={6}>
              <div className="feature-item">
                <div className="feature-icon"><FaCheck /></div>
                <div>
                  <h5>Quality Choice</h5>
                  <p>We offer a wide variety of vehicles from economy to luxury class.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><FaCheck /></div>
                <div>
                  <h5>Affordable Prices</h5>
                  <p>Competitive pricing with no hidden charges or surprises.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><FaCheck /></div>
                <div>
                  <h5>Professional Drivers</h5>
                  <p>Experienced and courteous drivers for your safe journey.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><FaCheck /></div>
                <div>
                  <h5>24/7 Support</h5>
                  <p>Round the clock customer service for your convenience.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section - Exact match with HTML */}
      <section className="services-section-home" id="services" style={{ backgroundColor: '#e9e9e9' }}>
        <Container>
          <h2 className="text-center mb-5" style={{ fontSize: '40px' }}>Our <span className="highlight">Services</span></h2>
          <Row>
            {services.map((service, index) => (
              <Col md={4} key={service.id || index} className="mb-4">
                <div className="service-card">
                  <div className="service-icon">
                    {index === 0 ? <FaCar /> : index === 1 ? <FaPlane /> : <FaBriefcase />}
                  </div>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Partners Section - Exact match with HTML */}
      <section className="partners text-center bg-light partners-section">
        <Container>
          <h2 className="mb-4">Our Trusted <span className="highlight">Partners</span></h2>
          <Row className="justify-content-center align-items-center">
            {partners.map((partner, index) => (
              <Col md={2} xs={4} className="mb-3" key={index}>
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="img-fluid grayscale logo-small" 
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Advantages & How It Works - Exact match with HTML */}
      <section className="advantages-section">
        <Container>
          <Row>
            <Col lg={6} style={{ textAlign: 'center' }}>
              <h2>Our <span className="highlight">Advantages</span></h2>
              <Row className="mt-4">
                {advantages.map((advantage, index) => (
                  <Col xs={6} key={index}>
                    <div className="advantage-card">
                      <div className="advantage-icon">{advantage.icon}</div>
                      <h5>{advantage.title}</h5>
                      <p>{advantage.description}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={6}>
              <div className="how-it-works">
                <h3>How it Works</h3>
                <div className="mt-4">
                  {howItWorks.map((step, index) => (
                    <div className="d-flex align-items-center mb-3" key={index}>
                      <div className="me-3">{step.icon}</div>
                      <div>
                        <h5>{step.title}</h5>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section - Exact match with HTML */}
      <section className="stats-section">
        <Container>
          <Row>
            <Col md={4}>
              <div className="stat-item">
                <div className="stat-number">{stats.yearsExperience}</div>
                <p>Years Experience</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="stat-item">
                <div className="stat-number">{stats.happyClients}</div>
                <p>Happy Clients</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="stat-item">
                <div className="stat-number">{stats.totalCars}+</div>
                <p>Total Cars</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section - Exact match with HTML */}
      <section className="team-section">
        <Container>
          <h2 className="text-center mb-5">Our <span className="highlight">Team Members</span></h2>
          <Row>
            {team.map((member, index) => (
              <Col md={4} key={member.id || index} className="mb-4">
                <div className="team-card">
                  <img src={member.image} alt={member.name} className="team-image" />
                  <h4>{member.name}</h4>
                  <p className="text-muted">{member.position}</p>
                  <div className="social-icons">
                    <a href="#"><FaFacebook /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaInstagram /></a>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials - Exact match with HTML */}
      <section className="testimonials-section">
        <Container>
          <h2 className="text-center mb-5">Our <span className="highlight">Testimonials</span></h2>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col md={6} key={testimonial.id || index} className="mb-4">
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <h5>{testimonial.name}</h5>
                  <p>"{testimonial.text}"</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* News Section - Exact match with HTML */}
      <section className="news-section">
        <Container>
          <h2 className="text-center mb-5">News & <span className="highlight">Updates</span></h2>
          <Row>
            {blogs.map((blog, index) => (
              <Col md={4} key={blog.id || index} className="mb-4">
                <div className="news-card">
                  <img src={blog.image} alt="News" className="news-image" />
                  <div className="news-content">
                    <span className="badge bg-warning text-dark mb-2">{blog.date}</span>
                    <h5>{blog.title}</h5>
                    <p>{blog.excerpt}</p>
                    <Button as={Link} to={`/blogs/${blog.id || index + 1}`} className="btn btn-primary btn-sm">Read More</Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomePage;