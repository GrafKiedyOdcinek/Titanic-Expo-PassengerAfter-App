import ORNTOPLEFT from "../assets/top-left.png";
import ORNMID from "../assets/mid-left-right.png";
import TRAITUP from "../assets/arrow-left-right.png";
import TRAITDOWN from "../assets/arrow-down-left-right.png";
import { useEffect, useState } from "react";

const OrnementRight = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 300, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col justify-between fixed right-0 z-10 rotate-180 h-[75%]">
      <div className="traitgauche">
        <img src={TRAITUP} alt="" />
      </div>
      <div className="ornement-milieu">
        <img src={ORNMID} alt="" />
      </div>
      <div className="traitdroit">
        <img src={TRAITDOWN} alt="" />
      </div>
      <div
        className="ornement-gauche transform scale-y-[-1]"
        style={{ opacity }}
      >
        <img src={ORNTOPLEFT} alt="" />
      </div>
    </div>
  );
};

export default OrnementRight;
