import * as React from 'react';
import { useState, useRef } from 'react';
import { Form, Card, Button, Alert, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const prefixOptions = ["+1", "+44","+48", "+49", "+81", "+86", "+91", "+971"];

export default function Signup (props) {
  const [prefix, setPrefix] = useState("+48");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const nipRef = useRef(null);
  const phoneRef = useRef(null);
  const roleRef = useRef(null);
  const {signup} = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();
  const {textColor} = props;

  const handlePrefixSelect = (selectedPrefix) => {
    setPrefix(selectedPrefix);
  };
 async function handleSubmit (e) {
    e.preventDefault();
    setError('');
    if (passwordRef?.current && passwordRef?.current.value.length < 7) {
      return setError('Password should be at least 7 characters long!');
    }
    if (passwordRef?.current && passwordConfirmRef?.current) {
      if (passwordRef?.current.value !== passwordConfirmRef?.current.value) {
        return setError('Passwords do not match!');
      }
    }
    if (nipRef?.current && nipRef?.current.value.length !== 10) {
      return setError('NIP should be 10 characters long! only numbers');
    }
    if (phoneRef?.current && phoneRef?.current.value.length !== 9) {
      return setError('Phone number should be 9 characters long! only numbers');
    }

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordConfirm: passwordConfirmRef.current.value,
      nip: nipRef.current.value,
      phone: prefix + phoneRef.current.value,
      role: roleRef.current.value,
    };
    props.onSubmit(formData);
  }

  React.useEffect(() => {
    setError(props.errorCall);
  }, [props.errorCall]);

  return (
    <>
      <Card className="card-style">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
                  
          {error && <Alert variant="danger" className="alert alert-danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required placeholder="Enter your email" />
          </Form.Group>
          <Form.Group className="mt-1" id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required placeholder="Enter your password" />
          </Form.Group>
          <Form.Group className="mt-1 mb-1" id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required placeholder="Confirm your password" />
          </Form.Group>
          <Form.Group className="mt-1" id="nip">
            <Form.Label>NIP</Form.Label>
            <Form.Control type="text" ref={nipRef} required placeholder="Enter your NIP" />
          </Form.Group>
          <Form.Group className="mt-1" id="phone">
            <Form.Label>Phone</Form.Label>
            <InputGroup>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={prefix}
                id="prefix-dropdown"
              >
                {prefixOptions.map((option) => (
                  <Dropdown.Item key={option} onClick={() => handlePrefixSelect(option)}>
                    {option}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <Form.Control
                type="text"
                ref={phoneRef}
                minLength={9}
                maxLength={9}
                placeholder="Enter your phone number"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mt-1" id="role">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" ref={roleRef} required defaultValue="">
              <option value="" disabled>Select role</option>
              <option value="Administrator">Administrator</option>
              <option value="Dyrektor">Dyrektor</option>
              <option value="Inspektor">Inspektor</option>
              <option value="Kierownik">Kierownik</option>
              <option value="Księgowy">Księgowy</option>
              <option value="Pełnomocnik">Pełnomocnik</option>
            </Form.Control>
          </Form.Group>
            <Button style={{color: textColor}} disabled={props.loading} className="w-100 mt-3" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>

        <div className='w-100 text-center'>
          Already have an account? <Link to="/signin">Sign In</Link>

        </div>
      </Card>
      </>
  );
}
