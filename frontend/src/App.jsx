import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Workflow from './components/Workflow';
import Demo from './components/Demo';
import Architecture from './components/Architecture';
import './App.css';

function App() {
  return (
    <>
      {/* Premium Ambient Background Orbs */}
      <div className="background-glows">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>

      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 10 }}>
        {/* Hero Section */}
        <Hero />

        {/* Feature Grid Section */}
        <Features />

        {/* Multi-Agent Workflow Sequence */}
        <Workflow />

        {/* Interactive AutoML Dashboard */}
        <Demo />

        {/* System Architecture Section */}
        <Architecture />
      </main>

      {/* Premium Cybersecurity Grid Footer */}
      <footer style={{
        marginTop: '100px',
        padding: '60px 5vw 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(5, 8, 17, 0.8)',
        backdropFilter: 'blur(16px)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px'
        }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              AutoForge<span style={{ color: 'var(--color-blue)' }}>AI</span>
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', maxWidth: '360px', lineHeight: 1.5 }}>
              Collaborative multi-agent machine learning pipelines. Automated analysis, recommendation, training, and deployment.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff' }}>Platform</span>
              <a href="#features" style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Features</a>
              <a href="#workflow" style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Workflow</a>
              <a href="#demo" style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>AutoML Demo</a>
              <a href="#architecture" style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Architecture</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff' }}>Technology</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>FastAPI Backend</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>React Frontend</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Scikit-Learn Agents</span>
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: '1400px',
          margin: '40px auto 0',
          paddingTop: '25px',
          borderTop: '1px solid rgba(255, 255, 255, 0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          fontSize: '0.78rem',
          color: 'var(--color-text-muted)'
        }}>
          <span>© 2026 AutoForge AI. All rights reserved. Built for advanced agentic AutoML orchestration.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
