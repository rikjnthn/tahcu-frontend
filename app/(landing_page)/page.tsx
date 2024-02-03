import React from "react";

import LandingPageHeader from "@/components/landing-page-header";
import LandingPageHero from "@/components/landing-page-hero";
import LandingPageBody from "@/components/landing-page-body";
import LandingPageFooter from "@/components/landing-page-footer";

function Page() {
  return (
    <main>
      <LandingPageHeader />
      <LandingPageHero />
      <LandingPageBody />
      <LandingPageFooter />
    </main>
  );
}

export default Page;
