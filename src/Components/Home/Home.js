import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaQrcode } from "react-icons/fa";
import { IoScan } from "react-icons/io5";

const Home = () => {
  return (
    <div>
      <div className="container row mx-auto mt-5 ">
        <Helmet>
          <meta charSet="utf-8" />
          <title>HOME</title>
        </Helmet>
        <div className="col-sm-12 col-md-6 mt-5 mb-5">
          <Link to="/maker">
            <div>
              <h1>Create QR Code</h1>{" "}
            </div>
            <FaQrcode size={100} />
          </Link>
        </div>
        <div className="col-sm-12 col-md-6 mt-5 mb-5">
          <Link to="/reader">
            <div>
              <h1>Read QR Code</h1>{" "}
            </div>
            <IoScan size={100} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
