import React from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, Binary, GitFork, Server, BarChart3, Sliders } from 'lucide-react';

export default function Workflow() {
  const agents = [
    { name: 'Dataset Agent', desc: 'Validates structure and computes statistics.', icon: FileSpreadsheet, color: '#00f0ff' },
    { name: 'Task Detection Agent', desc: 'Identifies Classification or Regression.', icon: Binary, color: '#0072ff' },
    { name: 'Model Rec. Agent', desc: 'Selects optimal candidate algorithms.', icon: GitFork, color: '#7f00ff' },
    { name: 'Training Agent', desc: 'Trains models on splits in parallel.', icon: Server, color: '#bd00ff' },
    { name: 'Evaluation Agent', desc: 'Measures accuracy and creates leaderboards.', icon: BarChart3, color: '#ff007f' },
    { name: 'Optimization Agent', desc: 'Performs tuning to maximize score.', icon: Sliders, color: '#00ff7f' }
  ];

  return (
    <section id="workflow" style={{ overflow: 'hidden' }}>
      <div className="section-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Multi-Agent AI Workflow</h2>
          <p className="section-subtitle">
            A collaborative network of specialized AI agents working sequentially to automate your entire machine learning pipeline.
          </p>
        </motion.div>
      </div>

      {/* Horizontal workflow line (Desktop) / Vertical workflow (Mobile) */}
      <div className="workflow-container">
        {agents.map((agent, idx) => {
          const AgentIcon = agent.icon;
          return (
            <React.Fragment key={agent.name}>
              {/* Agent Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ 
                  y: -5,
                  borderColor: agent.color,
                  boxShadow: `0 0 25px ${agent.color}25`
                }}
                className="glass-panel agent-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '15px',
                  width: '200px',
                  position: 'relative',
                  flexShrink: 0,
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Glowing Node Dot */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: agent.color,
                    boxShadow: `0 0 10px ${agent.color}`
                  }}
                />

                {/* Icon Circle */}
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: `rgba(${agent.color === '#00f0ff' ? '0, 240, 255' : '189, 0, 255'}, 0.05)`,
                    border: `1px solid ${agent.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: agent.color,
                    boxShadow: `inset 0 0 12px ${agent.color}10`
                  }}
                >
                  <AgentIcon size={22} />
                </div>

                {/* Text */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>
                    {agent.name}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                    {agent.desc}
                  </p>
                </div>
              </motion.div>

              {/* Connector (Drawn between items, hidden after the last item) */}
              {idx < agents.length - 1 && (
                <div className="connector-container" style={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center', minWidth: '30px' }}>
                  {/* Desktop connector (horizontal) */}
                  <svg className="connector-desktop" width="100%" height="24" viewBox="0 0 100 24" fill="none" preserveAspectRatio="none" style={{ minWidth: '40px' }}>
                    <path d="M0,12 L100,12" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" strokeDasharray="6 6" />
                    {/* Glowing animated line */}
                    <motion.path 
                      d="M0,12 L100,12" 
                      stroke={`url(#grad-${idx})`} 
                      strokeWidth="2" 
                      strokeDasharray="10 40"
                      animate={{ strokeDashoffset: [-50, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <defs>
                      <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={agent.color} stopOpacity="0.2" />
                        <stop offset="50%" stopColor={agent.color} stopOpacity="1" />
                        <stop offset="100%" stopColor={agents[idx+1].color} stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Mobile connector (vertical) */}
                  <svg className="connector-mobile" width="24" height="40" viewBox="0 0 24 40" fill="none" style={{ display: 'none' }}>
                    <path d="M12,0 L12,40" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" strokeDasharray="6 6" />
                    <motion.path 
                      d="M12,0 L12,40" 
                      stroke={agent.color} 
                      strokeWidth="2" 
                      strokeDasharray="10 30"
                      animate={{ strokeDashoffset: [-40, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <style>{`
        .workflow-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          overflow-x: auto;
          padding: 20px 10px;
          gap: 10px;
        }
        .workflow-container::-webkit-scrollbar {
          height: 6px;
        }
        @media (max-width: 1024px) {
          .workflow-container {
            justify-content: flex-start;
          }
        }
        @media (max-width: 768px) {
          .workflow-container {
            flex-direction: column;
            align-items: center;
            gap: 0;
            overflow-x: visible;
          }
          .agent-card {
            width: 260px !important;
          }
          .connector-desktop {
            display: none !important;
          }
          .connector-mobile {
            display: block !important;
          }
          .connector-container {
            height: 40px;
            margin: 5px 0;
          }
        }
      `}</style>
    </section>
  );
}
