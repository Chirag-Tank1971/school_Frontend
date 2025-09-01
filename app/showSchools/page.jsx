"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

// SchoolCard Component
const SchoolCard = ({ school }) => (
  <div className="school-card">
    <div className="school-image">
      {school.image ? (
        <img 
          src={`http://localhost:5000/uploads/${school.image}`} 
          alt={school.name} 
        />
      ) : (
        <div className="placeholder-image">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
      )}
    </div>
    <div className="school-info">
      <h2>{school.name}</h2>
      <p className="address">{school.address}</p>
      <p className="city">{school.city}</p>
    </div>
  </div>
);

// Header Component
const PageHeader = () => (
  <div className="header">
    <div className="header-content">
      <h1>Schools Directory</h1>
      <p>Discover educational institutions in your area</p>
    </div>
    <Link href="/addSchool" className="add-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add New School
    </Link>
  </div>
);

// EmptyState Component
const EmptyState = () => (
  <div className="empty-state">
    <div className="empty-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    </div>
    <h2>No schools found</h2>
    <p>Be the first to add a school to our database!</p>
    <Link href="/addSchool" className="add-button primary">
      Add School
    </Link>
  </div>
);

// Loading State Component
const LoadingState = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading schools...</p>
  </div>
);

// Error State Component
const ErrorState = ({ error, onRetry }) => (
  <div className="error-container">
    <div className="error-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    <p className="error-message">{error}</p>
    <button onClick={onRetry} className="retry-button">
      Try Again
    </button>
  </div>
);

// Main Component
export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/schools');
      setSchools(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to load schools. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="schools-container">
      <Head>
        <title>Schools List</title>
        <meta name="description" content="Browse all schools in our database" />
      </Head>

      <PageHeader />
      
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchSchools} />
      ) : schools.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="schools-grid">
          {schools.map(school => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background-color: #f7fafc;
          color: #2d3748;
          line-height: 1.6;
        }
        
        .schools-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          min-height: 100vh;
        }
        
        /* Header Styles */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eaeaea;
        }
        
        .header-content h1 {
          color: #2d3748;
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 8px 0;
        }
        
        .header-content p {
          color: #718096;
          margin: 0;
          font-size: 1.1rem;
        }
        
        .add-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #4a5568;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: none;
          cursor: pointer;
        }
        
        .add-button:hover {
          background: #2d3748;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        
        .add-button.primary {
          background: #4299e1;
        }
        
        .add-button.primary:hover {
          background: #3182ce;
        }
        
        /* Schools Grid */
        .schools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }
        
        /* School Card */
        .school-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
        }
        
        .school-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
        }
        
        .school-image {
          height: 200px;
          overflow: hidden;
          background: #f7fafc;
        }
        
        .school-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .school-card:hover .school-image img {
          transform: scale(1.05);
        }
        
        .placeholder-image {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #edf2f7;
          color: #a0aec0;
        }
        
        .school-info {
          padding: 24px;
        }
        
        .school-info h2 {
          margin: 0 0 12px 0;
          color: #2d3748;
          font-size: 1.4rem;
          font-weight: 600;
        }
        
        .address, .city {
          margin: 6px 0;
          color: #718096;
        }
        
        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: #f8fafc;
          border-radius: 12px;
          margin: 40px 0;
        }
        
        .empty-icon {
          margin-bottom: 24px;
          color: #cbd5e0;
        }
        
        .empty-state h2 {
          color: #4a5568;
          margin-bottom: 16px;
          font-size: 1.8rem;
        }
        
        .empty-state p {
          color: #718096;
          margin-bottom: 32px;
          font-size: 1.1rem;
        }
        
        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #4299e1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 24px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loading-container p {
          color: #718096;
          font-size: 1.2rem;
        }
        
        /* Error State */
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          text-align: center;
        }
        
        .error-icon {
          color: #e53e3e;
          margin-bottom: 24px;
        }
        
        .error-message {
          color: #4a5568;
          font-size: 1.2rem;
          margin-bottom: 24px;
        }
        
        .retry-button {
          background: #4299e1;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .retry-button:hover {
          background: #3182ce;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          
          .header-content h1 {
            font-size: 2rem;
          }
          
          .schools-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .schools-container {
            padding: 16px;
          }
          
          .header-content h1 {
            font-size: 1.8rem;
          }
          
          .schools-grid {
            grid-template-columns: 1fr;
          }
          
          .school-info {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}