/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchUserData, selectIsAuth } from "../redux/slices/auth";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit, //funstion provided by the hook itself
    setError,
    formState: { errors, isvalid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode:"all",
  });

  const onSubmit =async (values) => {
 const data = await dispatch(fetchUserData(values));
 if(!data.payload)
 {return  alert("Could not authorize!");}
 if('token' in data.payload) {
  window.localStorage.setItem('token', data.payload.token)
 }
  
  };

  
if(isAuth){
  return <Navigate to='/'/>
}
  return (
    <section className="login-wrapper p-5">
      <div className="container-xxl">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-8 col-sm-10">
            <div className="card">
              <div className="card-body p-5">
                <h2 className="text-center">LOGIN</h2>
                <p className="text-center mb-4">Welcome Back!!</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label mb-3">
                      Enter Your Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="enter email here ..."
                      // value={email}
                      // onChange={(event) => setEmail(event.target.value)}
                      {...register("email", { required: "Add email!" })}
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label mb-3">
                      Enter Your password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="enter password here..."
                      {...register("password", { required: "Add password!" })}
                      // value={password}
                      // onChange={(event) => setPassword(event.target.value)}
                    />
                    {errors.password && (
                      <p className="text-danger">{errors.password.message}</p>
                    )}
                  </div>
                  {/* {error && <div className="alert alert-danger">{error}</div>} */}
                  {/* <div className="mb-3">
                      <Link to="/forgotpasword" className="form-link">
                        Forgot password?
                      </Link>
                    </div> */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="m-0">Dont have an account?</p>
                    <Link to="/signup" className="form-link">
                      Sign up
                    </Link>
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [error, setError] = useState('');

// const handleSubmit = (event) => {
//   event.preventDefault();
//   if (password == '') {
//     setError('Please enter correct details!');
//   } else {
//     // TODO: Send signup request to server
//     setError('Login successful');
//     setEmail('');
//     setPassword('');
//   }
// };
