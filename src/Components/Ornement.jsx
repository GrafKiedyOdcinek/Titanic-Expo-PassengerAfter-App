import ORNGAUCHE from "../assets/ornement-gauche.png";
import ORNMILIEU from "../assets/ornement-mid.png";
import ORNDROIT from "../assets/ornement-droite.png";
import TRAITGAUCHE from "../assets/ornement-trait.png";
import TRAITDROIT from "../assets/ornement-trait-droite.png";

const Ornement = () => {
  return (
    <div className="flex justify-between mt-2 fixed bottom-0 left-0 w-full p-5">
      <div className="ornement-gauche">
        <img src={ORNGAUCHE} alt="" />
      </div>
      <div className="traitgauche">
        <img src={TRAITGAUCHE} alt="" />
      </div>
      <div className="ornement-milieu">
        <img src={ORNMILIEU} alt="" />
      </div>
      <div className="traitdroit">
        <img src={TRAITDROIT} alt="" />
      </div>
      <div className="ornement-droit">
        <img src={ORNDROIT} alt="" />
      </div>
    </div>
  );
};

export default Ornement;
