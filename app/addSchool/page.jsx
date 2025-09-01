"use client";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Modular Form Components
const FormSection = ({ title, children, className = '' }) => (
  <div className={`mb-8 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0 ${className}`}>
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const FormRow = ({ children, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
    {children}
  </div>
);

const FormGroup = ({ label, htmlFor, error, children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {children}
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);

const Input = ({ id, type = 'text', register, rules, error, placeholder, className = '', ...props }) => (
  <input
    id={id}
    type={type}
    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
      error ? 'border-red-500' : 'border-gray-300'
    } ${className}`}
    placeholder={placeholder}
    {...register(id, rules)}
    {...props}
  />
);

const TextArea = ({ id, register, rules, error, placeholder, rows = 3, className = '' }) => (
  <textarea
    id={id}
    rows={rows}
    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
      error ? 'border-red-500' : 'border-gray-300'
    } ${className}`}
    placeholder={placeholder}
    {...register(id, rules)}
  />
);

const FileUpload = ({ id, register, error, className = '' }) => (
  <div className={className}>
    <label htmlFor={id} className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
      <div className="text-center">
        <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-medium text-blue-600">Upload an image</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
      </div>
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        {...register(id)}
      />
    </label>
  </div>
);

const SubmitButton = ({ isSubmitting, children, className = '' }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {isSubmitting ? (
      <>
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {children}
      </>
    ) : (
      children
    )}
  </button>
);

const Alert = ({ message, type = 'success', className = '', onClose }) => (
  <div className={`rounded-lg p-4 mb-6 flex items-center justify-between space-x-3 ${
    type === 'success' 
      ? 'bg-green-50 text-green-800 border border-green-200' 
      : type === 'error'
      ? 'bg-red-50 text-red-800 border border-red-200'
      : 'bg-blue-50 text-blue-800 border border-blue-200'
  } ${className}`}>
    <div className="flex items-center">
      <span className={`flex-shrink-0 h-6 w-6 ${
        type === 'success' ? 'text-green-400' : 
        type === 'error' ? 'text-red-400' : 'text-blue-400'
      }`}>
        {type === 'success' ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : type === 'error' ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )}
      </span>
      <p>{message}</p>
    </div>
    {onClose && (
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    )}
  </div>
);

// Navigation Button Component
const NavigationButton = ({ href, onClick, children, variant = 'primary', className = '' }) => {
  const baseClasses = "font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center";
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white"
  };
  
  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Main Component
export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage('');
    
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);
    formData.append('email_id', data.email_id);
    
    // Only append image if a file was selected
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/schools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setMessage('School added successfully!');
      setMessageType('success');
      reset();
    } catch (error) {
      console.error('Error adding school:', error);
      
      if (error.response) {
        // Server responded with an error status
        const { status, data } = error.response;
        
        if (status === 409) {
          // Duplicate school error
          setMessage(data.error || 'A school with this name already exists.');
          setMessageType('error');
          
          // Highlight the name field
          setError('name', {
            type: 'manual',
            message: 'A school with this name already exists.'
          });
        } else if (status === 400) {
          // Validation error
          setMessage(data.error || 'Please check your input and try again.');
          setMessageType('error');
        } else {
          // Other server errors
          setMessage(data.error || 'Failed to add school. Please try again.');
          setMessageType('error');
        }
      } else if (error.request) {
        // Network error
        setMessage('Network error. Please check your connection and try again.');
        setMessageType('error');
      } else {
        // Other errors
        setMessage('An unexpected error occurred. Please try again.');
        setMessageType('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeMessage = () => {
    setMessage('');
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>Add School</title>
        <meta name="description" content="Add a new school to the database" />
      </Head>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New School</h1>
          <p className="mt-2 text-lg text-gray-600">Fill in the details below to register a new school</p>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <NavigationButton
            onClick={handleGoBack}
            variant="secondary"
            className="flex-1 sm:flex-none"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </NavigationButton>
          
          <NavigationButton
            href="/showSchools"
            variant="success"
            className="flex-1 sm:flex-none"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            View School List
          </NavigationButton>
        </div>
        
        {message && (
          <Alert 
            message={message} 
            type={messageType}
            onClose={closeMessage}
          />
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <FormSection title="Basic Information">
            <FormGroup 
              label="School Name*" 
              htmlFor="name" 
              error={errors.name}
            >
              <Input
                id="name"
                type="text"
                register={register}
                rules={{ required: 'School name is required' }}
                error={errors.name}
                placeholder="Enter school name"
              />
            </FormGroup>

            <FormGroup 
              label="Address*" 
              htmlFor="address" 
              error={errors.address}
            >
              <TextArea
                id="address"
                register={register}
                rules={{ required: 'Address is required' }}
                error={errors.address}
                placeholder="Full school address"
                rows={3}
              />
            </FormGroup>
          </FormSection>

          <FormSection title="Location Details">
            <FormRow>
              <FormGroup 
                label="City*" 
                htmlFor="city" 
                error={errors.city}
              >
                <Input
                  id="city"
                  type="text"
                  register={register}
                  rules={{ required: 'City is required' }}
                  error={errors.city}
                  placeholder="Enter city"
                />
              </FormGroup>

              <FormGroup 
                label="State*" 
                htmlFor="state" 
                error={errors.state}
              >
                <Input
                  id="state"
                  type="text"
                  register={register}
                  rules={{ required: 'State is required' }}
                  error={errors.state}
                  placeholder="Enter state"
                />
              </FormGroup>
            </FormRow>
          </FormSection>

          <FormSection title="Contact Information">
            <FormRow>
              <FormGroup 
                label="Contact Number*" 
                htmlFor="contact" 
                error={errors.contact}
              >
                <Input
                  id="contact"
                  type="tel"
                  register={register}
                  rules={{ 
                    required: 'Contact number is required',
                    minLength: {
                      value: 10,
                      message: 'Contact number must be at least 10 digits'
                    }
                  }}
                  error={errors.contact}
                  placeholder="10-digit phone number"
                />
              </FormGroup>

              <FormGroup 
                label="Email*" 
                htmlFor="email_id" 
                error={errors.email_id}
              >
                <Input
                  id="email_id"
                  type="email"
                  register={register}
                  rules={{ 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  }}
                  error={errors.email_id}
                  placeholder="school@example.com"
                />
              </FormGroup>
            </FormRow>
          </FormSection>

          <FormSection title="School Image">
            <FileUpload 
              id="image" 
              register={register} 
              error={errors.image}
            />
          </FormSection>

          <div className="mt-8">
            <SubmitButton isSubmitting={isSubmitting}>
              {isSubmitting ? 'Adding School...' : 'Add School'}
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}