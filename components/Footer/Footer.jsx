"use client"
import React from "react";
import Logo from "/public/icons/logo_second.svg";
import {BsFacebook} from 'react-icons/bs'; 
import {GrTwitter} from 'react-icons/gr';
import {FiInstagram} from 'react-icons/fi';


const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center p-10 bg-primary mt-20 text-white rounded">
        {/* <Image
          src={Logo}
          width={50}
          height={50}
          alt="Save The Date Footer Logo"

          /> */}
          <Logo/>
        <div className="grid grid-flow-col gap-4 text-[16px]">
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Portfolio</a>
          <a className="link link-hover">Physical Wedding Cards</a>
          <a className="link link-hover">How it Works</a>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <BsFacebook className="text-[20px]"/>
            <GrTwitter className="text-[20px]"/>
            <FiInstagram className="text-[20px]"/>
          </div>
        </div>
        
      </footer>
    </div>
  );
};

export default Footer;
