import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className='footer'>
      <div className='footer-back-to-top' onClick={scrollToTop}>
        <span>Back to top</span>
      </div>

      <div className='footer-content'>
        <div className='footer-sections'>
          <div className='footer-section'>
            <h3>Get to Know Us</h3>
            <ul>
              <li>
                <a href='/careers'>Careers</a>
              </li>
              <li>
                <a href='/blog'>Blog</a>
              </li>
              <li>
                <a href='/about'>About Amazon</a>
              </li>
              <li>
                <a href='/investor-relations'>Investor Relations</a>
              </li>
              <li>
                <a href='/amazon-devices'>Amazon Devices</a>
              </li>
              <li>
                <a href='/amazon-science'>Amazon Science</a>
              </li>
            </ul>
          </div>

          <div className='footer-section'>
            <h3>Make Money with Us</h3>
            <ul>
              <li>
                <a href='/sell'>Sell products on Amazon</a>
              </li>
              <li>
                <a href='/sell-apps'>Sell on Amazon Business</a>
              </li>
              <li>
                <a href='/kdp'>Become an Affiliate</a>
              </li>
              <li>
                <a href='/advertising'>Advertise Your Products</a>
              </li>
              <li>
                <a href='/self-publish'>Self-Publish with Us</a>
              </li>
              <li>
                <a href='/host-hub'>Host an Amazon Hub</a>
              </li>
            </ul>
          </div>

          <div className='footer-section'>
            <h3>Amazon Payment Products</h3>
            <ul>
              <li>
                <a href='/credit-card'>Amazon Business Card</a>
              </li>
              <li>
                <a href='/shop-with-points'>Shop with Points</a>
              </li>
              <li>
                <a href='/reload'>Reload Your Balance</a>
              </li>
              <li>
                <a href='/currency-converter'>Amazon Currency Converter</a>
              </li>
            </ul>
          </div>

          <div className='footer-section'>
            <h3>Let Us Help You</h3>
            <ul>
              <li>
                <a href='/help'>Amazon and COVID-19</a>
              </li>
              <li>
                <a href='/account'>Your Account</a>
              </li>
              <li>
                <a href='/orders'>Your Orders</a>
              </li>
              <li>
                <a href='/shipping'>Shipping Rates & Policies</a>
              </li>
              <li>
                <a href='/returns'>Returns & Replacements</a>
              </li>
              <li>
                <a href='/help'>Help</a>
              </li>
            </ul>
          </div>
        </div>

        <div className='footer-bottom'>
          <div className='footer-logo'>
            <img src='/logo.png' alt='Amazon Clone' />
          </div>

          <div className='footer-bottom-links'>
            <div className='footer-country'>
              <span>🌐 English</span>
              <span>💰 USD - U.S. Dollar</span>
              <span>🇺🇸 United States</span>
            </div>
          </div>
        </div>

        <div className='footer-copyright'>
          <div className='footer-links-bottom'>
            <a href='/conditions'>Conditions of Use</a>
            <a href='/privacy'>Privacy Notice</a>
            <a href='/interest-ads'>Interest-Based Ads</a>
          </div>
          <p>
            © 2025, Amazon Clone by XSaadiX. Built with React, TypeScript,
            Firebase & Stripe.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
