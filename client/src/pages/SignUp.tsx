import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FaCamera, FaUser, FaGoogle   } from "react-icons/fa";


// Define the type for user data
type UserData = {
  username: string;
  bio: string;
  email: string;
  password: string;
  avatar: FileList | null; // Avatar is now required and can be null initially
};

const SignUp: React.FC = () => {
  // State to store the avatar preview URL
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Initialize useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>({
    mode: 'onTouched', // Trigger validation on touched fields
  });

  // Convert file to base64 format
  const fileToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      if (file instanceof Blob) {
        reader.readAsDataURL(file);
      } else {
        reject(new Error('File is not of type Blob'));
      }
    });
  }, []);

  // Handle avatar file change to set the preview
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file)); // Generate a URL for the selected file
    }
  };

  // Form submission handler
  const onSubmit: SubmitHandler<UserData> = async (data) => {
    let avatarFile: string | null = null;
    if (data.avatar && data.avatar.length > 0) {
      avatarFile = await fileToBase64(data.avatar[0]);
    }

    const finalData = {
      ...data,
      avatar: avatarFile,
    };

    console.log(finalData); // Log the final data for debugging
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-center h-full items-center pb-8">
        <div className="xl:w-1/3 w-full xl:mx-0 mx-10 shadow-md rounded-sm mt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 items-center py-4 px-5 border border-gray-100">
            <p className="text-3xl mt-4 text-center font-semibold">Sign Up</p>

            {/* Avatar Upload Section */}
            <div className="flex flex-col gap-2 items-center">
              <label htmlFor="avatar" className="cursor-pointer rounded-full relative flex flex-col ">
                <div className="bg-gray-300 w-36 h-36 rounded-full overflow-hidden">
                  {/* Render selected image or default placeholder */}
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full text-white bg-gray-300 flex items-center justify-center ">
                      <FaUser size={80}/>
                    </div>
                  )}
                </div>
                <div className="bg-gray-400 bg-opacity-70 flex justify-center items-center rounded-full text-white h-8 w-8 absolute -bottom-1 right-3">
                <FaCamera />
                </div>
              </label>
              <input
                {...register("avatar", { required: "Avatar is required" })}
                type="file"
                name="avatar"
                className="hidden"
                id="avatar"
                accept="image/*"
                onChange={handleAvatarChange} // Handle file change to set preview
              />
              <ErrorMessage
                errors={errors}
                name="avatar"
                render={({ message }) => <p className="text-sm text-red-600">{message}</p>}
              />
            </div>

            {/* Username Input */}
            <div className="w-full">
              <input
                {...register('username', { required: 'Username is required' })}
                type="text"
                className="outline-none w-full py-2 px-3 border focus:border-gray-600 border-gray-300 rounded-sm hover:border-gray-600"
                placeholder="username *"
              />
              <ErrorMessage
                errors={errors}
                name="username"
                render={({ message }) => <p className="text-sm text-red-600">{message}</p>}
              />
            </div>

            {/* Bio Input */}
            <div className="w-full mt-2">
              <input
                {...register('bio', { required: 'Bio is required' })}
                type="text"
                className="outline-none w-full py-2 px-3 border focus:border-gray-600 border-gray-300 rounded-sm hover:border-gray-600"
                placeholder="bio *"
              />
              <ErrorMessage
                errors={errors}
                name="bio"
                render={({ message }) => <p className="text-sm text-red-600">{message}</p>}
              />
            </div>

            {/* Email Input */}
            <div className="w-full mt-2">
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                className="outline-none w-full py-2 px-3 border focus:border-gray-600 border-gray-300 rounded-sm hover:border-gray-600"
                placeholder="email *"
              />
              <ErrorMessage
                errors={errors}
                name="email"
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
                    message: 'Password should be at least 6 characters long',
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

            {/* Sign Up Button */}
            <button type='submit' className="bg-blue-500 w-full rounded-sm text-white font-semibold py-2.5 px-2 text-sm">
              SIGN UP
            </button>


           

            {/* Alternative Login Link */}
            <p className="font-semibold text-sm">OR</p>
            <button type="button"
              className="flex items-center justify-center gap-2  bg-white border border-gray-400 rounded-sm shadow-sm hover:bg-gray-50 px-4 py-2 w-full"
             
            >
              <FaGoogle />
              <span className="text-sm font-medium text-gray-600 uppercase ">Continue with Google</span>
            </button>
            <Link to="/login" className="text-sm mt-2 text-blue-800 hover:underline">
              LOGIN INSTEAD
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
