
// import React from 'react';
// import style from './home.css';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Card } from 'react-bootstrap';

// export default function Home() {
//   const [data, setData] = useState([]);

//   let url = `${process.env.REACT_APP_URL_BACKEND}/products?search=${inputData.search}&limit=100`;
//   const getData = () => {
//     let token = localStorage.getItem('token');
//     let id = localStorage.getItem('id');
//     console.log('my id', id);
//     console.log('my token', token);
//     axios
//       .get(url)
//       .then((res) => {
//         console.log('get data success');
//         console.log(res.data.data);
//         res.data && setData(res.data.data);
//         !selected && setMessageShow(true);
//         !selected &&
//           setMessage({
//             title: 'success',
//             text: 'get data success',
//             type: 'success',
//           });
//         !selected && messageTime();
//         setSelected(null);
//       })
//       .catch((err) => {
//         console.log('get data fail');
//         console.log(err);
//         setData([]);
//         err.response.data.message == 'server need token' &&
//           setMessageShow(true);
//         err.response.data.message == 'server need token' &&
//           setMessage({
//             title: 'belum login',
//             text: 'user must login',
//             type: 'danger',
//           });

//         err.response.data.message !== 'server need token' &&
//           setMessageShow(true);
//         err.response.data.message !== 'server need token' &&
//           setMessage({ title: 'fail', text: 'get data fail', type: 'danger' });

//         messageTime();
//       });
//   };
    
//   return (
//     <div>
//       <div className={style.luar}>
//         {data.map((item) => (
//           <Card
//             // className="card shadow-sm"
//             className={style.card}
//             // style={{
//             //   border: "5px",
//             //   width: "250px",
//             //   marginLeft: "13px",
//             //   textDecoration: "none",
//             //   color: "#000000",
//             // }}
//             to={`/product-detail/${item.id}`}
//             as={Link}
//           >
//             {/* style={{ width: "10rem" }}> */}

//             <div className='d-flex justify-content-center'>
//               <img
//                 src={item.photo}
//                 style={{ width: '150px', height: '150px', marginTop: '10px' }}
//               ></img>
//             </div>
//             <p className='fs-4' style={{ margin: '10px' }}>
//               {item.name}
//             </p>
//             <p className='text-danger fs-4' style={{ margin: '10px' }}>
//               Rp. {item.price}
//             </p>
//             <p className='fs-6' style={{ margin: '10px' }}>
//               Revan Store
//             </p>
//           </Card>
//         ))}
//       </div>
//       {/* <DarkVariantExample/> */}
//     </div>
//   );
// }
