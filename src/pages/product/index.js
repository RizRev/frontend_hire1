import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
// import styles from './Product.module.css';
// import Alert from '../../components';
// import Addproduct from '../../components/Add Product/addproduct';

export default function Product() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var id = localStorage.getItem('id');
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState({
    title: '',
    text: '',
    type: 'success',
  });
  const [messageShow, setMessageShow] = useState(true);
  const [inputData, setInputData] = useState({
    // users_id: id,
    id: '',
    name: '',
    stock: '',
    price: '',
    search: '',
    page: ''
  });
  const [selected, setSelected] = useState(null);
  const [onedit, setOnedit] = useState(false);
  const [temp, setTemp] = useState(null);

  const deleteData = () => {
    axios
      .delete(`${process.env.REACT_APP_URL_BACKEND}/products/${selected}`)
      .then((res) => {
        console.log('delete data success');
        console.log(res);
        setMessageShow(true);
        setMessage({
          title: 'success',
          text: 'delete data success',
          type: 'success',
        });
        messageTime();
        handleClose()
        getData();
      })
      .catch((err) => {
        console.log('delete data fail');
        console.log(err);
        setMessageShow(true);
        setMessage({ title: 'fail', text: 'delete data fail', type: 'danger' });
        messageTime();
      });
  };

  const editForm = (item) => {
    console.log(item);
    setTemp(item);
    setInputData({
      ...inputData,
      name: item.name,
      stock: item.stock,
      price: item.price,
      price_sold: item.price_sold,
    });
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

  const messageTime = () => {
    setTimeout(() => setMessageShow(false), 4000);
  };
  useEffect(() => {
    console.log('checked');
    getData();
  }, [inputData.search,inputData.page]);
  useEffect(() => {
    getData();
  }, []);

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

  return (
    <div>
      {/* <Addproduct/> */}

      {/* post data */}
      <form
        onSubmit={postForm}
        className='container mt-3 p-2 border border-3 rounded border-danger '
      >
        {onedit ? <h4>Edit Product</h4> : <h4>Add Product</h4>}
        {/* <h4>Add Recipe</h4> */}
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

      {/* filter */}
      <div className='container bg-danger mt-2 p-2 rounded'>
        Filter
        <div className='container d-flex flex-row'>
          {/* <div className=''>
            <div
              className={`btn ${
                sortBy == 'name' ? 'btn-light' : 'btn-danger'
              } ms-1`}
              onClick={() => setSortBy('name')}
            >
              name
            </div>
            <div
              className={`btn ${
                sortBy == 'stock' ? 'btn-light' : 'btn-danger'
              } ms-1`}
              onClick={() => setSortBy('stock')}
            >
              stock
            </div>
            <div
              className={`btn ${
                sortBy == 'price' ? 'btn-light' : 'btn-danger'
              } ms-1`}
              onClick={() => setSortBy('price')}
            >
              price
            </div>
          </div>
          <div className='ms-1 border-start border-dark'>
            <div
              className={`btn ${
                sort == 'asc' ? 'btn-light' : 'btn-danger'
              } ms-1`}
              onClick={() => setSort('asc')}
            >
              asc
            </div>
            <div
              className={`btn ${
                sort == 'desc' ? 'btn-light' : 'btn-danger'
              } ms-1`}
              onClick={() => setSort('desc')}
            >
              desc
            </div>
          </div> */}
          <div className='search ms-2'>
            <input
              type='text'
              className='form-control'
              value={inputData.search}
              name='search'
              onChange={handleChange}
              placeholder='search'
            />
          </div>
          <div className='search ms-2'>
            <input
              type='text'
              className='form-control'
              value={inputData.page}
              name='page'
              onChange={handleChange}
              placeholder='page'
            />
          </div>
        </div>
      </div>

      {/* get data */}
      <table className='table container'>
        <thead>
          <tr>
            <th>id</th>
            <th>nama</th>
            <th>stock</th>
            <th>harga</th>
            <th>harga jual</th>
            <th>photo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index + 1}
              className={`${item.product_id == selected ? 'bg-info' : 'bg-white'}`}
              onClick={
                item.product_id == selected
                  ? () => setSelected(null)
                  : () => (setSelected(item.product_id), editForm(item))
              }
            >
              <td>{index + 1}</td>
              <td>{item.product_name}</td>
              <td>{item.stock}</td>
              <td>{item.price}</td>
              <td>{item.price_sold}</td>
              <td>
                <img src={item.photo} style={{width:"35px"}}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* delete data */}
      {selected && (
        <div className='container'>
          <button
            className='btn btn-danger mx-auto col-12'
            onClick={handleShow}
            // onClick={() => deleteData()}
          >
            delete {temp?.product_name ?? ''}
          </button>
        </div>
      )}

      {/* <Button variant='danger' onClick={handleShow}>
        delete modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Data</Modal.Title>  
        </Modal.Header> 
        <Modal.Body>
          Are you sure delete this data?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={()=>deleteData()}>Yes</Button>
        </Modal.Footer>
      </Modal>

      {/* alert */}
      {/* {messageShow && (
        // <Alert title={message.title} text={message.text} type={message.type} />
      )} */}
    </div>
  );
}
