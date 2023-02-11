import axios from 'axios';

export const RegisterUsers = (data, navigate) => async (dispact) => {
  try {
    dispact({ type: 'USER_register_PENDING' });
    const result = await axios.post(
      `${process.env.REACT_APP_URL_BACKEND}/users/register`,
      data
    );
    const user = result.data.data;
    console.log(result);
    // localStorage.setItem("DATA",user.data)
    dispact({ type: 'USER_register_SUCCESS', payload: user });
    navigate('/login');
    console.log('user register success');
  } catch (error) {
    console.log('user register error');
    console.log(error);
  }
};
