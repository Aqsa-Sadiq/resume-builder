import React, { useState } from 'react';
import './Login.css';
import { useAuth } from './useAuth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [returningUser, setReturningUser] = useState(false);
  const auth = useAuth();

  // ✅ React Hook Form v7+ syntax
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (returningUser) {
      if (data.email && data.password) {
        auth.signIn(data.email, data.password);
      }
    } else {
      if (data.name && data.email && data.password && data.confirm_password) {
        auth.signUp(data.email, data.confirm_password, data.name);
      }
    }
  };

  return (
    <div className="sign-up">
      <div className="container">
        <div className="text-center py-4">
          <Link to="/" className="text-info nav-link">
            <h2>Resume Builder</h2>
          </Link>
        </div>

        {returningUser ? (
          <form onSubmit={handleSubmit(onSubmit)} className="py-3">
            <h1 className="lead text-center py-3">Welcome back!</h1>
            {auth.user?.error && <p className="text-danger">* {auth.user.error}</p>}

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Sign In
              </button>
            </div>

            <div className="text-center my-0">
              <label> or </label>
            </div>

            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={auth.signInWithGoogle}
            >
              Sign in with Google
            </button>

            <div className="option text-center my-3">
              <label onClick={() => setReturningUser(false)}>
                Create a new Account
              </label>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="py-2">
            {auth.user?.error && <p className="text-danger">* {auth.user.error}</p>}

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Name"
                {...register('name', {
                  required: 'Name is required',
                  pattern: {
                    value: /^(?=^.{6,20}$)^[a-zA-Z-]+\s[a-zA-Z-]+$/i,
                    message: 'Name must be 6 - 20 characters & Minimum 2 words',
                  },
                })}
              />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&;:])[A-Za-z\d@$!%*#?&;:]{8,}$/i,
                    message:
                      'Minimum eight characters, at least one letter, one number and one special character',
                  },
                })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                {...register('confirm_password', {
                  validate: (value) => value === watch('password'),
                })}
              />
              {errors.confirm_password && <span className="error">Passwords don't match.</span>}
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Sign Up
              </button>
            </div>

            <div className="option text-center my-3">
              <label onClick={() => setReturningUser(true)}>
                Already Have an Account
              </label>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
