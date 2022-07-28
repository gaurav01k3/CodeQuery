import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer/footer.css";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-wrapper">
                <div className="footer-item">Copyright © 2022 CodeQuery</div>
                <a
                    target='_blank'
                    rel="noreferrer"
                    href='https://www.linkedin.com/in/gauravkumar0130/'>
                    <div className="footer-item">LinkedIn</div>
                </a>
                <div className="footer-item">Contact Us</div>
            </div>
        </div >
    );
};

export default Footer;