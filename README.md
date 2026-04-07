# 🐾 Tail Tracker - Smart Pet Health Care App

[![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Tail Tracker** is a modern, feature-rich pet healthcare dashboard that helps pet owners monitor their furry friends' health, diet, activity, and medical records - all in one beautiful interface.

## ✨ Features

### 🏠 Dashboard
- Real-time health overview with IoT data simulation
- Activity, sleep, and vital signs tracking
- Environmental monitoring (temperature, humidity)
- AI-powered health insights
- Beautiful gradient UI with animated stats

### 🍽️ Diet Manager
- Smart feeding schedule management (CRUD operations)
- Manual feed controls with IoT simulation
- Bowl weight tracking
- Daily food intake calculations
- Export/import diet configuration as JSON
- Real-time feeding status updates

### 💊 Health Tracker
- Complete vaccination and medication logging
- Upcoming reminders with notification system
- Health metrics visualization (weight trends, heart rate, activity)
- Vital signs monitoring
- Medical history with filtering (upcoming/completed/vaccinations)
- Add/delete medical records

### 👤 Pet Profiles
- Multi-pet support with profile switching
- Pet bio and health information
- Weight tracking with trends
- Activity level indicators
- Quick stats overview (heart rate, activity, sleep)
- Remove and add new pets

### 🔐 Authentication
- Secure login/signup system
- Demo credentials provided
- Persistent sessions with localStorage
- Protected routes

### 🎨 UI/UX
- Collapsible sidebar navigation
- Responsive mobile-friendly design
- Smooth animations (wiggle, heartbeat, slideIn)
- Custom color palette (#ca8398, #dadbd5, #676354, #60a1b0)
- Modern gradient backgrounds
- Toast notifications for user actions

## 🚀 Tech Stack

- **Frontend**: React 18.2.0
- **Icons**: Lucide React
- **State Management**: React Context API
- **Styling**: Inline styles with CSS-in-JS
- **Persistence**: localStorage
- **Animations**: Custom CSS keyframes
- **Routing**: Custom state-based routing (no external deps)

## 📁 Project Structure
```tail-tracker/
├── public/
│ ├── index.html
│ ├── logo.png
│ └── logo32.png
├── src/
│ ├── App.js 
│ ├── index.js
│ ├── context/
│ │ └── PetContext.js 
│ ├── components/
│ │ ├── Login.js 
│ │ ├── Layout.js 
│ │ └── ui.js 
│ ├── pages/
│ │ ├── Dashboard.js 
│ │ ├── DietManager.js 
│ │ ├── Health.js 
│ │ └── PetProfile.js
│ └── styles/
│ └── theme.css
├── package.json
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

```cd tail-tracker
cd tail-tracker
npm install
npm start
```

### 🧪 Future Enhancements

- Backend integration with Node.js/Express
- Real IoT device connectivity
- Push notifications for reminders
- Data export (PDF/CSV)
- Multi-vet support
- Prescription management
- Photo gallery for pets
- Medication refill reminders
- Activity tracking with GPS
- Social sharing for pet achievements


### 📄 License
This project is released for educational and research purposes.
