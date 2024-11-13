import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__section">
                    <h3 className="footer__title">Quick Links</h3>
                    <ul className="footer__list">
                        <li><a href="/about" className="footer__link">About Us</a></li>
                        <li><a href="/services" className="footer__link">Services</a></li>
                        <li><a href="/contact" className="footer__link">Contact</a></li>
                        <li><a href="/faq" className="footer__link">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer__section">
                    <h3 className="footer__title">Become an Expert</h3>
                    <ul className="footer__list">
                        <li><a href="/w_test" className="footer__link">Take the W-type Test</a></li>
                        <li><a href="https://winefolly.com/deep-dive/common-types-of-wine/" className="footer__link">Common Types of Wine</a></li>
                        <li><a href="https://winefolly.com/deep-dive/light-strike-why-wine-and-sunlight-dont-mix/" className="footer__link">Light Strike: Why Wine and Sunlight Don’t Mix</a></li>
                        <li><a href="https://winefolly.com/deep-dive/wine-and-health-a-bio-psycho-social-perspective/" className="footer__link">Wine and Health: A Bio-Psycho-Social Perspective
</a></li>
                    </ul>
                </div>
                <div className="footer__section">
                    <h3 className="footer__title">Follow Us</h3>
                    <div className="footer__social-icons">
                        <a href="https://facebook.com" className="footer__icon" aria-label="Facebook"><FaFacebookF/></a>
                        <a href="https://twitter.com" className="footer__icon" aria-label="Twitter"><FaXTwitter/></a>
                        <a href="https://instagram.com" className="footer__icon" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://linkedin.com" className="footer__icon" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <p className="footer__copyright">&copy; {new Date().getFullYear()} Oinognostis. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
