# ESP – Experimental Syntax Platform

This is a **full-stack web application** for creating and running **no-code linguistic experiments** with Likert scale.

## Features
- **Authentication / Authorization** (login & signup system with JWT)  
- **Create No-Code Experiments** with custom stimuli and Likert scale size  
- **Welcome text + Instructions** for participants  
- **Demo Run mode** (for testing)  
- **Share experiment link** with participants  
- **Collect responses anonymously** (participant IDs auto-generated)  
- **Live tracking** of participant counts per experiment  
- **Export responses** to CSV (with anonymized IDs)  
- **Dashboard** for experiment management (edit, delete, copy link, export)  

---

## Tech Stack
- **Frontend Libraries**  
  - React  
  - React Router  
  - Axios  

- **Backend Frameworks**  
  - Node.js  
  - Express.js  

- **Database & ODM**  
  - MongoDB Atlas  
  - Mongoose  

- **Authentication**  
  - Context API (Frontend)  
  - JWT (Backend)  

- **Data Export**  
  - json2csv  

---

## Project Structure
```
esp-app/       # React frontend
esp-backend/   # Node.js/Express backend
```

---

## Installation & Run

### 1. Clone repository
```bash
git clone https://github.com/efthymiasakel/esp-platform.git
cd esp-platform
```

### 2. Setup Backend
```bash
cd esp-backend
npm install
```

Create a `.env` file inside `esp-backend/` with:
```env
MONGO_URI=your_mongo_connection_string
PORT=5000
JWT_SECRET=yourSecret
```

Run backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../esp-app
npm install
npm run dev
```

 Frontend runs on: [http://localhost:5173](http://localhost:5173)  
  Backend runs on: [http://localhost:5000](http://localhost:5000)  

---

## Usage
1. **Login / Signup** to access features.  
2. **Create No-Code Experiments** (enter title, stimuli, Likert scale, instructions).  
3. **Copy the experiment link** from the Dashboard and share it with participants.  
4. **Participants run the experiment anonymously** and their responses are stored.  
5. **Researcher can view live participants count** and export CSV results.  

---

## Author
**Efthymia Sakellariou**  

Developed as a final project for the **Coding Factory seminar** – Athens University of Economics and Business (AUEB).  
