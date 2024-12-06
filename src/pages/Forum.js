// src/pages/Forum.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Button,
  Form,
  Card,
  Image,
  Tabs,
  Tab,
  InputGroup,
  FormControl,
  Row,
  Col,
} from 'react-bootstrap';
import '../styles/forum.css'; // Custom styling

const Forum = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  // Define available communities
  const communities = ['Training', 'Health', 'Adoption', 'Grooming'];

  // Initial posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      community: 'Training',
      author: 'John Doe',
      title: 'Tips for training a puppy?',
      content: 'Does anyone have tips for potty training a new puppy?',
      image: '',
      likes: 10,
      comments: [
        {
          id: 1,
          author: 'Jane Smith',
          content: 'Use positive reinforcement!',
          image: '',
        },
      ],
    },
    // Add more initial posts as needed
  ]);

  // State for new post creation
  const [newPost, setNewPost] = useState({
    community: '',
    title: '',
    content: '',
    image: '',
  });

  // Modal visibility state
  const [showModal, setShowModal] = useState(false);

  // Active community tab
  const [activeCommunity, setActiveCommunity] = useState(communities[0]);

  // Search query state
  const [searchQuery, setSearchQuery] = useState('');

  // Handlers for Modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewPost({ community: '', title: '', content: '', image: '' });
  };

  // Handle new post submission
  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please log in to create a post.');
      navigate('/login');
      return;
    }

    if (!newPost.community) {
      alert('Please select a community.');
      return;
    }

    const post = {
      id: posts.length + 1,
      community: newPost.community,
      author: 'Current User', // Replace with actual user data
      title: newPost.title,
      content: newPost.content,
      image: newPost.image,
      likes: 0,
      comments: [],
    };

    setPosts([post, ...posts]);
    handleCloseModal();
  };

  // Handle liking a post
  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    );
    setPosts(updatedPosts);
  };

  // Handle adding a comment
  const handleAddComment = (postId) => {
    if (!isAuthenticated) {
      alert('Please log in to comment.');
      navigate('/login');
      return;
    }

    const commentContent = prompt('Enter your comment:');
    if (commentContent) {
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  author: 'Current User', // Replace with actual user data
                  content: commentContent,
                  image: '',
                },
              ],
            }
          : post
      );
      setPosts(updatedPosts);
    }
  };

  // Handle image upload in new post
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewPost({ ...newPost, image: imageUrl });
    }
  };

  // Filter posts based on active community and search query
  const filteredPosts = posts.filter(
    (post) =>
      post.community === activeCommunity &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container my-5">
      <h1 className="display-4 text-center mb-4">Community Forum</h1>

      {/* Search Bar and Create Post Button */}
      <Row className="mb-4 align-items-center">
        <Col md={4} sm={12}>
          <InputGroup>
            <FormControl
              placeholder="Search posts..."
              aria-label="Search posts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={8} sm={12} className="mt-3 mt-md-0 text-md-end">
          <Button variant="primary" onClick={handleShowModal}>
            Create New Post
          </Button>
        </Col>
      </Row>

      {/* Communities as Tabs */}
      <Tabs
        id="communities-tabs"
        activeKey={activeCommunity}
        onSelect={(k) => {
          setActiveCommunity(k);
          setSearchQuery(''); // Reset search on tab change
        }}
        className="mb-3"
        justify
        variant="tabs" // Changed from "pills" to "tabs"
      >
        {communities.map((community) => (
          <Tab eventKey={community} title={community} key={community}>
            {/* Posts for the selected community */}
            <div className="row">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div className="col-md-6 mb-4" key={post.id}>
                    <Card className="h-100 shadow-sm">
                      {post.image && (
                        <Card.Img variant="top" src={post.image} />
                      )}
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                        <small className="text-muted">
                          Posted by {post.author}
                        </small>
                        <div className="mt-auto d-flex justify-content-between align-items-center">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                          >
                            Like ({post.likes})
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleAddComment(post.id)}
                          >
                            Reply
                          </Button>
                        </div>

                        {/* Comments */}
                        {post.comments.length > 0 && (
                          <div className="mt-3 comments-section">
                            <h6>Comments:</h6>
                            {post.comments.map((comment) => (
                              <Card
                                key={comment.id}
                                className="mb-2 comment-card"
                              >
                                <Card.Body>
                                  <Card.Text>{comment.content}</Card.Text>
                                  <small className="text-muted">
                                    — {comment.author}
                                  </small>
                                </Card.Body>
                              </Card>
                            ))}
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                ))
              ) : (
                <p className="text-center">No posts found.</p>
              )}
            </div>
          </Tab>
        ))}
      </Tabs>

      {/* Create Post Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewPostSubmit}>
            {/* Community Selection */}
            <Form.Group className="mb-3" controlId="formCommunity">
              <Form.Label>Community</Form.Label>
              <Form.Control
                as="select"
                value={newPost.community}
                onChange={(e) =>
                  setNewPost({ ...newPost, community: e.target.value })
                }
                required
              >
                <option value="">Select a Community</option>
                {communities.map((community) => (
                  <option value={community} key={community}>
                    {community}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Post Title */}
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter post title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                required
              />
            </Form.Group>

            {/* Post Content */}
            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter post content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                required
              />
            </Form.Group>

            {/* Image Upload */}
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Upload Image (optional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {newPost.image && (
                <Image
                  src={newPost.image}
                  alt="Post Preview"
                  thumbnail
                  className="mt-3"
                />
              )}
            </Form.Group>

            {/* Modal Actions */}
            <div className="text-end">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Post
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Forum;
