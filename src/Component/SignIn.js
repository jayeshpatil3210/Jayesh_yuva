import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { geUserLogin } from '../Redux/Action';

const SignIn = () => {
    const navigate = useNavigate();
  if(!localStorage.getItem("login")){
    localStorage.setItem("login",false)
  }
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
const dispatch =useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(geUserLogin(values))
        if (values.email === "admin@gmail.com") {
            // navigate("/dashboard")
            // Allow access to the dashboard, you can redirect or perform other actions here
            console.log("Login successful. Redirecting to the dashboard...");
          } else {
            // Display an error message for incorrect credentials
            console.error("Incorrect credentials. Please enter the right email.");
            // You can also set an error state in formik to display the error in the UI
            formik.setErrors({ email: "Incorrect credentials" });
          }

          if (values.password === "admin") {
            console.log("Password matched");
          } else {
            console.error("Incorrect password");
            formik.setErrors({ password: "Incorrect password" });
          }
      console.log('Form submitted with values:', values);
      navigate("/user")
    },
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 style={{ textAlign: 'center', textTransform: 'uppercase', margin: '0px', paddingTop: '5px', paddingBottom: '5px' }}>Sign In</h4>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group" style={{ textAlign: 'left', paddingBottom: '10px' }}>
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div style={{ color: 'red' }}>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group" style={{ textAlign: 'left', paddingBottom: '10px' }}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div style={{ color: 'red' }}>{formik.errors.password}</div>
                  ) : null}
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
