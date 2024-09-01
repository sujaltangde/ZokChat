import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FaGoogle } from 'react-icons/fa';

type UserData = {
  usernameOrEmail: string;
  password: string;
};

const Login: React.FC = () => {
  // Initialize useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>({
    mode: 'onTouched', // Trigger validation when the field is touched
  });

  // Form submission handler
  const onSubmit: SubmitHandler<UserData> = (data) => {
    console.log({ data });
  };

  return (
    <div className="min-h-screen h-screen w-full">
      <div className="flex justify-center h-full items-center pb-8">
        <div className="xl:w-1/3 w-full xl:mx-0 mx-10 shadow-md rounded-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 items-center py-4 px-5 border border-gray-100">
            <p className="text-3xl mt-4 text-center font-semibold">Login</p>
            
            {/* Username or Email Input */}
            <div className="w-full mt-3">
              <input
                {...register('usernameOrEmail', { required: 'Username or Email is required' })}
                type="text"
                className="outline-none w-full py-2 px-3 border focus:border-gray-600 border-gray-300 rounded-sm hover:border-gray-600"
                placeholder="username or email *"
              />
              <ErrorMessage
                errors={errors}
                name="usernameOrEmail"
                render={({ message }) => <p className="text-sm text-red-600">{message}</p>}
              />
            </div>
            
            {/* Password Input */}
            <div className="w-full mt-2 mb-4">
              <input
               {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password should be at least 6 characters long'
                }
              })}
                type="password"
                className="outline-none w-full py-2 px-3 border focus:border-gray-600 border-gray-300 rounded-sm hover:border-gray-600"
                placeholder="password *"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <p className="text-sm text-red-600">{message}</p>}
              />
            </div>

            {/* Login Button */}
            <button type="submit" className="bg-blue-500 w-full rounded-sm text-white font-semibold py-2.5 px-2 text-sm">LOGIN</button>
            
            {/* Alternative Signup Link */}
            <p className="font-semibold text-sm">OR</p>
            <button type="button"
              className="flex items-center justify-center gap-2  bg-white border border-gray-400 rounded-sm shadow-sm hover:bg-gray-50 px-4 py-2 w-full"
             
            >
              <FaGoogle />
              <span className="text-sm font-medium text-gray-600 uppercase ">Continue with Google</span>
            </button>
            <Link to="/signup" className="text-sm mt-2 text-blue-800 hover:underline">SIGNUP INSTEAD</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
