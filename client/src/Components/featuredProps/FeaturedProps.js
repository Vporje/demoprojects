import React from "react";
import "./featuredProps.css";
import useFetch from "../../hooks/useFetch.js";

const FeaturedProps = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels?featured=true&limit=4&min=500&max=1100"
  );

  return (
    <div className="featuredProps">
      <div className="featuredPropsItems">
        {data && loading ? (
          "Loading.."
        ) : (
          <>
            {data.map((fp,index) => {
              return (
                <div className="featuredPropsItem" key={index}>
                  <img
                    src={fp.photos}
                    alt="img"
                    className="featuredPropsImg"
                  />
                  <div className="featuredPropsInfo">
                    <h3>{fp.name}</h3>
                    <p>{fp.address}</p>
                    <div className="featuredPropsReview">
                      <p className="fPRating">{fp.rating}</p>
                      <p className="fPRemark">Superb</p>
                      <span> - </span>
                      <p className="fPReview">106 reviews</p>
                    </div>
                    <div className="fPprice">
                      Starting from <span>{fp.cheapestPrice}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedProps;
