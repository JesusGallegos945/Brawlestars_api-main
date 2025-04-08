import React, { useState } from 'react';
import '../about/style.css';

export default function StrengthSportsModule() {
  const [activeTab, setActiveTab] = useState('gym');
  
  const sportsData = {
    gym: {
      title: "🏋️‍♂️ Traditional Gym",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      description: "Training with machines and free weights for overall muscle development.",
      benefits: [
        "Increased muscle mass",
        "Improved base strength",
        "Versatile equipment"
      ],
      keyExercises: ["Bench press", "Squats", "Deadlift", "Bicep curl"],
      intensity: "Moderate-High"
    },
    crossfit: {
      title: "🔥 CrossFit",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
      description: "High-intensity functional training combining multiple disciplines.",
      benefits: [
        "Improves cardiovascular capacity",
        "High calorie burn",
        "Power development"
      ],
      keyExercises: ["Burpees", "Snatch", "Box jumps", "Wall balls"],
      intensity: "High"
    },
    calisthenics: {
      title: "💪 Calisthenics",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c",
      description: "Uses body weight to develop strength and mobility.",
      benefits: [
        "No equipment needed",
        "Improves body control",
        "Relative strength"
      ],
      keyExercises: ["Muscle-ups", "Planche", "Front lever", "Handstand push-ups"],
      intensity: "Variable"
    },
    powerlifting: {
      title: "🏆 Powerlifting",
      image: "https://images.unsplash.com/photo-1571019614242-c955e458d71a",
      description: "Strength sport based on three main lifts.",
      benefits: [
        "Maximum strength development",
        "Refined technique",
        "Progression-focused"
      ],
      keyExercises: ["Squat", "Bench press", "Deadlift"],
      intensity: "Maximum"
    }
  };

  const currentSport = sportsData[activeTab];

  return (
    <div className="strength-sports-container">
      <h2>Strength Training Guide</h2>
      
      <div className="tabs">
        {Object.keys(sportsData).map((key) => (
          <button
            key={key}
            className={`tab-btn ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {sportsData[key].title.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="sport-content">
        <div className="sport-header">
          <h3>{currentSport.title}</h3>
          <div 
            className="sport-image"
            style={{ backgroundImage: `url(${currentSport.image})` }}
          ></div>
        </div>

        <div className="info-section">
          <h4>📝 Description</h4>
          <p>{currentSport.description}</p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h4>✅ Benefits</h4>
            <ul>
              {currentSport.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="info-card">
            <h4>🔝 Key Exercises</h4>
            <ul>
              {currentSport.keyExercises.map((exercise, index) => (
                <li key={index}>{exercise}</li>
              ))}
            </ul>
          </div>

          <div className="info-card">
            <h4>⚡ Intensity</h4>
            <p>{currentSport.intensity}</p>
            <div className="intensity-bar">
              <div 
                className="intensity-level"
                style={{ 
                  width: currentSport.intensity === 'Maximum' ? '100%' : 
                         currentSport.intensity === 'High' ? '75%' :
                         currentSport.intensity === 'Moderate-High' ? '60%' : '40%',
                  backgroundColor: currentSport.intensity === 'Maximum' ? '#e74c3c' :
                                  currentSport.intensity === 'High' ? '#e67e22' : '#f1c40f'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//         <Button