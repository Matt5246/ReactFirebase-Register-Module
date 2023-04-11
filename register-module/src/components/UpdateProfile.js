import * as React from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const passwordConfirmRef = React.useRef(null);
  const {currentUser, updateMyEmail, updateMyPassword} = useAuth();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

    function handleSubmit (e) {
    e.preventDefault();
    if (passwordRef.current && passwordConfirmRef.current) {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError('Passwords do not match');
      }
    }
    
    const promises = [];
    setLoading(true);
    setError('');
    if (emailRef.current && currentUser.email !== emailRef.current.value) {
        promises.push(updateMyEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
        promises.push(updateMyPassword(passwordRef.current.value));
    }
    Promise.all(promises).then(() => {
        navigate('/');
    }).catch(() => {
        setError('Failed to update account');
    }).finally(() => {
        setLoading(false);
    });

    
  }
  
  return (
    <>
      <Card className="card-style">
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
                  
          {error && <Alert variant="danger" className="alert alert-danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required 
              defaultValue={currentUser.email}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} 
              placeholder="Leave blank to keep the same"/>
            </Form.Group>
            <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"/>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>

        <div className='w-100 text-center'>
          <Link to="/">Cancel</Link>

        </div>
      </Card>
    </>
  );
}
