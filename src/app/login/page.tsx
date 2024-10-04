'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js router for navigation
import { useForm } from 'react-hook-form'; // Form handling
import { yupResolver } from '@hookform/resolvers/yup'; // Validation resolver for Yup
import * as yup from 'yup'; // Validation schema
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Icons for password visibility toggle
import { useLogin } from '../hooks/uselogin'; // Import the useLogin hook
import { Credentials } from '../utils/types'; // Import Credentials type


// Validation schema using Yup
const schema = yup.object().shape({
 email: yup.string().email('Invalid email').required('Email is required'),
 password: yup.string().required('Password is required'),
});


// Infer the form data type from the Yup schema
type FormData = yup.InferType<typeof schema>;


const Login = () => {
 const router = useRouter();
 const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
   resolver: yupResolver(schema),
 });
  const { login, isSubmitting, errorMessage, successMessage } = useLogin(); // Use login hook
 const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility


 // Handle login form submission
 const onSubmit = async (data: FormData) => {
   const credentials: Credentials = {
     email: data.email,
     password: data.password,
   };


   try {
     const response = await login(credentials); // Use login method from the hook
    
     if (response.success) {
       router.push("/dashboard");
     }
   } catch (error) {
     console.error("Login error:", error);
   }
 };
  // Handle Google login
 const handleGoogleLogin = () => {
   window.location.href = 'https://buildmart-42eabdb55b17.herokuapp.com/auth/login_sso';
 };


 // Toggle password visibility
 const togglePasswordVisibility = () => {
   setPasswordVisible(!passwordVisible);
 };


  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
        <div className="w-full max-w-2xl bg-white p-6 lg:p-10 rounded-xl shadow-lg">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center text-gray-800">Log in to continue to BuildMart</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full px-4 py-3 text-base lg:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  {...register('password')}
                  className="w-full px-4 py-3 text-base lg:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 pr-12"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {passwordVisible ? <FiEye size={24} /> : <FiEyeOff size={24} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="text-sm lg:text-base">
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#263C5A] text-white py-3 lg:py-4 px-4 rounded-lg text-base lg:text-lg font-semibold transition duration-300 hover:bg-[#1c2d43]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          </form>

          <p className="mt-6 text-center text-sm lg:text-base text-gray-600">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign Up</a>
          </p>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm lg:text-base">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="mt-6 w-full flex items-center justify-center px-4 py-3 lg:py-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm lg:text-base font-medium text-gray-700 hover:bg-gray-50 transition duration-300"
          >
            <Image src="/images/google.png" alt="Google" width={24} height={24} className="mr-3" />
            Continue with Google
          </button>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 bg-blue-100 relative">
        <Image
          src="/images/construction.png"
          alt="Construction site"
          fill
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Login;