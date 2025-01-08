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
          días: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((difference / (1000 * 60)) % 60),
          segundos: Math.floor((difference / 1000) % 60),
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
    <span key={key}>
      {value} {key}{" "}
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
