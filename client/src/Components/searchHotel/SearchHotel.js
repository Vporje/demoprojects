import React from "react";
import "./searchHotel.css";
import { Link } from "react-router-dom";

const SearchHotel = ({hotel}) => {
  return (
    <div className="shContainer" key={hotel._id}>
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square240/533708472.webp?k=56f35a4e056d9e16ee37596769dc9f926b8f2e6e41041b7d0dd430ee006af6cf&o="
        alt="img"
        className="hotelImg"
      />

      <div className="roomInfoItem">
        <h2 className="rIHotelName">{hotel.name}</h2>
        <span className="rIHotelDist">{hotel.distance}m from centre</span>
        <span className="rITaxi">Free Airport Taxi</span>
        <span className="rIHotelInfo">
          {hotel.title}
        </span>
        <span className="rIHotelDesc">
          {hotel.desc}
        </span>
        <span className="rIHotelCancelPol">Free Cancellation</span>
        <span className="rIHotelTagline">
          You can cancel later, so lock in this price today!!
        </span>
      </div>
      <div className="hotelValues">
        {hotel.rating && <div className="hremarks">
          <span>Excellent</span>
          <span className="shRating">{hotel.rating}</span>
        </div>}
        <div className="hpriceAvailability">
          <span className="shPrice">₹ {hotel.cheapestPrice}</span>
          <span>Inclusive of all Taxes</span>
          <Link to={`/hotels/${hotel._id}`}><button className="shAvaiabilityBtn">See Availability</button></Link>
        </div>
      </div>
    </div>
  );
};

export default SearchHotel;
