import React, { useContext, useState } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCar,
  faEarthAmericas,
  faHotel,
  faPerson,
  faPlane,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Header = ({ type, show }) => {
  const [toogleDatePicker, setToggleDatePicker] = useState(false);
  const [toogleSelector, setToggleSelector] = useState(false);
  const [options, setOptions] = useState({ adults: 1, children: 0, rooms: 1 });
  const [destination, setDestination] = useState("");
  const {dispatch} = useContext(SearchContext);
 
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();

  const optionsHandler = (name, operator) => {
    setOptions((previousState) => {
      return {
        ...previousState,
        [name]: operator === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const searchHandler = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { city: destination, dates: dates, options: options },
    });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="header">
      <div className={type !== "list" ? "headerContainer" : "listMode"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faHotel} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rental</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faEarthAmericas} />
            <span>Flight + Hotel</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faStar} />
            <span>Attractions</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Find your next stay</h1>
            <p className="headerTagline">
              Search low prices on hotels, homes and much more...
            </p>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faSearch} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(eobj) => setDestination(eobj.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  className="headerSelectDate"
                  onClick={() => setToggleDatePicker(!toogleDatePicker)}
                >
                  {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                    dates[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>
                {toogleDatePicker && (
                  <DateRange
                    className="datePicker"
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  className="headerSearchSelection"
                  onClick={() => {
                    setToggleSelector(!toogleSelector);
                  }}
                >
                  {`${options.adults} Adult - ${options.children} Kid - ${options.rooms} Room`}
                </span>
                {toogleSelector && (
                  <div className="options">
                    <div className="optionsItem">
                      <span className="optionsText">Adults</span>
                      <div className="optionsOperator">
                        <button
                          className="optionsItemOperator"
                          onClick={() => optionsHandler("adults", "d")}
                          disabled={options.adults <= 1}
                        >
                          -
                        </button>
                        <span className="selectValue">{options.adults}</span>
                        <button
                          className="optionsItemOperator"
                          onClick={() => optionsHandler("adults", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionsItem">
                      <span className="optionsText">Children</span>
                      <div className="optionsOperator">
                        <button
                          className="optionsItemOperator"
                          onClick={() => optionsHandler("children", "d")}
                          disabled={options.children <= 0}
                        >
                          -
                        </button>
                        <span className="selectValue">{options.children}</span>
                        <button
                          className="optionsItemOperator"
                          onClick={() => optionsHandler("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionsItem">
                      <span className="optionsText">Rooms</span>
                      <div className="optionsOperator">
                        <button
                          className="optionsItemOperator"
                          onClick={() => optionsHandler("rooms", "d")}
                          disabled={options.rooms <= 1}
                        >
                          -
                        </button>
                        <span className="selectValue">{options.rooms}</span>
                        <button
                          className="optionsItemOperator"
                          onClick={() => optionsHandler("rooms", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button className="headerSearchBtn" onClick={searchHandler}>
                Search
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
