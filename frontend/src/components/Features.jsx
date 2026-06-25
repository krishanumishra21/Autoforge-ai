import React from 'react';
import { motion } from 'framer-motion';
import { Table, Search, Lightbulb, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Dataset Analysis',
      description: 'Automatically analyzes uploaded CSV datasets, detecting missing values, data types, target column, and key statistical insights.',
      icon: Table,
      color: '#00f0ff',
      delay: 0.1
    },
    {
      title: 'Task Detection',
      description: 'Intelligently identifies whether the problem is Classification or Regression automatically based on the target column\'s cardinality.',
      icon: Search,
      color: '#0072ff',
      delay: 0.2
    },
    {
      title: 'Intelligent Model Recommendation',
      description: 'Suggests the most suitable machine learning algorithms tailored specifically to your dataset\'s size, sparsity, and task profile.',
      icon: Lightbulb,
      color: '#7f00ff',
      delay: 0.3
    },
    {
      title: 'Automatic Training',
      description: 'Trains multiple advanced machine learning models simultaneously in the background without requiring user setup or code.',
      icon: Zap,
      color: '#bd00ff',
      delay: 0.4
    },
    {
      title: 'Performance Comparison',
      description: 'Compares model metrics side-by-side on validation sets and generates a real-time leaderboard showing model quality.',
      icon: TrendingUp,
      color: '#ff007f',
      delay: 0.5
    },
    {
      title: 'Best Model Selection',
      description: 'Identifies and locks in the highest-performing model automatically, ready to serve predictions immediately.',
      icon: ShieldCheck,
      color: '#00ff7f',
      delay: 0.6
    }
  ];

  return (
    <section id="features">
      <div className="section-header">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Core AutoML Capabilities</h2>
          <p className="section-subtitle">
            AutoForge AI deploys specialized AI agents to handle every phase of the machine learning pipeline automatically.
          </p>
        </motion.div>
      </div>

      <div className="grid-3">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ 
                y: -8,
                borderColor: feature.color,
                boxShadow: `0 10px 30px -5px rgba(${feature.color === '#00f0ff' ? '0, 240, 255' : '189, 0, 255'}, 0.2)`
              }}
              className="glass-panel"
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Background Glow Overlay on Hover */}
              <div 
                style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${feature.color}15 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }}
              />

              {/* Icon */}
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `rgba(255, 255, 255, 0.03)`,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: feature.color,
                  boxShadow: `0 4px 12px ${feature.color}10`
                }}
              >
                <IconComponent size={24} />
              </div>

              {/* Title & Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#ffffff' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
