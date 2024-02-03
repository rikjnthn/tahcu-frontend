import React from "react";
import Link from "next/link";

import style from "@/style/login.module.scss";

function Page() {
  return (
    <div className={`${style.login} h-full-dvh`}>
      <form>
        <header>
          <span className="">Login</span>
        </header>

        <div>
          <input type="text" />
          <label htmlFor="">Email / User Id</label>
        </div>

        <div>
          <input type="password" />
          <label htmlFor="">Password</label>
        </div>

        <footer>
          <Link href="/sign-up">Create account</Link>
          <button type="submit">Login</button>
        </footer>
      </form>
    </div>
  );
}

export default Page;
