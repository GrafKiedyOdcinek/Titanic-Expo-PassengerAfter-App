import { useState, useEffect } from "react";
import ORNTOPLEFT from "../assets/top-left.png";
import ORNMID from "../assets/mid-left-right.png";
import TRAITUP from "../assets/arrow-left-right.png";
import TRAITDOWN from "../assets/arrow-down-left-right.png";

const OrnementLeft = () => {
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
    <div className="flex flex-col justify-between fixed left-0 z-10 h-[75%]">
      <div className="ornement-gauche" style={{ opacity }}>
        <img src={ORNTOPLEFT} alt="Ornement Top Left" />
      </div>
      <div className="traitgauche">
        <img src={TRAITUP} alt="Trait Up" />
      </div>
      <div className="ornement-milieu">
        <img src={ORNMID} alt="Ornement Middle" />
      </div>
      <div className="traitdroit">
        <img src={TRAITDOWN} alt="Trait Down" />
      </div>
    </div>
  );
};

export default OrnementLeft;
