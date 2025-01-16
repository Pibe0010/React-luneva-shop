import { useEffect, useState } from "react";
import "./Timer.css";

export const Timer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endDate = new Date(endTime.ending_date);

      const difference = +endDate - now;

      if (difference > 0) {
        return {
          D: Math.floor(difference / (1000 * 60 * 60 * 24)),
          H: Math.floor((difference / (1000 * 60 * 60)) % 24),
          M: Math.floor((difference / (1000 * 60)) % 60),
          S: Math.floor((difference / 1000) % 60),
        };
      }

      return {};
    };

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 200);

    return () => clearInterval(interval);
  }, [endTime]);

  const timerComponents = Object.entries(timeLeft).map(([key, value]) => (
    <span key={key} className="timer-item">
      {value < 10 ? `0${value}` : value}
    </span>
  ));

  return (
    <div className="offer-timer">
      {timerComponents.length > 0 ? (
        timerComponents
      ) : (
        <span>¡Tiempo agotado!</span>
      )}
    </div>
  );
};
