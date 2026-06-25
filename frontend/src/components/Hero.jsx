import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Database, Activity, Cpu, Play, BarChart2, Award, ChevronRight, FileCode } from 'lucide-react';

export default function Hero() {
  // Steps for the workflow animation
  const steps = [
    { id: 1, label: 'Upload Dataset', icon: Upload, color: '#00f0ff' },
    { id: 2, label: 'Data Analysis Agent', icon: Database, color: '#0072ff' },
    { id: 3, label: 'Task Detection', icon: Activity, color: '#7f00ff' },
    { id: 4, label: 'Model Recommendation', icon: Cpu, color: '#bd00ff' },
    { id: 5, label: 'Model Training', icon: Play, color: '#ff007f' },
    { id: 6, label: 'Performance Evaluation', icon: BarChart2, color: '#00ff7f' },
    { id: 7, label: 'Best Model Selected', icon: Award, color: '#ffbd00' },
  ];

  // Container variants for staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section 
      id="hero" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '140px',
        position: 'relative'
      }}
    >
      <div className="grid-2" style={{ width: '100%', alignItems: 'center' }}>
        
        {/* Left Side: Copy and CTAs */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          {/* Tagline Badge */}
          <motion.div 
            variants={itemVariants}
            style={{
              alignSelf: 'flex-start',
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              borderRadius: '100px',
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-blue)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.05)'
            }}
          >
            Multi-Agent AutoML Platform
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(to right, #ffffff, #93c5fd, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: '#ffffff' // Fallback
            }}
          >
            Build Smarter AI <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #00f0ff 0%, #bd00ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              with AI
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            style={{
              fontSize: '1.15rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              maxWidth: '540px'
            }}
          >
            AutoForge AI is a Multi-Agent AutoML Platform that automatically analyzes datasets, detects machine learning tasks, recommends the best models, trains them, evaluates performance, and selects the best-performing model without requiring ML expertise.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            variants={itemVariants}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginTop: '8px'
            }}
          >
            <a href="#demo" className="btn btn-primary">
              <span>Try AutoForge</span>
              <ChevronRight size={16} />
            </a>
            <a href="#architecture" className="btn btn-secondary">
              <span>View Documentation</span>
              <FileCode size={16} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Animated Workflow Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* Ambient Glow */}
          <div 
            style={{
              position: 'absolute',
              width: '80%',
              height: '80%',
              background: 'radial-gradient(circle, rgba(0, 114, 255, 0.1) 0%, rgba(189, 0, 255, 0.05) 50%, transparent 100%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          {/* Main Visual Board */}
          <div 
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '480px',
              padding: '30px',
              position: 'relative',
              zIndex: 1,
              boxShadow: '0 20px 50px rgba(5, 8, 17, 0.7)',
              background: 'rgba(10, 15, 30, 0.4)'
            }}
          >
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '25px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                paddingBottom: '15px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pulse-dot" />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-secondary)' }}>
                  AutoForge Core Pipeline
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-blue)', fontFamily: 'monospace' }}>
                v1.0.0-active
              </span>
            </div>

            {/* Steps Container */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                position: 'relative'
              }}
            >
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    {/* Node */}
                    <motion.div 
                      initial={{ background: 'rgba(255, 255, 255, 0.02)' }}
                      animate={{
                        background: [
                          'rgba(255, 255, 255, 0.02)',
                          `rgba(${step.id === 1 ? '0, 240, 255' : '189, 0, 255'}, 0.15)`,
                          'rgba(255, 255, 255, 0.02)'
                        ],
                        borderColor: [
                          'rgba(255, 255, 255, 0.06)',
                          step.color,
                          'rgba(255, 255, 255, 0.06)'
                        ],
                        boxShadow: [
                          'none',
                          `0 0 15px rgba(${step.id === 1 ? '0, 240, 255' : '189, 0, 255'}, 0.15)`,
                          'none'
                        ]
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        delay: idx * 0.5,
                        ease: 'easeInOut'
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        padding: '12px 20px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        cursor: 'default'
                      }}
                    >
                      <div 
                        style={{
                          background: `rgba(255, 255, 255, 0.04)`,
                          borderRadius: '6px',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <StepIcon size={16} style={{ color: step.color }} />
                      </div>
                      
                      <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                        {step.label}
                      </span>

                      {/* Spark indicator */}
                      <motion.div 
                        animate={{
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          delay: idx * 0.5,
                        }}
                        style={{
                          marginLeft: 'auto',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: step.color,
                          boxShadow: `0 0 8px ${step.color}`
                        }}
                      />
                    </motion.div>

                    {/* Connector Arrow (unless last item) */}
                    {idx < steps.length - 1 && (
                      <div style={{ height: '14px', width: '1px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <svg width="2" height="14" viewBox="0 0 2 14" fill="none">
                          <line x1="1" y1="0" x2="1" y2="14" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="2 2" />
                        </svg>
                        
                        {/* Animated signal bubble moving down */}
                        <motion.div 
                          animate={{
                            top: ['0%', '100%'],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: idx * 0.5 + 0.3,
                            ease: 'linear'
                          }}
                          style={{
                            position: 'absolute',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: step.color,
                            boxShadow: `0 0 6px ${step.color}`
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
