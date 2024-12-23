import React from "react";
import Link from "next/link";

import style from "./landing-page-header.module.scss";
import TahcuLogo from "../tahcu-logo";

const LandingPageHeader = () => {
  return (
    <header className={style.header}>
      <TahcuLogo />
      <span>Tahcu</span>

      <div className="margin-left-auto">
        <Link href="/login">Login</Link>
      </div>
    </header>
  );
};

export default LandingPageHeader;
