import React from "react";
import Image from "next/image";
import Link from "next/link";

import style from "./landing-page-hero.module.scss";

const LandingPageHero = () => {
  return (
    <section className={style.hero}>
      <div>
        <span>Simple and Intuitive</span>
        <p>Easily chat with your friends or someone you know!</p>
        <Link href="/sign-up">Start now</Link>
      </div>
      <Image
        src="/using-app.jpg"
        alt="Person using an application"
        priority
        width={1920}
        height={1080}
      />
    </section>
  );
};

export default LandingPageHero;
