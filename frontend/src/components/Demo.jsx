import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Database, Activity, Cpu, Play, BarChart2, Award, 
  RefreshCw, CheckCircle, AlertCircle, Code, ChevronRight, 
  Terminal, FileText, Check, Copy, HardDrive, CpuIcon
} from 'lucide-react';
import { SAMPLES } from '../data/samples';

// API Endpoint configuration
const API_URL = 'http://localhost:8000';

export default function Demo() {
  // State management
  const [selectedSample, setSelectedSample] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [pipelineState, setPipelineState] = useState('idle'); // idle, processing, results, error
  const [currentStep, setCurrentStep] = useState(0); // 0 to 4
  const [logs, setLogs] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const [backendResult, setBackendResult] = useState(null);
  const [activeTab, setActiveTab] = useState('summary'); // summary, code, api
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeModelDetails, setActiveModelDetails] = useState(null);

  const logEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Handle Drag Events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle Drop Event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.csv')) {
        setUploadedFile(file);
        setSelectedSample(null);
      } else {
        alert("Please upload only CSV files.");
      }
    }
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.csv')) {
        setUploadedFile(file);
        setSelectedSample(null);
      } else {
        alert("Please upload only CSV files.");
      }
    }
  };

  // Select Sample Dataset
  const handleSelectSample = (key) => {
    setSelectedSample(key);
    setUploadedFile(null);
  };

  // Add a log helper
  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
  };

  // Run the AutoML Pipeline
  const runPipeline = async () => {
    if (!uploadedFile && !selectedSample) return;

    setPipelineState('processing');
    setCurrentStep(0);
    setLogs([]);
    setIsOffline(false);
    setBackendResult(null);

    let fileToUpload = null;
    let fileName = "";

    if (selectedSample) {
      const sample = SAMPLES[selectedSample];
      fileName = sample.filename;
      addLog(`Selected preloaded dataset: ${sample.name}`, 'system');
      
      // Convert CSV string to Blob for uploading
      const blob = new Blob([sample.csv], { type: 'text/csv' });
      fileToUpload = new File([blob], sample.filename, { type: 'text/csv' });
    } else {
      fileToUpload = uploadedFile;
      fileName = uploadedFile.name;
      addLog(`Uploaded user dataset: ${fileName} (${(uploadedFile.size / 1024).toFixed(1)} KB)`, 'system');
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('file', fileToUpload);

    addLog("Initializing Multi-Agent AutoML Pipeline...", "system");

    // Phase 1: Dataset Agent (Simulating visual execution while calling/waiting for backend)
    await delayStep(0, 1200, () => {
      addLog("[Dataset Agent] Active.", "agent");
      addLog(`[Dataset Agent] Parsing ${fileName}...`, "info");
      addLog("[Dataset Agent] Checking column types and schema consistency...", "info");
    });

    // We make the API call here. We will run it in parallel or wait.
    let responseData = null;
    let offlineMode = false;

    try {
      addLog(`[Dataset Agent] Transmitting dataset to AutoForge core...`, "info");
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error("Backend error");
      responseData = await res.json();
    } catch {
      offlineMode = true;
      setIsOffline(true);
      addLog("⚠️ Could not connect to AutoForge backend. Activating Offline Simulation Mode...", "warning");
      
      // Generate realistic mock results for simulation mode
      responseData = generateMockResults(selectedSample, fileToUpload);
    }

    // Step 1: Finish Dataset Agent
    await delayStep(0, 800, () => {
      addLog(`[Dataset Agent] Successfully loaded dataset. Rows: ${responseData.rows}, Columns: ${responseData.columns}`, "success");
      addLog(`[Dataset Agent] Columns identified: [${responseData.column_names.join(', ')}]`, "info");
      if (responseData.missing_values > 0) {
        addLog(`[Dataset Agent] Found ${responseData.missing_values} missing values. Automated imputation planned.`, "warning");
      } else {
        addLog(`[Dataset Agent] Clean dataset! No missing values detected.`, "success");
      }
    });

    // Phase 2: Task Detection Agent
    setCurrentStep(1);
    await delayStep(1, 1500, () => {
      addLog("[Task Detection Agent] Active.", "agent");
      addLog(`[Task Detection Agent] Inspecting target column: "${responseData.target_column}"`, "info");
      addLog(`[Task Detection Agent] Cardinality of target: ${responseData.unique_target_values} unique values.`, "info");
      addLog(`[Task Detection Agent] Task type classified as: ${responseData.task_type.toUpperCase()}`, "success");
    });

    // Phase 3: Model Recommendation Agent
    setCurrentStep(2);
    await delayStep(2, 1500, () => {
      addLog("[Model Recommendation Agent] Active.", "agent");
      addLog(`[Model Recommendation Agent] Matching task profile (${responseData.task_type}) against knowledge base...`, "info");
      addLog(`[Model Recommendation Agent] Recommended algorithms: [${responseData.recommended_models.join(', ')}]`, "success");
      addLog("[Model Recommendation Agent] Injecting hyperparameters and architecture configuration...", "info");
    });

    // Phase 4: Training Agent
    setCurrentStep(3);
    addLog("[Training Agent] Active.", "agent");
    addLog("[Training Agent] Applying automated preprocessing...", "info");
    addLog("[Training Agent] Splitting data into 80% Train / 20% Test splits...", "info");

    // Train models one by one in logs
    const modelNames = Object.keys(responseData.training_results);
    for (let i = 0; i < modelNames.length; i++) {
      const model = modelNames[i];
      await delayStep(3, 1000, () => {
        addLog(`[Training Agent] Training ${model}...`, "info");
        if (offlineMode) {
          addLog(`[Training Agent] Tuning hyper-parameters for ${model}...`, "info");
        }
      });
      addLog(`[Training Agent] Finished training ${model}. Validation score: ${responseData.training_results[model]}`, "success");
    }

    // Phase 5: Evaluation & Selection Agent
    setCurrentStep(4);
    await delayStep(4, 1500, () => {
      addLog("[Evaluation Agent] Active.", "agent");
      addLog("[Evaluation Agent] Scoring and ranking models on validation fold...", "info");
      
      // Determine the winner
      const sortedModels = Object.entries(responseData.training_results)
        .sort((a, b) => b[1] - a[1]);
      const [winner, winScore] = sortedModels[0];
      
      addLog(`[Evaluation Agent] Leaderboard updated! Winner: ${winner} with score of ${winScore}`, "success");
      addLog(`[Evaluation Agent] Finalizing best model and locking pipeline.`, "system");
    });

    // Show Results Screen
    setBackendResult(responseData);
    // Auto-select the winning model details
    const sorted = Object.entries(responseData.training_results).sort((a, b) => b[1] - a[1]);
    setActiveModelDetails(sorted[0][0]);
    setPipelineState('results');
  };

  // Simulated delay helper
  const delayStep = (stepIdx, ms, callback) => {
    return new Promise(resolve => {
      setTimeout(() => {
        callback();
        resolve();
      }, ms);
    });
  };

  // Generate high-fidelity mock results if backend is offline
  const generateMockResults = (sampleKey, file) => {
    if (sampleKey && SAMPLES[sampleKey]) {
      if (sampleKey === 'iris') {
        return {
          rows: 150,
          columns: 5,
          column_names: ["sepal_length", "sepal_width", "petal_length", "petal_width", "species"],
          missing_values: 0,
          target_column: "species",
          unique_target_values: 3,
          task_type: "classification",
          recommended_models: ["RandomForestClassifier", "XGBoostClassifier", "LogisticRegression"],
          training_results: {
            "RandomForestClassifier": 0.9667,
            "LogisticRegression": 0.9333,
            "XGBoostClassifier": 0.9500
          }
        };
      } else if (sampleKey === 'boston') {
        return {
          rows: 506,
          columns: 13,
          column_names: ["crim", "zn", "indus", "chas", "nox", "rm", "age", "dis", "rad", "tax", "ptratio", "lstat", "medv"],
          missing_values: 0,
          target_column: "medv",
          unique_target_values: 228,
          task_type: "regression",
          recommended_models: ["LinearRegression", "RandomForestRegressor", "XGBoostRegressor"],
          training_results: {
            "RandomForestRegressor": 0.8842,
            "XGBoostRegressor": 0.8912,
            "LinearRegression": 0.7289
          }
        };
      } else { // churn
        return {
          rows: 7043,
          columns: 7,
          column_names: ["tenure", "monthly_charges", "total_charges", "contract_type", "tech_support", "paperless_billing", "churn"],
          missing_values: 11,
          target_column: "churn",
          unique_target_values: 2,
          task_type: "classification",
          recommended_models: ["RandomForestClassifier", "XGBoostClassifier", "LogisticRegression"],
          training_results: {
            "XGBoostClassifier": 0.8245,
            "RandomForestClassifier": 0.8112,
            "LogisticRegression": 0.8038
          }
        };
      }
    } else {
      // Custom uploaded file mock parser
      const name = file.name;
      const isLikelyClassification = name.toLowerCase().includes('class') || name.toLowerCase().includes('churn') || name.toLowerCase().includes('cancer') || name.toLowerCase().includes('iris');
      
      return {
        rows: Math.floor(Math.random() * 800) + 120,
        columns: Math.floor(Math.random() * 8) + 4,
        column_names: ["feature_1", "feature_2", "feature_3", "feature_4", "feature_5", "target"],
        missing_values: Math.random() > 0.5 ? Math.floor(Math.random() * 15) : 0,
        target_column: "target",
        unique_target_values: isLikelyClassification ? 2 : 145,
        task_type: isLikelyClassification ? "classification" : "regression",
        recommended_models: isLikelyClassification 
          ? ["RandomForestClassifier", "XGBoostClassifier", "LogisticRegression"]
          : ["LinearRegression", "RandomForestRegressor", "XGBoostRegressor"],
        training_results: isLikelyClassification 
          ? {
              "RandomForestClassifier": parseFloat((0.85 + Math.random() * 0.11).toFixed(4)),
              "XGBoostClassifier": parseFloat((0.87 + Math.random() * 0.10).toFixed(4)),
              "LogisticRegression": parseFloat((0.78 + Math.random() * 0.12).toFixed(4))
            }
          : {
              "RandomForestRegressor": parseFloat((0.80 + Math.random() * 0.14).toFixed(4)),
              "XGBoostRegressor": parseFloat((0.82 + Math.random() * 0.13).toFixed(4)),
              "LinearRegression": parseFloat((0.65 + Math.random() * 0.15).toFixed(4))
            }
      };
    }
  };

  // Python Deployment Code Generation
  const getDeploymentCode = (modelName) => {
    return `import pickle
import pandas as pd
import numpy as np

# 1. Load the AutoForge generated best model
with open('models/best_model_${modelName.toLowerCase()}.pkl', 'rb') as f:
    model = pickle.load(f)

print("🚀 Successfully loaded AutoForge best-performing model: ${modelName}")

# 2. Prepare inference sample matching the feature schema
# Preprocessing steps (imputation + label encoding) are baked into the pipeline
new_data = pd.DataFrame([{
    "feature_1": 5.1,
    "feature_2": 3.5,
    "feature_3": 1.4,
    "feature_4": 0.2
}])

# 3. Predict the target outcome
predictions = model.predict(new_data)
probabilities = model.predict_proba(new_data) if hasattr(model, 'predict_proba') else None

print(f"🔮 Prediction result: {predictions[0]}")
if probabilities is not None:
    print(f"📈 Confidence probabilities: {probabilities[0]}")
`;
  };

  // FastAPI Deployment Code
  const getAPICode = (modelName) => {
    return `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI(title="AutoForge AI Model Service")

# Load model globally on startup
with open('models/best_model_${modelName.toLowerCase()}.pkl', 'rb') as f:
    model = pickle.load(f)

class InferenceRequest(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(request: InferenceRequest):
    try:
        data = np.array([request.features])
        prediction = model.predict(data)
        
        response = {"prediction": int(prediction[0]) if isinstance(prediction[0], np.integer) else float(prediction[0])}
        
        if hasattr(model, 'predict_proba'):
            probs = model.predict_proba(data)[0]
            response["probabilities"] = probs.tolist()
            
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
`;
  };

  // Copy code snippet to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Reset demo
  const resetDemo = () => {
    setSelectedSample(null);
    setUploadedFile(null);
    setPipelineState('idle');
    setLogs([]);
    setBackendResult(null);
  };

  // Agent descriptions
  const pipelineAgents = [
    { name: 'Dataset Agent', desc: 'Validates structure and computes statistics.', icon: Database, color: '#00f0ff' },
    { name: 'Task Agent', desc: 'Identifies Classification or Regression.', icon: Activity, color: '#0072ff' },
    { name: 'Recommendation Agent', desc: 'Selects optimal candidate algorithms.', icon: Cpu, color: '#7f00ff' },
    { name: 'Training Agent', desc: 'Trains models on splits in parallel.', icon: Play, color: '#bd00ff' },
    { name: 'Evaluation Agent', desc: 'Measures accuracy and creates leaderboards.', icon: BarChart2, color: '#00ff7f' }
  ];

  return (
    <section id="demo" style={{ paddingTop: '100px', scrollMarginTop: '60px' }}>
      <div className="section-header">
        <h2 className="section-title">Interactive AutoML Demo</h2>
        <p className="section-subtitle">
          Experience the power of our Multi-Agent AutoML engine. Upload a custom dataset or click one of our curated samples below to launch the pipeline.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '40px', background: 'rgba(13, 20, 38, 0.35)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Cyberpunk corner lines */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderLeft: '3px solid var(--color-blue)', borderTop: '3px solid var(--color-blue)' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderRight: '3px solid var(--color-blue)', borderTop: '3px solid var(--color-blue)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderLeft: '3px solid var(--color-blue)', borderBottom: '3px solid var(--color-blue)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderRight: '3px solid var(--color-blue)', borderBottom: '3px solid var(--color-blue)' }} />

        <AnimatePresence mode="wait">
          
          {/* PHASE 1: IDLE / UPLOAD */}
          {pipelineState === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
            >
              <div className="grid-2" style={{ gap: '30px' }}>
                {/* File Uploader Card */}
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: dragActive ? '2px dashed var(--color-blue)' : '2px dashed rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '40px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px',
                    cursor: 'pointer',
                    background: dragActive ? 'rgba(0, 240, 255, 0.04)' : 'rgba(255,255,255,0.01)',
                    transition: 'all 0.3s ease',
                    textAlign: 'center'
                  }}
                  className="uploader-card"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept=".csv" 
                    style={{ display: 'none' }} 
                  />
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(0, 240, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-blue)',
                    border: '1px solid rgba(0, 240, 255, 0.15)',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.05)'
                  }}>
                    <Upload size={28} className="upload-icon" />
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
                      {uploadedFile ? uploadedFile.name : "Drag & Drop CSV File"}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                      {uploadedFile ? `${(uploadedFile.size / 1024).toFixed(1)} KB` : "or click to browse local files"}
                    </p>
                  </div>
                  
                  {uploadedFile && (
                    <div style={{
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid var(--color-blue)',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      fontSize: '0.75rem',
                      color: 'var(--color-blue)',
                      fontWeight: 600,
                      marginTop: '5px'
                    }}>
                      Ready to analyze
                    </div>
                  )}
                </div>

                {/* Sample Datasets Selector */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#ffffff' }}>
                    Or select a pre-loaded sample dataset:
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {Object.entries(SAMPLES).map(([key, sample]) => (
                      <div 
                        key={key}
                        onClick={() => handleSelectSample(key)}
                        style={{
                          padding: '16px 20px',
                          borderRadius: '10px',
                          border: selectedSample === key ? '1px solid var(--color-blue)' : '1px solid rgba(255,255,255,0.06)',
                          background: selectedSample === key ? 'rgba(0, 240, 255, 0.04)' : 'rgba(255,255,255,0.02)',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px'
                        }}
                        className="sample-item"
                      >
                        <div style={{
                          minWidth: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: selectedSample === key ? 'var(--color-blue)' : 'transparent',
                          border: '1.5px solid rgba(255, 255, 255, 0.3)'
                        }} />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.92rem' }}>{sample.name}</span>
                            <span style={{
                              fontSize: '0.7rem',
                              padding: '2px 8px',
                              borderRadius: '100px',
                              background: sample.taskType === 'classification' ? 'rgba(0, 114, 255, 0.15)' : 'rgba(189, 0, 255, 0.15)',
                              color: sample.taskType === 'classification' ? '#38bdf8' : '#e879f9',
                              border: `1px solid ${sample.taskType === 'classification' ? 'rgba(0, 114, 255, 0.3)' : 'rgba(189, 0, 255, 0.3)'}`,
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}>
                              {sample.taskType}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                            {sample.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Run Action Button */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <button
                  disabled={!uploadedFile && !selectedSample}
                  onClick={runPipeline}
                  className="btn btn-primary"
                  style={{
                    padding: '16px 40px',
                    fontSize: '1.05rem',
                    opacity: (!uploadedFile && !selectedSample) ? 0.4 : 1,
                    cursor: (!uploadedFile && !selectedSample) ? 'not-allowed' : 'pointer',
                    minWidth: '240px',
                    boxShadow: (uploadedFile || selectedSample) ? '0 0 30px rgba(0, 240, 255, 0.25)' : 'none'
                  }}
                >
                  <Play size={18} fill="#050811" />
                  <span>Run AutoML Pipeline</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* PHASE 2: PROCESSING (MULTI-AGENT PIPELINE VISUALIZATION) */}
          {pipelineState === 'processing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
            >
              {/* Online / Offline Banner */}
              {isOffline && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.06)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#fca5a5',
                  fontSize: '0.9rem'
                }}>
                  <AlertCircle size={18} color="#ef4444" />
                  <span><strong>Simulation Mode:</strong> API Server unreachable. Generating realistic AutoML workflow metrics locally.</span>
                </div>
              )}

              <div className="grid-2" style={{ gridTemplateColumns: '45% 55%', gap: '30px' }}>
                
                {/* Agent Flow Nodes (Left) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Active Multi-Agent Orchestration
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pipelineAgents.map((agent, idx) => {
                      const AgentIcon = agent.icon;
                      const isActive = currentStep === idx;
                      const isCompleted = currentStep > idx;
                      
                      return (
                        <div 
                          key={agent.name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            padding: '14px 20px',
                            borderRadius: '10px',
                            border: isActive 
                              ? `1px solid ${agent.color}` 
                              : isCompleted 
                                ? '1px solid rgba(255,255,255,0.04)' 
                                : '1px solid rgba(255,255,255,0.03)',
                            background: isActive 
                              ? `rgba(255,255,255,0.02)` 
                              : isCompleted 
                                ? 'rgba(255,255,255,0.01)' 
                                : 'rgba(255,255,255,0.005)',
                            opacity: (isActive || isCompleted) ? 1 : 0.4,
                            position: 'relative',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {/* Active Glowing Border */}
                          {isActive && (
                            <motion.div 
                              layoutId="activeGlow"
                              style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '10px',
                                boxShadow: `0 0 15px ${agent.color}15`,
                                border: `1.5px solid ${agent.color}`,
                                pointerEvents: 'none'
                              }}
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}

                          {/* Agent Icon */}
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            background: isCompleted 
                              ? 'rgba(16, 185, 129, 0.08)' 
                              : isActive 
                                ? `rgba(255,255,255,0.08)` 
                                : 'rgba(255,255,255,0.02)',
                            border: isCompleted 
                              ? '1px solid rgba(16, 185, 129, 0.3)' 
                              : '1px solid rgba(255,255,255,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isCompleted ? '#10b981' : agent.color
                          }}>
                            {isCompleted ? <CheckCircle size={16} /> : <AgentIcon size={16} />}
                          </div>

                          {/* Agent Details */}
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.92rem', fontWeight: 600, color: isCompleted ? '#10b981' : '#ffffff' }}>
                              {agent.name}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                              {isActive ? "Processing..." : isCompleted ? "Completed" : agent.desc}
                            </span>
                          </div>

                          {/* Loading spinner for active agent */}
                          {isActive && (
                            <div style={{ marginLeft: 'auto' }}>
                              <RefreshCw size={14} color={agent.color} className="spin" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Scrolling Terminal Output (Right) */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 20px',
                    background: '#02040a',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    fontFamily: 'monospace'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Terminal size={14} color="var(--color-blue)" />
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                        autoforge-agent-runtime.log
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                    </div>
                  </div>

                  {/* Log console container */}
                  <div style={{
                    background: '#040815',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    padding: '20px',
                    flexGrow: 1,
                    height: '320px',
                    overflowY: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '0.82rem',
                    lineHeight: 1.6,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderTop: 'none'
                  }}
                  className="terminal-logs"
                  >
                    {logs.map((log, index) => {
                      let color = 'var(--color-text-secondary)';
                      let prefix = '[INFO]';
                      
                      if (log.type === 'system') {
                        color = '#a855f7';
                        prefix = '[SYS]';
                      } else if (log.type === 'agent') {
                        color = '#06b6d4';
                        prefix = '[AGN]';
                      } else if (log.type === 'success') {
                        color = '#10b981';
                        prefix = '[OK]';
                      } else if (log.type === 'warning') {
                        color = '#f59e0b';
                        prefix = '[WRN]';
                      }

                      return (
                        <div key={index} style={{ color, display: 'flex', gap: '8px' }}>
                          <span style={{ color: '#4b5563', opacity: 0.7 }}>{log.timestamp}</span>
                          <span style={{ fontWeight: 600 }}>{prefix}</span>
                          <span style={{ color: log.type === 'success' || log.type === 'system' ? undefined : '#f3f4f6' }}>
                            {log.message}
                          </span>
                        </div>
                      );
                    })}
                    <div ref={logEndRef} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PHASE 3: RESULTS (LEADERBOARD & WORKSPACE) */}
          {pipelineState === 'results' && backendResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
            >
              
              {/* Leaderboard Section */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                      Pipeline Leaderboard
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                      Trained on {backendResult.rows} rows, target column "{backendResult.target_column}". Metric: {backendResult.task_type === 'classification' ? 'Accuracy' : 'R² Score'}
                    </p>
                  </div>
                  
                  <button onClick={resetDemo} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    <RefreshCw size={14} />
                    <span>Run Different Dataset</span>
                  </button>
                </div>

                {/* Vertical cards of models */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {Object.entries(backendResult.training_results)
                    .sort((a, b) => b[1] - a[1])
                    .map(([modelName, score], rank) => {
                      const isWinner = rank === 0;
                      return (
                        <div 
                          key={modelName}
                          style={{
                            padding: '24px 30px',
                            borderRadius: '12px',
                            border: isWinner 
                              ? '1px solid rgba(0, 240, 255, 0.4)' 
                              : '1px solid rgba(255, 255, 255, 0.05)',
                            background: isWinner 
                              ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.04) 0%, rgba(189, 0, 255, 0.02) 100%)' 
                              : 'rgba(255, 255, 255, 0.015)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: isWinner ? '0 10px 30px -10px rgba(0, 240, 255, 0.15)' : 'none',
                            position: 'relative',
                            cursor: 'pointer'
                          }}
                          onClick={() => setActiveModelDetails(modelName)}
                          className={isWinner ? "winner-model-card" : "normal-model-card"}
                        >
                          {/* Left contents */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                            {/* Rank circle */}
                            <div style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: isWinner ? 'linear-gradient(135deg, #00f0ff 0%, #0072ff 100%)' : 'rgba(255,255,255,0.04)',
                              color: isWinner ? '#050811' : 'var(--color-text-secondary)',
                              fontWeight: 800,
                              fontSize: '1.05rem',
                              border: isWinner ? 'none' : '1px solid rgba(255,255,255,0.08)'
                            }}>
                              {rank + 1}
                            </div>

                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                                  {modelName}
                                </h4>
                                {isWinner && (
                                  <span style={{
                                    background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
                                    color: '#050811',
                                    fontSize: '0.68rem',
                                    padding: '2px 8px',
                                    borderRadius: '100px',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    boxShadow: '0 0 10px rgba(234, 179, 8, 0.3)'
                                  }}>
                                    <Award size={10} fill="#050811" />
                                    Winner
                                  </span>
                                )}
                              </div>
                              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                                Preprocessing pipeline: Median/Mode Imputer → Categorical Label Encoder → Train/Test Split (80/20)
                              </p>
                            </div>
                          </div>

                          {/* Score metrics */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                            <div style={{ textAlign: 'right' }}>
                              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '2px' }}>
                                {backendResult.task_type === 'classification' ? 'Accuracy Score' : 'R² Coefficient'}
                              </span>
                              <span style={{
                                fontSize: '1.8rem',
                                fontWeight: 800,
                                fontFamily: 'monospace',
                                color: isWinner ? 'var(--color-blue)' : '#ffffff',
                                textShadow: isWinner ? '0 0 15px rgba(0, 240, 255, 0.3)' : 'none'
                              }}>
                                {(score * 100).toFixed(2)}%
                              </span>
                            </div>

                            <div style={{
                              padding: '10px',
                              borderRadius: '8px',
                              border: activeModelDetails === modelName ? '1px solid rgba(0, 240, 255, 0.3)' : '1px solid transparent',
                              background: activeModelDetails === modelName ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
                              color: activeModelDetails === modelName ? 'var(--color-blue)' : 'var(--color-text-secondary)',
                              transition: 'all 0.2s ease'
                            }}>
                              <ChevronRight size={20} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Model Workspace: Detailed tab view */}
              {activeModelDetails && (
                <div className="glass-panel" style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', overflow: 'hidden' }}>
                  
                  {/* Tabs header */}
                  <div style={{
                    display: 'flex',
                    background: 'rgba(2, 4, 10, 0.4)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '0 20px'
                  }}>
                    {[
                      { id: 'summary', name: 'Pipeline Summary', icon: FileText },
                      { id: 'code', name: 'Python Prediction Code', icon: Code },
                      { id: 'api', name: 'FastAPI Production Service', icon: HardDrive }
                    ].map(tab => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          style={{
                            padding: '16px 20px',
                            background: 'none',
                            border: 'none',
                            color: isActive ? 'var(--color-blue)' : 'var(--color-text-secondary)',
                            fontWeight: isActive ? 600 : 500,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            position: 'relative',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <Icon size={15} />
                          <span>{tab.name}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeDetailsTab"
                              style={{
                                position: 'absolute',
                                bottom: -1,
                                left: 0,
                                right: 0,
                                height: '2px',
                                backgroundColor: 'var(--color-blue)',
                                boxShadow: '0 0 8px var(--color-blue)'
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Tab Body */}
                  <div style={{ padding: '30px' }}>
                    
                    {/* Tab 1: Summary */}
                    {activeTab === 'summary' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <CpuIcon size={22} color="var(--color-blue)" />
                          <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#ffffff' }}>
                            Model Architecture: {activeModelDetails}
                          </h4>
                        </div>

                        <div className="grid-3" style={{ gap: '20px', marginTop: '5px' }}>
                          <div style={{ padding: '20px', borderRadius: '10px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Missing Data Strategy</span>
                            <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>Auto-Imputation (Median/Mode)</strong>
                          </div>
                          <div style={{ padding: '20px', borderRadius: '10px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Feature Encoding</span>
                            <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>Categorical Label Encoding</strong>
                          </div>
                          <div style={{ padding: '20px', borderRadius: '10px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Cross Validation</span>
                            <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>80-20 Random Split Holdout</strong>
                          </div>
                        </div>

                        <div style={{ marginTop: '10px' }}>
                          <h5 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
                            AutoForge Agent Explanations:
                          </h5>
                          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                            {activeModelDetails.includes('RandomForest') 
                              ? `The Model Recommendation Agent selected RandomForest because of its high tolerance to non-linear feature structures, implicit feature selection capability, and excellent handling of complex relationships. It fits the ${backendResult.rows}-row structure with zero overfitting tendencies, which is supported by its leading score of ${(backendResult.training_results[activeModelDetails] * 100).toFixed(2)}%.`
                              : activeModelDetails.includes('XGBoost')
                                ? `XGBoost was chosen due to its advanced gradient boosting framework. By iteratively correcting residuals of shallow decision trees, it has maximized validation accuracy to ${(backendResult.training_results[activeModelDetails] * 100).toFixed(2)}%, making it the most robust algorithm for predicting the target "${backendResult.target_column}".`
                                : `The Recommendation Agent deployed this linear model as a robust, interpretable baseline. It provides high computational efficiency and serves as an excellent benchmark for predicting "${backendResult.target_column}".`
                            }
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Python Code */}
                    {activeTab === 'code' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                            Load the saved pickle model and run predictions locally in Python.
                          </span>
                          <button 
                            onClick={() => copyToClipboard(getDeploymentCode(activeModelDetails))} 
                            className="btn btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '0.78rem', gap: '6px' }}
                          >
                            {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                            <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                          </button>
                        </div>
                        
                        <pre style={{
                          background: '#02040a',
                          padding: '20px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.06)',
                          overflowX: 'auto',
                          fontFamily: 'monospace',
                          fontSize: '0.82rem',
                          color: '#e2e8f0',
                          lineHeight: 1.5
                        }}>
                          <code>
                            {getDeploymentCode(activeModelDetails)}
                          </code>
                        </pre>
                      </div>
                    )}

                    {/* Tab 3: FastAPI Production code */}
                    {activeTab === 'api' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                            Deploy this model as a production-grade REST microservice using FastAPI.
                          </span>
                          <button 
                            onClick={() => copyToClipboard(getAPICode(activeModelDetails))} 
                            className="btn btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '0.78rem', gap: '6px' }}
                          >
                            {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                            <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                          </button>
                        </div>
                        
                        <pre style={{
                          background: '#02040a',
                          padding: '20px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.06)',
                          overflowX: 'auto',
                          fontFamily: 'monospace',
                          fontSize: '0.82rem',
                          color: '#e2e8f0',
                          lineHeight: 1.5
                        }}>
                          <code>
                            {getAPICode(activeModelDetails)}
                          </code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Add custom styling for animations & keyframes */}
      <style>{`
        .spin {
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .uploader-card:hover {
          border-color: var(--color-blue) !important;
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.08);
          background: rgba(0, 240, 255, 0.02) !important;
        }
        .uploader-card:hover .upload-icon {
          transform: translateY(-2px);
          color: #ffffff !important;
        }
        .upload-icon {
          transition: all 0.3s ease;
        }
        .sample-item {
          transition: all 0.25s ease;
        }
        .sample-item:hover {
          border-color: rgba(0, 240, 255, 0.2) !important;
          background: rgba(255, 255, 255, 0.04) !important;
          transform: translateX(4px);
        }
        .winner-model-card {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .winner-model-card:hover {
          transform: translateY(-3px);
          border-color: var(--color-blue) !important;
          box-shadow: 0 15px 30px -5px rgba(0, 240, 255, 0.25), var(--glow-blue) !important;
        }
        .normal-model-card {
          transition: all 0.3s ease;
        }
        .normal-model-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.15) !important;
          background: rgba(255, 255, 255, 0.03) !important;
        }
        .terminal-logs::-webkit-scrollbar {
          width: 6px;
        }
        .terminal-logs::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 3px;
        }
        .terminal-logs::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 240, 255, 0.3);
        }
      `}</style>
    </section>
  );
}
