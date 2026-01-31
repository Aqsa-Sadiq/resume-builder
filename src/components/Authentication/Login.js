import React, { useState } from 'react';
import './Login.css';
import { useAuth } from './useAuth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [returningUser, setReturningUser] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (returningUser) {
      const res = await auth.signIn(data.email, data.password);
      if (res) navigate('/resume-builder');
    } else {
      const res = await auth.signUp(data.email, data.password, data.name);
      if (res) navigate('/resume-builder');
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
          /* ================= LOGIN ================= */
          <form onSubmit={handleSubmit(onSubmit)} className="py-3">
            <h3 className="text-center mb-3">Welcome Back</h3>

            <input
              className="form-control mb-2"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}

            <button className="btn btn-primary btn-block mt-3">
              Sign In
            </button>

            <button
              type="button"
              className="btn btn-success btn-block mt-2"
              onClick={auth.signInWithGoogle}
            >
              Sign in with Google
            </button>

            <p
              className="text-center mt-3 link"
              onClick={() => setReturningUser(false)}
            >
              Create new account
            </p>
          </form>
        ) : (
          /* ================= SIGNUP ================= */
          <form onSubmit={handleSubmit(onSubmit)} className="py-3">
            <h3 className="text-center mb-3">Create Account</h3>

            <input
              className="form-control mb-2"
              placeholder="Full Name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <input
              className="form-control mb-2"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 characters',
                },
              })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Confirm Password"
              {...register('confirm_password', {
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
            />
            {errors.confirm_password && (
              <p className="error">{errors.confirm_password.message}</p>
            )}

            <button className="btn btn-primary btn-block mt-3">
              Sign Up
            </button>

            <p
              className="text-center mt-3 link"
              onClick={() => setReturningUser(true)}
            >
              Already have an account?
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
