import React from "react";
import Image from "next/image";
import Link from "next/link";

import style from "./landing-page-hero.module.scss";
import HeroImage from "@/public/using-app.jpg";

const LandingPageHero = () => {
  return (
    <section className={style.hero}>
      <div>
        <span>Simple and Intuitive</span>
        <p>Easily chat with your friends or someone you know!</p>
        <Link href="/sign-up">Start now</Link>
      </div>
      <Image src={HeroImage} alt="Person using an application" priority />
    </section>
  );
};

export default LandingPageHero;
