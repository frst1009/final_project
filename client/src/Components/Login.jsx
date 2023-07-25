import { Input, Button } from 'antd';
import { useFormik } from 'formik';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { handlerLogInOut } = useContext(AuthContext);
  const { handleSubmit, handleChange, touched, values, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (data) => {
      try {
        const res = await axios.post('http://localhost:3040/api/user/login', data);
        if (res.status === 200) {
          const { token } = res.data;
          alert('You have logged in successfully');
          handlerLogInOut(true, navigate('/'), token);
          return
        }
      } catch (error) {
        console.log(error);
        alert('Login failed. Please try again.');
      }
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helpertext={touched.email && errors.email}
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helpertext={touched.password && errors.password}
          />
        </div>
        <div>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
