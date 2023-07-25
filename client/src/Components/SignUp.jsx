import { Typography, Input, Button, Alert } from 'antd';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SignUp = () => {
  const navigate = useNavigate();

  const { handleSubmit, handleChange, touched, values, errors } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
   
    onSubmit: async ({ username, email, password }) => {
      console.log("hello");
      try {
        const res = await axios.post('http://localhost:3040/api/user/register', {
          email,
          password,
          username,
        });
        console.log("Registration successful");
        navigate('/login');
      } catch (error) {
        console.log("error");
      }
    },
  });

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <Title level={5} strong>
          Sign Up
        </Title>
        <Text type="secondary">Please fill this form to create an account!</Text>
      </div>
      <div>
        {errors.general && <Alert type="error" message={errors.general} />}
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          placeholder="Enter your username"
          onChange={handleChange}
          value={values.username}
          error={touched.username && Boolean(errors.username)}
          helpertext={touched.username && errors.username}
        />
        <Input
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={values.email}
          error={touched.email && Boolean(errors.email)}
          helpertext={touched.email && errors.email}
        />
        <Input.Password
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={values.password}
          error={touched.password && Boolean(errors.password)}
          helpertext={touched.password && errors.password}
        />
        <div style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
