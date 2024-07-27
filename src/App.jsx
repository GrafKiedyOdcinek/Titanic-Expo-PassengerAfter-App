import "./style/index.css";
import { useState, useEffect } from "react";
import Pagination from "./Components/pagination/Pagination";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";

import DefaultPicture from "./assets/default.png";
import Ornement from "./Components/Ornement";
import FullScreenButton from "./Components/FullScreen";
import OrnementLeft from "./Components/OrnementLeft";
import OrnementRight from "./Components/OrnementRight";
import useTranslations from "./hooks/useTranslations";
import { getTranslation } from "./hooks/Translaations";

function App() {
  const { translations, languages } = useTranslations();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [classFilter, setClassFilter] = useState("All");
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  useEffect(() => {
    const loadData = () => {
      if (translations[language]) {
        setData(translations[language]);
      }
    };
    loadData();
  }, [language, translations]);

  useEffect(() => {
    const filtered = data.filter((passenger) => {
      const matchesSearch = passenger.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesClass =
        classFilter === "All" ||
        passenger.class.toLowerCase() ===
          getTranslation(classFilter, language).toLowerCase();
      return matchesSearch && matchesClass;
    });
    setFilteredData(filtered);
  }, [searchTerm, classFilter, data, language]);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setCurrentItems(filteredData.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, postsPerPage, filteredData]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      currentPage < Math.ceil(filteredData.length / postsPerPage) &&
      handlePagination(currentPage + 1),
    onSwipedRight: () => currentPage > 1 && handlePagination(currentPage - 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleClassFilter = (filter) => {
    setClassFilter(filter);
    setCurrentPage(1);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div className="p-4" {...handlers}>
      <OrnementLeft />
      <OrnementRight />
      <div className="flex justify-center">
        <header className="flex  sm:flex-row justify-center items-center gap-4 w-[65%]">
          <div className="grade flex gap-4">
            <button
              onClick={() => handleClassFilter("First Class")}
              className={`grade1 ripple border rounded-full min-w-[60px] p-2 text-center ${
                classFilter === "First Class" ? "active-filter" : ""
              }`}
            >
              {getTranslation("First Class", language)}
            </button>
            <button
              onClick={() => handleClassFilter("Second Class")}
              className={`grade2 ripple border rounded-full min-w-[60px] p-2 text-center ${
                classFilter === "Second Class" ? "active-filter" : ""
              }`}
            >
              {getTranslation("Second Class", language)}
            </button>
            <button
              onClick={() => handleClassFilter("Third Class")}
              className={`grade3 border ripple rounded-full min-w-[60px] p-2 text-center ${
                classFilter === "Third Class" ? "active-filter" : ""
              }`}
            >
              {getTranslation("Third Class", language)}
            </button>
            <button
              onClick={() => handleClassFilter("Staff")}
              className={`grade4 ripple border rounded-full min-w-[60px] p-2 text-center ${
                classFilter === "Staff" ? "active-filter" : ""
              }`}
            >
              {getTranslation("Staff", language)}
            </button>
            {classFilter !== "All" && (
              <button
                onClick={() => handleClassFilter("All")}
                className="clear-filter ripple border rounded-full min-w-[60px] p-2 text-center bg-red-300"
              >
                <i className="fa-solid fa-filter-circle-xmark"></i>
                {getTranslation("Clear", language)}
              </button>
            )}
          </div>
          <div className="search">
            <div className="w-80">
              <div className="relative w-full min-w-[200px] h-10">
                <div className="absolute grid w-5 h-5 place-items-center text-white top-2/4 right-3 -translate-y-2/4">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input
                  className="peer w-full h-full bg-transparent text-white font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-white focus:border-white"
                  placeholder=" "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-white leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-white peer-focus:text-white before:border-white peer-focus:before:!border-white after:border-white peer-focus:after:!border-white">
                  {getTranslation("Search", language)}
                </label>
              </div>
            </div>
          </div>
          <div className="language flex gap-6">
            <Popover placement="bottom-end">
              <PopoverHandler>
                <button>
                  <div className="fr border rounded-full bg-white w-[60px] h-[60px] flex items-center justify-center">
                    <p className="text-black">{language}</p>
                  </div>
                </button>
              </PopoverHandler>
              <PopoverContent className="w-72 pb-0">
                {languages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4 cursor-pointer"
                  >
                    <div
                      className={`fr border rounded-full bg-[#0d1625] w-[30px] h-[30px] flex items-center justify-center`}
                    >
                      <p className="text-white">{lang}</p>
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        {lang}
                      </Typography>
                    </div>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </header>
      </div>
      <div className="flex justify-center">
        <div className="separator border mt-6 w-[80%]"></div>
      </div>
      <main className="p-10">
        <div className="flex gap-10 p-10 flex-wrap items-center justify-center">
          {currentItems.length > 0 ? (
            currentItems.map((passenger) => (
              <div
                key={passenger?.name}
                className="passenger-item flex flex-col gap-3 items-center w-full sm:w-[100%] md:w-[20%] lg:w-[15%] justify-center"
              >
                <Link
                  to={`/passenger/${passenger?.passengerID}`}
                  key={passenger?.name}
                  className="flex flex-col items-center gap-2 w-full ripple"
                >
                  <div className="passenger-img">
                    <img
                      src={passenger.image ? passenger.image : DefaultPicture}
                      alt={passenger.name}
                    />
                  </div>
                  <p className="text-center min-h-[50px]">{passenger?.name}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>
              {language === "FR"
                ? "Pas de résultat pour cette recherche"
                : "No result for this search"}
            </p>
          )}
        </div>
        {filteredData.length > postsPerPage && (
          <div className="pagination flex justify-center gap-4 mt-4 items-center">
            <Pagination
              length={filteredData.length}
              postsPerPage={postsPerPage}
              handlePagination={handlePagination}
              currentPage={currentPage}
            />
          </div>
        )}
      </main>
      <footer>
        <Ornement />
        <FullScreenButton />
      </footer>
    </div>
  );
}

export default App;
