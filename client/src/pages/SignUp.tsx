import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FaCamera, FaUser, FaGoogle, FaEyeSlash, FaEye } from "react-icons/fa";
import { LuLoader2 } from 'react-icons/lu';


// Define the type for user data
type UserData = {
  username: string;
  bio: string;
  email: string;
  password: string;
  avatar: FileList | null; // Avatar is now required and can be null initially
};

const SignUp: React.FC = () => {

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm<UserData>({
    mode: 'onTouched',
  });

  const fileToBase64 = useCallback((file: File | null): Promise<string> => {

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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files?.[0];

    if (file?.size > 5000000) {
      setError("avatar", {
        type: "manual",
        message: "File size too large, select file less than 5mb",
      });
      
      return
    }

    if (file) {
      clearErrors('avatar')
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    let avatarBase64File: string | null = null;

    if (avatarFile) {
      avatarBase64File = await fileToBase64(avatarFile);
    }

    const finalData = {
      ...data,
      avatar: avatarBase64File,
    };

    console.log({ finalData });
  };


  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);


  const loading = false

  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-center h-full items-center pb-8">
        <div className="xl:w-1/3 w-full xl:mx-0 mx-10 shadow-md rounded-sm mt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 items-center py-4 px-5 border border-gray-100">
            {/* <p className="text-3xl mt-4 text-center font-semibold">Sign Up</p> */}
            <div className="flex items-center gap-4 justify-between w-full">
              <span className="text-3xl font-bold underline"> Sign Up</span>
              <img src="/assets/logoSvg/blackLogo.svg" alt="logo" className="h-5" />
            </div>

            {/* Avatar Upload Section */}
            <div className="flex flex-col gap-2 items-center">
              <label htmlFor="avatar" className="cursor-pointer rounded-full relative flex flex-col ">
                <div className="bg-gray-300 w-36 h-36 rounded-full overflow-hidden">
                  {/* Render selected image or default placeholder */}
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full text-white bg-gray-300 flex items-center justify-center ">
                      <FaUser size={80} />
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
                render={({ message }) => <p className="text-sm text-red-600">{message}</p>}
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
                SIGN UP
              </button>
            )}

            {/* Alternative Login Link */}
            <p className="font-semibold text-sm">OR</p>
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-white border border-gray-400 rounded-sm shadow-sm hover:bg-gray-50 px-4 py-2 w-full"
            >
              <FaGoogle size={12} />
              <span className="text-xs font-medium text-gray-600 ">CONTINUE WITH GOOGLE</span>
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

