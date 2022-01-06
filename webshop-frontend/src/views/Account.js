import { Container, Form, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Account = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const { user } = useContext(UserContext);

  const updateOldPassword = (e) => setOldPassword(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateRePassword = (e) => setRePassword(e.target.value);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    axios
      .post(
        'http://127.0.0.1:8000/api/users/set_password/',
        {
          current_password: oldPassword,
          new_password: password,
          re_new_password: rePassword,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(async (res) => {
        console.log('password changed');
        setSuccess(true)
        window.setTimeout(() => {
          setSuccess(false);
        }, 4000);
      })
      .catch((e) => {
        setErrorMsg('The provided information was not correct, please try again');
        window.setTimeout(() => {
          setErrorMsg('');
        }, 4000);
      });
  };
  if (!user) {
    return (
      <Container className="form-input justify-content-md-center">
        <h4>Please log in before accessing this page.</h4>
      </Container>
    );
  }

  return (
    <Container className="form-input justify-content-md-center">
      <Header text="Reset password" />
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {success && <Alert variant="success">Password reset successful!</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Current password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Current password"
            name="oldPassword"
            onChange={updateOldPassword}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New password"
            name="password"
            onChange={updatePassword}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Retype new password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Retype new Password"
            name="rePassword"
            onChange={updateRePassword}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Sign in!
        </Button>
      </Form>
    </Container>
  );
};

export default Account;
