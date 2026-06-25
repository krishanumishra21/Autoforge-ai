# AutoForge AI — Multi-Agent AutoML Platform

AutoForge AI is a state-of-the-art **Multi-Agent AutoML (Automated Machine Learning) Platform** designed to democratize machine learning. It allows developers, data analysts, and non-technical users to upload raw CSV datasets and automatically generate trained, optimized, and production-ready machine learning models in seconds—without writing a single line of ML code.

Built as a modern full-stack web application, AutoForge AI divides the machine learning pipeline into specialized **AI Agents** that collaborate in sequence, rendering real-time terminal logs and comparative leaderboards on a premium, dark-themed dashboard.

---

## 🌟 Key Features

*   **Drag-and-Drop Ingestion:** Effortlessly upload custom CSV datasets.
*   **Curated Sample Datasets:** Test the platform instantly with preloaded samples (Iris for Multi-class Classification, Boston Housing for Regression, and Telecom Churn for Binary Classification).
*   **Step-by-Step Agent Visualizer:** Watch the sequential execution of five specialized AI agents with glowing indicators and active progress bars.
*   **Live scrolling Log Terminal:** A high-fidelity console showing terminal logs dynamically printed as the backend agents execute their operations.
*   **Leaderboard Comparison:** An interactive leaderboard ranking trained models by validation accuracy or $R^2$ score. The top-performing model is showcased as the "Winner" with neon gold highlights.
*   **Zero-Code Microservices:** Instantly export copy-pasteable **Python inference code** or a production-grade **FastAPI microservice script** to deploy the winning model immediately.
*   **Dual Offline/Online Mode:** Automatically detects if the API server is offline and switches to a high-fidelity local simulation, ensuring the application remains interactive and robust.

---

## ⚙️ Multi-Agent Architecture

AutoForge AI orchestrates specialized agents to handle each stage of the machine learning pipeline:

```
[Raw CSV] ──> (FastAPI) ──> [Dataset Agent] (Imputes missing values & sanitizes schema)
                                  │
                                  ▼
                            [Task Agent] (Determines Classification or Regression)
                                  │
                                  ▼
                            [Model Agent] (Selects optimal candidate algorithms)
                                  │
                                  ▼
                            [Training Agent] (Parallel training & feature encoding)
                                  │
                                  ▼
                            [Evaluation Agent] (Ranks models & generates API serving)
```

1.  **Dataset Agent:** Validates structural integrity, computes statistics, and automatically handles missing values using median/mode imputation.
2.  **Task Detection Agent:** Evaluates target column cardinality to determine if the problem is a Classification or Regression task.
3.  **Model Recommendation Agent:** Selects the most suitable algorithms (e.g., Random Forests, Logistic/Linear Regressions) based on the dataset's profile.
4.  **Training Agent:** Splits the dataset (80/20), encodes categorical text variables, trains all recommended models in parallel, and scores them.
5.  **Evaluation & Serving Agent:** Computes final metrics, crowns the winning model on the leaderboard, and generates deployment assets.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 19, Vite, Framer Motion (for animations), Lucide Icons, Vanilla CSS |
| **Backend** | FastAPI (Python), Uvicorn (asynchronous server), Python-Multipart |
| **Machine Learning** | Scikit-Learn (algorithms), Pandas (data cleaning), NumPy |
| **MLOps & Hosting** | Git, GitHub, Vercel (frontend), Render (backend), UptimeRobot (pings) |

---

## 🚀 Installation & Running Locally

Follow these steps to run the application on your local machine:

### Prerequisite
Ensure you have **Python 3.8+** and **Node.js 18+** installed.

### 1. Start the Backend API
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   *The API will be live at `http://localhost:8000`.*

### 2. Start the Frontend App
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the address shown (usually `http://localhost:5173`).

---

## 🌐 Production Deployment

The project is designed for seamless, continuous deployment using Git integration:

### Backend (Hosted on Render)
1. Set the root directory to `backend`.
2. Select **Python** runtime.
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. *Tip:* Set up a free monitor on **UptimeRobot** to ping the URL every 14 minutes to bypass Render's free-tier cold starts.

### Frontend (Hosted on Vercel)
1. Set the root directory to `frontend`.
2. Frame preset: **Vite**.
3. Output directory: `dist`.
4. Ensure you update `const API_URL` in `frontend/src/components/Demo.jsx` to your live Render backend URL before building.
