"use client";
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>School Management System</title>
        <meta name="description" content="Manage school information efficiently" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
      </Head>

      <main className="main">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="title">
              School Management
              <span className="title-accent">System</span>
            </h1>
            
            <p className="description">
              Streamline school administration with our modern management platform
            </p>
          </div>
          
          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-icon">🏫</div>
              <h3>Add Schools</h3>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">📊</div>
              <h3>View Data</h3>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">📱</div>
              <h3>Mobile Friendly</h3>
            </div>
          </div>
        </div>

        <div className="features-grid">
          <Link href="/addSchool" className="feature-card">
            <div className="card-content">
              <div className="icon-wrapper">
                <span className="icon">➕</span>
              </div>
              <h2>Add School</h2>
              <p>Add a new school to the database with detailed information</p>
              <div className="card-arrow">→</div>
            </div>
          </Link>

          <Link href="/showSchools" className="feature-card">
            <div className="card-content">
              <div className="icon-wrapper">
                <span className="icon">👁️</span>
              </div>
              <h2>View Schools</h2>
              <p>Browse all schools in the database with beautiful cards</p>
              <div className="card-arrow">→</div>
            </div>
          </Link>
        </div>
      </main>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
          color: #2d3748;
          min-height: 100vh;
        }
        
        .container {
          min-height: 100vh;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .main {
          width: 100%;
          max-width: 1200px;
          padding: 2rem 1.5rem;
        }

        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin: 3rem 0 5rem;
        }

        .hero-content {
          max-width: 700px;
          margin-bottom: 3rem;
        }

        .title {
          margin: 0 0 1.5rem;
          line-height: 1.2;
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-accent {
          display: block;
          background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .description {
          font-size: 1.35rem;
          line-height: 1.6;
          color: #64748b;
          margin: 0;
          font-weight: 400;
        }

        .hero-visual {
          position: relative;
          height: 200px;
          width: 100%;
          max-width: 600px;
        }

        .floating-card {
          position: absolute;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: float 6s ease-in-out infinite;
        }

        .card-1 {
          top: 0;
          left: 0;
          animation-delay: 0s;
        }

        .card-2 {
          top: 40%;
          right: 0;
          animation-delay: 2s;
        }

        .card-3 {
          bottom: 0;
          left: 20%;
          animation-delay: 4s;
        }

        .card-icon {
          font-size: 1.75rem;
        }

        .floating-card h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .feature-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid rgba(226, 232, 240, 0.8);
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #8b5cf6, #3b82f6);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .card-content {
          position: relative;
          z-index: 1;
        }

        .icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .icon {
          font-size: 1.75rem;
        }

        .feature-card h2 {
          margin: 0 0 1rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }

        .feature-card p {
          margin: 0 0 1.5rem;
          color: #6b7280;
          line-height: 1.6;
        }

        .card-arrow {
          font-size: 1.5rem;
          font-weight: 700;
          color: #4f46e5;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .card-arrow {
          transform: translateX(5px);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @media (max-width: 768px) {
          .main {
            padding: 1.5rem 1rem;
          }
          
          .title {
            font-size: 2.5rem;
          }
          
          .description {
            font-size: 1.1rem;
          }
          
          .hero-section {
            margin: 2rem 0 3rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .floating-card {
            position: relative;
            margin-bottom: 1rem;
            animation: none;
          }
          
          .hero-visual {
            height: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 2rem;
          }
          
          .feature-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
