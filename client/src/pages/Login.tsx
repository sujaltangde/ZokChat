import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { LuLoader2 } from "react-icons/lu";
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

type UserData = {
  usernameOrEmail: string;
  password: string;
};

const Login: React.FC = () => {
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  const loading = false

  // Initialize useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>({
    mode: 'onSubmit',
  });

  // Form submission handler (memoized)
  const onSubmit = useCallback<SubmitHandler<UserData>>((data) => {
    console.log({ data });
  }, []);

  // Memoized Error Message Component
  const renderErrorMessage = useCallback(({ message }: { message: string }) => (
    <p className="text-sm text-red-600">{message}</p>
  ), []);

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen h-screen w-full">
      <div className="flex justify-center h-full items-center pb-8">
        <div className="xl:w-1/3 w-full xl:mx-0 mx-10 shadow-md rounded-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 items-center py-4 px-5 border border-gray-100">
            <div className="flex items-center gap-4 justify-between w-full">
              <span className="text-3xl font-bold underline">Login</span>
              <img src="/assets/logoSvg/blackLogo.svg" alt="logo" className="h-5" />
            </div>

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
                render={renderErrorMessage}
              />
            </div>

            {/* Password Input with Eye Toggle */}
            <div className="w-full mt-2 mb-4">
            <div className="relative w-full ">
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password should be at least 6 characters long'
                  }
                })}
                type={showPassword ? 'text' : 'password'}
                className="outline-none w-full py-2 px-3 border focus:border-gray-600 border-gray-300 rounded-sm hover:border-gray-600 pr-10"
                placeholder="password *"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              
            </div>
            <ErrorMessage
                errors={errors}
                name="password"
                render={renderErrorMessage}
              />
            </div>

 
            {loading ? (
              <button
                disabled
                className="bg-blue-600 text-white  text-sm  font-semibold flex items-center justify-center gap-2 rounded-sm xl:py-2 py-1 xl:px-4 px-3 w-full"
              >
                <LuLoader2 size={20} className="animate-spin " />
              </button>
            ) : (
              <button
                type="submit"
                className="hover:bg-blue-600 text-white bg-blue-500  text-sm  font-semibold flex items-center justify-center gap-2 rounded-sm xl:py-2 py-1 xl:px-4 px-3 w-full"
              >
              LOGIN
              </button>
            )}




            {/* Alternative Signup Link */}
            <p className="font-semibold text-sm">OR</p>

            {/* Continue with Google Button */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-white border border-gray-400 rounded-sm shadow-sm hover:bg-gray-50 px-4 py-2 w-full"
            >
              <FaGoogle size={12} />
              <span className="text-xs font-medium text-gray-600 ">CONTINUE WITH GOOGLE</span>
            </button>

            {/* Signup Link */}
            <Link to="/signup" className="text-sm mt-2 text-blue-800 hover:underline">SIGNUP INSTEAD</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
