import React from "react";
import "./mailList.css";

const MailList = () => {
  return (
    <div className="mailList">
      <div className="mailListContent">
        <h2>Stay in the know</h2>
        <p>
          Sign up to get marketing emails from Booking.com, including
          promotions, rewards, travel experiences and information about
          Booking.com’s and Booking.com Transport Limited’s products and
          services.
        </p>
        <div className="MailIP">
          <input
            type="text"
            placeholder="Your email address"
            className="mailInput"
          />
          <button className="mailSubscribe">Subscribe</button>
        </div>
        <span>You can opt out any time. See our privacy statement.</span>
      </div>
    </div>
  );
};

export default MailList;
