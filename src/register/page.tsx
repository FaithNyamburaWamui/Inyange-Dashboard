"use client";





import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Image from 'next/image';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { userSignup } from '../utils/usersignup';

interface UserData {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  username: string,
  phone_number: string,
  user_role: string,
  location: string, // Ensure to include the new field if it's used
}

const signupSchema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  phone_number: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  location: yup.string().required('Location is required'),
  username: yup.string().required('Username is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  user_role: yup.string()
    .required('Role is required')
    .oneOf(['homeowner', 'supplier'], 'Invalid role selected'),
});

const locations = ["Nairobi", "Nakuru", "Mombasa", "Kiambu", "Thika"];

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onBlur',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const onSubmit = async (data: UserData) => {
    try {
      const response = await userSignup(data);
      
      if (response && response.error) {
        // Log the error for debugging purposes
        console.error('Registration Error:', response.error);
        setErrorMessage(response.error);
      } else {
        setSuccessMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => { 
          router.push("/login"); 
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage((error instanceof Error && error.message) ? error.message : 'An unknown error occurred');
    }
  };
  


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/2 p-4 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="First name *"
                  {...register('first_name')}
                  className={`py-2 px-3 w-full rounded-md bg-transparent border ${errors.first_name ? 'border-red-500' : 'border-blue-500'}`}
                />
                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Last name *"
                  {...register('last_name')}
                  className={`py-2 px-3 w-full rounded-md bg-transparent border ${errors.last_name ? 'border-red-500' : 'border-blue-500'}`}
                />
                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
              </div>
            </div>
            <input
              type="tel"
              placeholder="Phone number *"
              {...register('phone_number')}
              className={`py-2 px-3 w-full rounded-md bg-transparent border ${errors.phone_number ? 'border-red-500' : 'border-blue-500'}`}
            />
            {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>}
            <input
              type="email"
              placeholder="Email *"
              {...register('email')}
              className={`py-2 px-3 w-full rounded-md bg-transparent border ${errors.email ? 'border-red-500' : 'border-blue-500'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            <input
              type="username"
              placeholder="Username *"
              {...register('username')}
              className={`py-2 px-3 w-full rounded-md bg-transparent border ${errors.username ? 'border-red-500' : 'border-blue-500'}`}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            <select
              {...register('user_role')}
              className={`py-2 px-3 w-full rounded-md bg-white border ${errors.user_role ? 'border-red-500' : 'border-blue-500'}`}
            >
              <option value="">Select a role *</option>
              <option value="homeowner">homeowner</option>
              <option value="supplier">supplier</option>
            </select>
            {errors.user_role && <p className="text-red-500 text-xs mt-1">{errors.user_role.message}</p>}
            <select
              {...register('location')}
              className={`py-2 px-3 w-full rounded-md bg-white border ${errors.location ? 'border-red-500' : 'border-blue-500'}`}
            >
              <option value="">Select your location *</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                {...register('password')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              >
                {passwordVisible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#263C5A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign Up
            </button>
            {successMessage && (
              <p className="mt-2 text-green-500 text-center text-sm">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="mt-2 text-red-500 text-center text-sm">{errorMessage}</p>
            )}
          </form>
          <p className="mt-2 text-center text-xs text-gray-600">
            Already have an account? <Link href="/login"> <span>Login</span></Link>
          </p>
        </div>
      </div>
      <div className="w-1/2 relative">
        <Image
          src="/images/construction.png"
          alt="Construction site illustration"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default SignUpForm;
