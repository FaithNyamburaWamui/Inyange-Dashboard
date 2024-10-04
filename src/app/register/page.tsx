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
  //  reset,
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
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-3xl bg-white p-6 lg:p-10 rounded-xl shadow-xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center text-gray-800">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              <div>
                <input
                  type="text"
                  placeholder="First name *"
                  {...register('first_name')}
                  className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                />
                {errors.first_name && <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.first_name.message}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last name *"
                  {...register('last_name')}
                  className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                />
                {errors.last_name && <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.last_name.message}</p>}
              </div>
            </div>
            <input
              type="tel"
              placeholder="Phone number *"
              {...register('phone_number')}
              className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
            />
            {errors.phone_number && <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.phone_number.message}</p>}
            <input
              type="email"
              placeholder="Email *"
              {...register('email')}
              className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
            />
            {errors.email && <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.email.message}</p>}
            <input
              type="text"
              placeholder="Username *"
              {...register('username')}
              className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
            />
            {errors.username && <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.username.message}</p>}
            <select
              {...register('user_role')}
              className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${errors.user_role ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
            >
              <option value="">Select a role *</option>
              <option value="homeowner">Homeowner</option>
              <option value="supplier">Supplier</option>
            </select>
            {errors.user_role && <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.user_role.message}</p>}
            <select
              {...register('location')}
              className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${errors.location ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
            >
              <option value="">Select your location *</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
            {errors.location && <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.location.message}</p>}
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                {...register('password')}
                className={`w-full p-3 lg:p-4 text-base lg:text-lg rounded-lg bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pr-12`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                {passwordVisible ? <FiEye size={24} /> : <FiEyeOff size={24} />}
              </button>
            </div>
            <button 
              type="submit" 
              className="w-full py-3 lg:py-4 px-4 bg-[#263C5A]lg:px-6 text-base lg:text-lg font-semibold border border-transparent rounded-lg shadow-md text-white bg-[#263C5A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Sign Up
            </button>
       {successMessage && (
              <p className="mt-2 text-green-500 text-center text-sm">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="mt-2 text-red-500 text-center text-sm">{errorMessage}</p>
            )}
          </form>
          <p className="mt-6 lg:mt-8 text-center text-sm lg:text-base text-gray-600">
            Already have an account? <Link href="/login" className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300">Login</Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block w-1/2 relative">
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