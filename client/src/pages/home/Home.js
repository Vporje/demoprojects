import React from "react";
import "./home.css";
import Navbar from "../../Components/navbar/Navbar";
import Header from "../../Components/header/Header";
import Featured from "../../Components/featured/Featured";
import PropertyList from "../../Components/property/PropertyList";
import FeaturedProps from "../../Components/featuredProps/FeaturedProps";
import MailList from "../../Components/mailList/MailList";
import Footer from "../../Components/footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="listContainer">
        <Featured />
        <h2 className="listTitle">Browse by property type</h2>
        <PropertyList />
        <div className="featuredPropertyMain">
          <h2>Homes guests love</h2>
        </div>
        <FeaturedProps />
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Home;
