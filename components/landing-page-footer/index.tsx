import React from "react";

import style from "./landing-page-footer.module.scss";
import TahcuLogo from "../tahcu-logo";

const LandingPageFooter = () => {
  return (
    <footer className={style.footer}>
      <div className={style.logo}>
        <TahcuLogo white />
        <span>Tahcu</span>
      </div>

      <ul>
        <li>About Us</li>
        <li>Privacy</li>
        <li>Contact Us</li>
        <li>Help Center</li>
      </ul>

      <div className={style.copyright}>
        <span>2024 &#169; Tahcu</span>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
