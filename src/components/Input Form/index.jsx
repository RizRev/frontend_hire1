import React from 'react'
import { Modal,Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import axios from 'axios';



export default function Input() {

const [show, setShow] = useState(false)

const [data, setData] = useState([]);
const [photo, setPhoto] = useState(null);

const [message, setMessage] = useState({
    title: '',
    text: '',
    type: 'success',
  });
  const [messageShow, setMessageShow] = useState(true);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [onedit, setOnedit] = useState(false);
const [selected, setSelected] = useState(null);

const messageTime = () => {
    setTimeout(() => setMessageShow(false), 4000);
  };

const [inputData, setInputData] = useState({
    // users_id: id,
    id: '',
    name: '',
    stock: '',
    price: '',
    search: '',
    page: ''
  });

  let url = `${process.env.REACT_APP_URL_BACKEND}/products?search=${inputData.search}&page=${inputData.page}`;
  const getData = () => {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');
    console.log('my id', id);
    console.log('my token', token);
    axios
      .get(url)
      .then((res) => {
        console.log("url",url)
        console.log('get data success');
        console.log(res.data.data);
        res.data && setData(res.data.data);
        !selected && setMessageShow(true);
        !selected &&
          setMessage({
            title: 'success',
            text: 'get data success',
            type: 'success',
          });
        !selected && messageTime();
        setSelected(null);
      })
      .catch((err) => {
        console.log('get data fail');
        console.log(err);
        setData([]);
        err.response.data.message == 'server need token' &&
          setMessageShow(true);
        err.response.data.message == 'server need token' &&
          setMessage({
            title: 'belum login',
            text: 'user must login',
            type: 'danger',
          });

        err.response.data.message !== 'server need token' &&
          setMessageShow(true);
        err.response.data.message !== 'server need token' &&
          setMessage({ title: 'fail', text: 'get data fail', type: 'danger' });

        messageTime();
      });
  };

  const postForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', inputData.id);
    formData.append('name', inputData.name);
    formData.append('stock', inputData.stock);
    formData.append('price', inputData.price);
    formData.append('price_sold', inputData.price_sold);
    formData.append('photo', photo);
    console.log(formData);
    if (!selected) {
      let token = localStorage.getItem('token');
      axios
        .post(
          `${process.env.REACT_APP_URL_BACKEND}/products`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          console.log('input data success');
          console.log(res);
          setMessageShow(true);
          setMessage({
            title: 'success',
            text: 'post data success',
            type: 'success',
          });
          messageTime();
          getData();
        })
        .catch((err) => {
          console.log('input data fail');
          setMessageShow(true);
          setMessage({ title: 'fail', text: 'post data fail', type: 'danger' });
          messageTime();
          console.log(err);
        });
    } else {
      axios
        .put(
          `${process.env.REACT_APP_URL_BACKEND}/products/${selected}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          console.log('input data success');
          console.log(res);
          setMessageShow(true);
          setMessage({
            title: 'success',
            text: 'update data success',
            type: 'success',
          });
          messageTime();
          getData();
        })
        .catch((err) => {
          console.log('input data fail');
          setMessageShow(true);
          setMessage({ title: 'fail', text: 'post data fail', type: 'danger' });
          messageTime();
          console.log(err);
        });
    }
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

useEffect(() => {
    selected ? setOnedit(true) : setOnedit(false);
    !selected &&
      setInputData({
        ...inputData,
        id: '',
        name: '',
        stock: '',
        price: '',
        price_sold: '',
      });
    !selected && setPhoto(null);
  }, [selected]);

  return (
    <div>
    
      ini input
      {onedit ? (
          <button className='btn btn-danger' type='submit' onClick={handleShow()}>
            update
          </button>
        ) : (
          <button className='btn btn-danger' type='submit'onClick={handleShow()}>
            post
          </button>
        )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>  
        </Modal.Header> 
        <Modal.Body>
        <form onSubmit={postForm}>
        <input
          className='form-control'
          style={{ marginBottom: '15px' }}
          type='text'
          value={inputData.name}
          name='name'
          onChange={handleChange}
          placeholder='nama'
        />
        <input
          className='form-control'
          style={{ width: '45%', marginBottom: '15px' }}
          type='number'
          value={inputData.stock}
          name='stock'
          onChange={handleChange}
          placeholder='stock'
        />
        <input
          className='form-control'
          type='number'
          style={{ width: '45%', marginBottom: '15px' }}
          value={inputData.price}
          name='price'
          onChange={handleChange}
          placeholder='price'
        />
        <input
          className='form-control'
          type='number'
          style={{ width: '45%', marginBottom: '15px' }}
          value={inputData.price_sold}
          name='price_sold'
          onChange={handleChange}
          placeholder='price_sold'
        />
        <input
          className='form-control'
          type='file'
          name='photo'
          onChange={handlePhoto}
          style={{ marginBottom: '15px' }}
          placeholder='photo'
          required
        />
        {onedit ? (
          <button className='btn btn-danger' type='submit'>
            update
          </button>
        ) : (
          <button className='btn btn-danger' type='submit'>
            post
          </button>
        )}
        </form>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger'>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
