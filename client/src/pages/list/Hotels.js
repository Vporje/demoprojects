import React, { useState } from "react";
import "./hotels.css";
import Navbar from "./../../Components/navbar/Navbar";
import Header from "../../Components/header/Header";
import SearchHotel from "../../Components/searchHotel/SearchHotel";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import useFetch from "../../hooks/useFetch.js";

const Hotels = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/hotels?city=${destination}&min=${min || 1}&max=${max || 1200}`
  );

  const searchHandler = ()=>{
    reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelListContainer">
        <div className="listWapper">
          <div className="listSearch">
            <div className="lsTitle">Search</div>
            <div className="lsItem">
              <label className="lsLabel">Destination</label>
              <input type="text" className="lsInput" value={destination} />
            </div>
            <div className="lsItem">
              <label className="lsLabel">Check-in to Check-out Date</label>
              <span
                className="lsCheckInOut"
                onClick={() => {
                  setOpenDate(!openDate);
                }}
              >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                dates[0].endDate,
                "dd/MM/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label className="lsLabel">Options</label>
              <div className="lsOptions">
                <p>
                  Min Price <small>(per night)</small>
                </p>
                <input type="number" onChange={e => setMin(e.target.value)} className="optionsIP" />
              </div>
              <div className="lsOptions">
                <p>
                  Max Price <small>(per night)</small>
                </p>
                <input type="number" onChange={e => setMax(e.target.value)} className="optionsIP" />
              </div>
              <div className="lsOptions">
                <p>Adult</p>
                <input
                  type="number"
                  className="optionsIP"
                  value={options.adults}
                />
              </div>
              <div className="lsOptions">
                <p>Children</p>
                <input
                  type="number"
                  className="optionsIP"
                  value={options.children}
                />
              </div>
              <div className="lsOptions">
                <p>Room</p>
                <input
                  type="number"
                  className="optionsIP"
                  value={options.rooms}
                />
              </div>
            </div>
            <div className="lsSearchBtn" onClick={searchHandler}>Search</div>
          </div>
          <div className="listResult">
            {loading
              ? `Loading Hotels from city ${destination}`
              : data.map((hotel) => {
                  return <SearchHotel hotel={hotel} />;
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
