import { useEffect } from 'react';
import './habit-card.styles.scss'



function setCircleProgress(percent: number): void {
  const circle = document.getElementById("progress") as SVGCircleElement | null;
  if (circle) {
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = `${offset}`;
  }
}
const HabitCard = () => {
  useEffect(() => {
    setCircleProgress(75);
  }, []);
    
  return (
    <div className="card">
      <div className="top-icons">
        <div className="user-icon">👤</div>
        <div className="streak">
          4 <span className="fire-icon">🔥</span>
        </div>
      </div>
      <div className="circle-container">
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke-dasharray="283"
            stroke-dashoffset="0"
          ></circle>
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke-dasharray="283"
            stroke-dashoffset="283"
            id="progress"
          ></circle>
        </svg>
        <div className="icon">🏃</div>
      </div>
      <div className="habit-name">Habit Name</div>
    </div>
  );
}

export default HabitCard;