import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Compass, BarChart, Users } from 'lucide-react';

export default function Roadmap() {
  const phases = [
    {
      title: "Phase 1: Multi-Agent Core",
      timeframe: "Q2 2026 (Active)",
      desc: "Complete tabular data ingestion, automated classification and regression detection, scikit-learn training agents, model leaderboards, and FastAPI deployment service generation.",
      icon: Zap,
      color: "#00f0ff",
      status: "active"
    },
    {
      title: "Phase 2: Deep Learning & NLP",
      timeframe: "Q3 2026 (Planning)",
      desc: "Integration of PyTorch and HuggingFace agents to automate neural network configuration for unstructured data, including text classification, sentiment analysis, and image classification.",
      icon: Compass,
      color: "#0072ff",
      status: "upcoming"
    },
    {
      title: "Phase 3: Advanced Optimization",
      timeframe: "Q4 2026",
      desc: "Deploying a dedicated Hyperparameter Tuning Agent using Bayesian optimization (Optuna). Introducing an automated Feature Engineering Agent to synthesize high-impact columns.",
      icon: BarChart,
      color: "#7f00ff",
      status: "upcoming"
    },
    {
      title: "Phase 4: Enterprise MLOps",
      timeframe: "Q1 2027",
      desc: "Adding distributed Kubernetes-based training nodes, MLflow tracking integration, drift and model performance monitoring, and one-click cloud deployments to AWS/GCP.",
      icon: Users,
      color: "#00ff7f",
      status: "upcoming"
    }
  ];

  return (
    <section id="roadmap" style={{ scrollMarginTop: '80px', paddingBottom: '120px' }}>
      <div className="section-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Development Roadmap</h2>
          <p className="section-subtitle">
            Our vision for the evolution of AutoForge AI, transforming it from a tabular AutoML engine to a distributed enterprise MLOps platform.
          </p>
        </motion.div>
      </div>

      <div className="grid-2" style={{ gap: '30px' }}>
        {phases.map((phase, idx) => {
          const Icon = phase.icon;
          const isActive = phase.status === 'active';
          
          return (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                y: -5,
                borderColor: phase.color,
                boxShadow: `0 10px 30px -5px rgba(${phase.color === '#00f0ff' ? '0, 240, 255' : '189, 0, 255'}, 0.15)`
              }}
              className="glass-panel"
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
                border: isActive ? `1px solid ${phase.color}40` : '1px solid rgba(255, 255, 255, 0.05)',
                background: isActive ? 'rgba(0, 240, 255, 0.02)' : 'rgba(11, 15, 25, 0.4)'
              }}
            >
              {/* Timeline Indicator Badge */}
              <div style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: phase.color,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {phase.timeframe}
              </div>

              {/* Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(5, 8, 17, 0.8)',
                border: `1px solid ${phase.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: phase.color,
                boxShadow: `0 0 15px ${phase.color}10`
              }}>
                <Icon size={22} />
              </div>

              {/* Title & Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {phase.title}
                  {isActive && (
                    <span className="pulse-dot" style={{ width: '6px', height: '6px', backgroundColor: '#00f0ff' }} />
                  )}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {phase.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
