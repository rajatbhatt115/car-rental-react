import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FaStar, FaCalendar, FaUser, FaComments, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import axios from 'axios';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 5
  });

  // API configuration
  const API_BASE_URL = 'http://localhost:3001';

  // Mock data for blog
  const mockBlog = {
    id: 1,
    title: "Essential Tips to Make Your Car Rental Experience Smooth & Hassle-Free",
    date: "29 Feb, 2024",
    author: "Admin",
    commentsCount: 3,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
    content: `
      <p>Renting a car gives you complete freedom to explore your destination at your own pace.
      However, many travellers end up paying extra due to small mistakes or missing
      information. This guide shares practical tips that will help you enjoy a comfortable,
      safe, and budget-friendly rental experience.</p>
      
      <p>Always compare rental companies before booking. Look for offers that include insurance
      coverage, unlimited mileage, and 24/7 customer assistance. Paying attention to these
      details protects you from unnecessary charges later.</p>
      
      <p>Before driving away, inspect the car properly. Check the tyres, fuel level, headlights,
      brakes, and overall condition. Capture a few photos or a short video of the vehicle—this
      simple step protects you from false damage claims at return.</p>
      
      <p>Choosing the right vehicle is extremely important. For long family trips, an SUV or sedan
      provides comfort. For city rides, choose a compact car to save on fuel. Select a car
      based on your journey, not just the lowest price.</p>
      
      <p>Lastly, return the car on time and refill the tank as per policy. Late returns or low
      fuel levels often lead to extra charges. These simple habits ensure your rental
      experience remains smooth and enjoyable.</p>
    `
  };

  const mockBlogs = [
    {
      id: 1,
      title: "5 Essential Checks Before Renting a Car",
      date: "21/05/2023",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=80"
    },
    {
      id: 2,
      title: "How to Reduce Costs on Long Road Trips",
      date: "16/07/2023",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=80"
    },
    {
      id: 3,
      title: "Best Cars for Comfortable Family Travel",
      date: "22/09/2023",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=80"
    },
    {
      id: 4,
      title: "Why Self-Drive Cars Are Trending in 2024",
      date: "18/01/2024",
      image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=80"
    },
    {
      id: 5,
      title: "Ways to Keep Your Rental Car Damage-Free",
      date: "19/04/2024",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=80"
    }
  ];

  // API functions
  const getBlogById = async (blogId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/${blogId}`);
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching blog:', error);
      return { data: mockBlog };
    }
  };

  const getBlogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs`);
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return { data: mockBlogs };
    }
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        
        // Fetch specific blog
        const blogResponse = await getBlogById(id);
        setBlog(blogResponse.data);
        
        // Fetch all blogs for sidebar
        const blogsResponse = await getBlogs();
        setBlogs(blogsResponse.data);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog details. Using local data.');
        setBlog(mockBlog);
        setBlogs(mockBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  const comments = [
    {
      id: 1,
      name: "Ricky Johnson",
      role: "Admin",
      date: "16/05/2023",
      avatar: "https://i.pravatar.cc/60?img=33",
      comment: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxima placeat facere.",
      rating: 5
    },
    {
      id: 2,
      name: "Kristan Willmington",
      role: "Client",
      date: "26/03/2023",
      avatar: "https://i.pravatar.cc/60?img=45",
      comment: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour or randomised words which don't look even slightly believable.",
      rating: 4
    }
  ];

  const latestNews = [
    "Luxury SUVs added to our rental fleet for weekend travelers.",
    "Winter road trip discounts now available for long-distance bookings.",
    "Self-drive rentals rise in popularity among young travellers.",
    "5 scenic destinations perfect for a road trip this season.",
    "All vehicles now updated with enhanced safety checks."
  ];

  const handleCommentChange = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    alert('Thank you for your comment!');
    setCommentForm({
      name: '',
      email: '',
      comment: '',
      rating: 5
    });
  };

  if (loading && !blog) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Loading blog details...</p>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section-about">
        <Container>
          <Row className="align-items-center banner-gap">
            <Col lg={6}>
              <img src="/img/img_blog.png" alt="Blog Details" className="img-fluid" />
            </Col>
            <Col lg={6}>
              <h1>Blog <span className="highlight">Details</span></h1>
              <p className="lead mt-3">
                Read our latest insights and tips about car rentals and travel.
              </p>
              <nav className="breadcrumb-custom mt-3">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
                <span className="mx-2 text-white">::</span>
                <Link to="/blogs" className="text-white text-decoration-none">Our Blogs</Link>
                <span className="mx-2 text-white">::</span>
                <span style={{color: '#ff6b35'}}>Blog Details</span>
              </nav>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Content - Blog Details */}
      <section className="blog-content-details">
        <Container>
          {error && <Alert variant="warning">{error}</Alert>}
          
          <Row>
            {/* Main Blog Post */}
            <Col lg={8}>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="warning" />
                  <p className="mt-3">Loading blog content...</p>
                </div>
              ) : blog && (
                <div className="blog-post-card">
                  <img 
                    src={blog.image} 
                    alt="Blog Post" 
                    className="blog-post-image" 
                  />
                  
                  <div className="blog-post-meta">
                    <span className="date-badge">{blog.date}</span>
                    <span className="author-info">
                      <FaUser className="me-1" /> By {blog.author}
                    </span>
                    <span className="comments-info">
                      <FaComments className="me-1" /> {blog.commentsCount || 0} Comments
                    </span>
                  </div>

                  <div className="blog-post-content">
                    <h2>{blog.title}</h2>
                    
                    <div 
                      className="blog-content mt-4"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                    
                    <div className="blog-images">
                      <img 
                        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400" 
                        alt="Car Interior" 
                        className="img-fluid"
                      />
                      <img 
                        src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400" 
                        alt="Car Exterior" 
                        className="img-fluid"
                      />
                    </div>
                    
                    {/* Author Box */}
                    <div className="author-box">
                      <img 
                        src="https://i.pravatar.cc/60?img=12" 
                        alt="Author" 
                        className="author-avatar" 
                      />
                      <div>
                        <p className="author-name">Ricky Johnson</p>
                        <p className="author-bio">Travel Expert & Automobile Writer</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            {/* Sidebar */}
            <Col lg={4}>
              {/* Latest News Widget */}
              <div className="sidebar-widget">
                <h4 className="widget-title">Latest News</h4>
                <ul className="widget-list">
                  {latestNews.map((news, index) => (
                    <li key={index}>{news}</li>
                  ))}
                </ul>
              </div>

              {/* Popular Posts */}
              <div className="sidebar-widget">
                <h4 className="widget-title">Popular Posts</h4>
                
                {blogs.slice(0, 5).map((post) => (
                  <div className="popular-post-item" key={post.id}>
                    <img src={post.image} alt="Post" />
                    <div>
                      <div className="popular-post-date">
                        <FaCalendar className="me-1" /> {post.date}
                      </div>
                      <div className="popular-post-title">{post.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Comments Section */}
      <section className="comments-section">
        <Container className="comment-sec">
          <Row>
            <Col md={6}>
              <div className="comments-section">
                <h3 className="section-title">Leave A <span className="orange-text">Comment.</span></h3>
                <form className="comment-form" onSubmit={handleSubmitComment}>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Your Name*" 
                    name="name"
                    value={commentForm.name}
                    onChange={handleCommentChange}
                    required 
                  />
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Email Address" 
                    name="email"
                    value={commentForm.email}
                    onChange={handleCommentChange}
                    required 
                  />
                  <textarea 
                    className="form-control" 
                    placeholder="Your Comment*" 
                    name="comment"
                    value={commentForm.comment}
                    onChange={handleCommentChange}
                    required
                  ></textarea>
                  <button type="submit" className="submit-btn">Leave Comment</button>
                </form>
              </div>
            </Col>

            <Col md={6}>
              <div className="comments-section">
                <h3 className="section-title">Comment <span className="orange-text">List.</span></h3>
                
                {comments.map((comment) => (
                  <div className="comment-item" key={comment.id}>
                    <img 
                      src={comment.avatar} 
                      alt={comment.name} 
                      className="comment-avatar" 
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="comment-author">{comment.name}</div>
                          <div className="comment-role">{comment.role}</div>
                        </div>
                        <span className="comment-date">
                          <FaCalendar className="me-1" /> {comment.date}
                        </span>
                      </div>
                      <p className="comment-text">{comment.comment}</p>
                      <div className="comment-rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < comment.rating ? 'fas' : 'far'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      
    </>
  );
};

export default BlogDetailsPage;