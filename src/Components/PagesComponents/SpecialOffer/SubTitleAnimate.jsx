import { BlurText } from "./BlurText.jsx";

export const SubTitleAnimate = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <BlurText
      text="Luneva Shop, ¡Ofertas exclusivas para ti!"
      delay={200}
      animateBy="letters"
      direction="bottom"
      onAnimationComplete={handleAnimationComplete}
      className="text-2xl mb-8"
    />
  );
};
