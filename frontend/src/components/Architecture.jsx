import React from 'react';
import { motion } from 'framer-motion';
import { Database, GitBranch, Cpu, LineChart, Code } from 'lucide-react';

export default function Architecture() {
  const layers = [
    {
      title: "1. Data Ingestion & Sanitization",
      agent: "Dataset Agent",
      desc: "Performs integrity checks on the schema, validates row/column formatting, and handles missing values using intelligent median/mode imputation based on column types.",
      icon: Database,
      color: "#00f0ff"
    },
    {
      title: "2. Semantic Task Detection",
      agent: "Task Agent",
      desc: "Analyzes target column values to determine the cardinality and data type. Classifies the problem as classification (discrete classes) or regression (continuous outcomes).",
      icon: GitBranch,
      color: "#0072ff"
    },
    {
      title: "3. Constraint Recommendation",
      agent: "Model Recommendation Agent",
      desc: "Evaluates dataset dimensions, feature count, and task complexity. Maps recommendations to optimal algorithms from the model repository.",
      icon: Cpu,
      color: "#7f00ff"
    },
    {
      title: "4. Distributed Training & Preprocessing",
      agent: "Training Agent",
      desc: "Splits data into 80% train / 20% validation folds, applies categorical label encoding, trains all recommended models, and saves high-performance pickle models.",
      icon: LineChart,
      color: "#bd00ff"
    },
    {
      title: "5. Production Deployment",
      agent: "Optimization & Serving Agent",
      desc: "Generates optimal inference boilerplate code in Python and creates production-grade FastAPI microservice wrappers for immediate cloud deployment.",
      icon: Code,
      color: "#00ff7f"
    }
  ];

  return (
    <section id="architecture" style={{ scrollMarginTop: '80px' }}>
      <div className="section-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">System Architecture</h2>
          <p className="section-subtitle">
            A modular, multi-agent orchestration pipeline designed for distributed, zero-code machine learning workflows.
          </p>
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Background Vertical Connector Line */}
        <div style={{
          position: 'absolute',
          top: '40px',
          bottom: '40px',
          left: '30px',
          width: '2px',
          background: 'linear-gradient(to bottom, #00f0ff 0%, #7f00ff 50%, #00ff7f 100%)',
          opacity: 0.2,
          zIndex: 0
        }} className="arch-connector-line" />

        {layers.map((layer, idx) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel"
              style={{
                display: 'flex',
                gap: '25px',
                padding: '25px 30px',
                position: 'relative',
                zIndex: 1,
                alignItems: 'flex-start',
                background: 'rgba(11, 15, 25, 0.4)'
              }}
            >
              {/* Connector Node */}
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: 'rgba(5, 8, 17, 0.8)',
                border: `1px solid ${layer.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: layer.color,
                boxShadow: `0 0 15px ${layer.color}10`,
                flexShrink: 0,
                zIndex: 2
              }}>
                <Icon size={24} />
              </div>

              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#ffffff' }}>
                    {layer.title}
                  </h3>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 10px',
                    borderRadius: '100px',
                    background: `${layer.color}15`,
                    color: layer.color,
                    border: `1px solid ${layer.color}30`,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {layer.agent}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {layer.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .arch-connector-line {
            left: 20px !important;
          }
          .glass-panel {
            gap: 15px !important;
            padding: 20px !important;
          }
          .glass-panel > div:first-child {
            width: 40px !important;
            height: 40px !important;
            border-radius: 8px !important;
          }
          .glass-panel > div:first-child svg {
            width: 18px !important;
            height: 18px !important;
          }
        }
      `}</style>
    </section>
  );
}
