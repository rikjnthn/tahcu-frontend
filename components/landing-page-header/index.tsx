import React from "react";

import style from "./landing-page-header.module.scss";
import TahcuLogo from "../tahcu-logo";

const LandingPageHeader = () => {
  return (
    <header className={style.header}>
      <TahcuLogo />
      <span>Tahcu</span>
    </header>
  );
};

export default LandingPageHeader;
