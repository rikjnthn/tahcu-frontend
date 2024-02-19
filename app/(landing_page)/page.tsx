import React from "react";
import { redirect } from "next/navigation";

import LandingPageHeader from "@/components/landing-page-header";
import LandingPageHero from "@/components/landing-page-hero";
import LandingPageBody from "@/components/landing-page-body";
import LandingPageFooter from "@/components/landing-page-footer";
import { isTahcuTokenVerified } from "@/action/auth";

export default async function Page() {
  if (await isTahcuTokenVerified()) redirect("/a");

  return (
    <main>
      <LandingPageHeader />
      <LandingPageHero />
      <LandingPageBody />
      <LandingPageFooter />
    </main>
  );
}
