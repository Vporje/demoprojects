import React from "react";
import "./featured.css";
import useFetch from "../../hooks/useFetch.js";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels/countByCity?cities=Mumbai,Chennai,Ooty"
  );
  
  return (
    <div className="featuredMain">
      <h2>Trending destinations</h2>
      <p>Most popular choices for travellers from India</p>
      <div className="featuredContainer">
        {loading ? (
          "Loading please wait"
        ) : (
          <>
            <div className="featuredItems">
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="
                alt="location"
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h2>Mumbai</h2>
                <h3>{data[0]} Properties</h3>
              </div>
            </div>
            <div className="featuredItems">
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/684730.jpg?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o="
                alt="location"
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h2>Chennai</h2>
                <h3>{data[1]} Properties</h3>
              </div>
            </div>
            <div className="featuredItems">
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/684919.jpg?k=0a73fce29109503c055e288c413d9a1c5bd66fdb26f01c1438e8017b0b64b42f&o="
                alt="location"
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h2>Ooty</h2>
                <h3>{data[2]} Properties</h3>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Featured;
