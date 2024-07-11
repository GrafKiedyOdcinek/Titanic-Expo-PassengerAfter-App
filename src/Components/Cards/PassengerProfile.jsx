import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";
import passengerDataEN from "../../Data/passengerEN.json";
import passengerDataFR from "../../Data/passengerFR.json";
import DefaultPicture from "../../assets/default.png";
import Ornement from "../Ornement";
import OrnementLeft from "../OrnementLeft";
import OrnementRight from "../OrnementRight";

const PassengerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const passengerID = parseInt(id);
  const [data, setData] = useState([]);
  const [passenger, setPassenger] = useState(null);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  useEffect(() => {
    const loadData = () => {
      if (language === "FR") {
        setData(passengerDataFR);
      } else {
        setData(passengerDataEN);
      }
    };
    loadData();
  }, [language]);

  useEffect(() => {
    const passenger = data.find(
      (passenger) => passenger.passengerID === passengerID
    );
    setPassenger(passenger);
  }, [data, passengerID]);

  const getNextPassenger = () => {
    const nextID = passengerID < data.length ? passengerID + 1 : 1;
    return data.find((passenger) => passenger.passengerID === nextID);
  };

  const getPreviousPassenger = () => {
    const prevID = passengerID > 1 ? passengerID - 1 : data.length;
    return data.find((passenger) => passenger.passengerID === prevID);
  };

  const nextPassenger = getNextPassenger();
  const previousPassenger = getPreviousPassenger();

  const handlers = useSwipeable({
    onSwipedLeft: () => navigate(`/passenger/${nextPassenger.passengerID}`),
    onSwipedRight: () =>
      navigate(`/passenger/${previousPassenger.passengerID}`),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const getSurvivalStatus = () => {
    if (language === "FR") {
      return passenger.survived ? "Survivant" : "Décédé";
    } else {
      return passenger.survived ? "Survived" : "Lost";
    }
  };

  return (
    <div className="p-4">
      <OrnementLeft />
      <OrnementRight />
      <div className="flex justify-center mt-10">
        <header className=" flex justify-between items-center gap-4">
          <Link to="/" className="text-2xl font-bold">
            <button className="border rounded-full w-32 p-2 text-center transition-all bg-white ripple">
              <i className="fa-solid fa-arrow-left text-black"></i>
            </button>
          </Link>
          <div className="language flex gap-6">
            <Popover placement="bottom-end">
              <PopoverHandler>
                <button>
                  <div className="fr border rounded-full bg-white w-[30px] h-[30px] flex items-center justify-center p-[30px]">
                    <p className="text-black">{language}</p>
                  </div>
                </button>
              </PopoverHandler>
              <PopoverContent className="w-72 pb-0">
                <div
                  onClick={() => changeLanguage("FR")}
                  className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4 cursor-pointer"
                >
                  <div className="fr border rounded-full bg-[#0d1625] w-[30px] h-[30px] flex items-center justify-center">
                    <p className="text-white">FR</p>
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Français
                    </Typography>
                  </div>
                </div>
                <div
                  onClick={() => changeLanguage("EN")}
                  className="flex items-center gap-4 border-b border-blue-gray-50 pb-4 cursor-pointer"
                >
                  <div className="fr border rounded-full bg-[#0d1625] w-[30px] h-[30px] flex items-center justify-center">
                    <p className="text-white">EN</p>
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      English
                    </Typography>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
      </div>
      <div className="flex justify-center">
        <div className="separator border mt-6 w-[80%]"></div>
      </div>
      <main {...handlers}>
        <div className="flex flex-col justify-center items-center">
          {passenger ? (
            <div className="passenger-profile flex flex-col justify-center items-center gap-1 p-6 sm:max-w-[80%] md:max-w-[80%] lg:max-w-[70%]">
              <div className="flex gap-10 w-full justify-between items-center">
                <button
                  onClick={() =>
                    navigate(`/passenger/${previousPassenger.passengerID}`)
                  }
                  className="p-2 text-center hover:text-gray-800 transition-all"
                >
                  <i className="fa-solid fa-caret-left text-7xl"></i>
                </button>
                <div className="passenger-img-profile mt-4 sm:max-h-[200px] sm:max-w-[200px] md:max-h-[400px] md:max-w-[400px] w-full">
                  <img
                    src={passenger.image ? passenger.image : DefaultPicture}
                    alt={passenger.name}
                    className="sm:max-h-[200px] sm:max-w-[200px] md:max-h-[400px] md:max-w-[400px]"
                  />
                </div>
                <button
                  onClick={() =>
                    navigate(`/passenger/${nextPassenger.passengerID}`)
                  }
                  className="p-2 text-center hover:text-gray-800 transition-all"
                >
                  <i className="fa-solid fa-caret-right text-7xl"></i>
                </button>
              </div>

              <p className=" py-3 px-10 w-[40%] text-center times">
                {getSurvivalStatus()}
              </p>
              <h1 className="text-3xl py-3 px-10 w-full text-center m-0">
                {passenger.name}
              </h1>
              <div className="flex gap-2 md:gap-10 lg:gap-10 w-full mt-4">
                <p className=" py-3 px-10 w-full text-center times m-0">
                  {passenger.role}
                </p>
              </div>

              <p className=" py-3 px-10 leading-8">
                <strong>
                  {language === "EN" ? "Biography : " : "Biographie : "}
                </strong>{" "}
                {passenger.description}
              </p>
              <p className=" py-3 px-10 leading-8">
                <strong>
                  {language === "EN"
                    ? "Post Iceberg : "
                    : "Avant collision  : "}
                </strong>{" "}
                {passenger.history}
              </p>
            </div>
          ) : (
            <>
              <p>Passenger not found</p>
              <button onClick={() => window.history.back()}>
                <i className="fa-regular fa-circle-left"></i> Go back
              </button>
            </>
          )}
        </div>
      </main>
      <footer>
        <Ornement />
      </footer>
    </div>
  );
};

export default PassengerProfile;
