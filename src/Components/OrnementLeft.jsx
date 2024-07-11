import ORNTOPLEFT from "../assets/top-left.png";
import ORNMID from "../assets/mid-left-right.png";
import TRAITUP from "../assets/arrow-left-right.png";
import TRAITDOWN from "../assets/arrow-down-left-right.png";

const OrnementLeft = () => {
  return (
    <div className="flex flex-col justify-between fixed left-0 z-10 h-[75%]">
      <div className="ornement-gauche">
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
