/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { loginUser } from '../../redux/action/login';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postData = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    let data = {
      email,
      password,
    };
    dispatch(loginUser(data, navigate));
  };
  return (
    <Container>
      <div className='d-flex mt-5 justify-content-center'>
        <h3 className='text-danger mx-2 mt-2'>Blanja</h3>
      </div>

      <h5 className='d-flex mt-5 justify-content-center'>
        Please login with your account
      </h5>
      <Form onSubmit={postData}>
        <Form.Group className=' d-flex justify-content-center'>
          <Form.Control
            className='mb-3 mt-3'
            style={{ width: 400 }}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email'
          />
        </Form.Group>
        <Form.Group className=' d-flex justify-content-center'>
          <Form.Control
            type='password'
            style={{ width: 400 }}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
        </Form.Group>
        <Link to='/ResetPW'>
          <a className='text-danger mt-5 d-flex justify-content-center' href=''>
            Forgot password?
          </a>
        </Link>
        <div className=' d-flex justify-content-center mt-3'>
          <Button
            className='rounded-pill'
            style={{ width: 400 }}
            variant='danger'
            type='submit'
          >
            Submit
          </Button>
        </div>

        <p className=' d-flex justify-content-center mt-4'>
          Don't have a Blanja account?
          <Link to='/SignUp_cus'>
            <a className='text-danger' href=''>
              Register
            </a>
          </Link>{' '}
        </p>
      </Form>
    </Container>
  );
}
