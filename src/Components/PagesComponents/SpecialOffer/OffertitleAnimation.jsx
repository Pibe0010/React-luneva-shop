import { SplitText } from "./SplitText.jsx";

export const OffertitleAnimation = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <SplitText
      text="Ofertas Especiales"
      className="text-2xl font-semibold text-center"
      delay={130}
      animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
      animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
      easing="easeOutCubic"
      threshold={0.2}
      rootMargin="-50px"
      onLetterAnimationComplete={handleAnimationComplete}
    />
  );
};
