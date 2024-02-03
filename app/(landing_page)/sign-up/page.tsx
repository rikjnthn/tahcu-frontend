import React from "react";
import Link from "next/link";

import style from "@/style/sign-up.module.scss";

function Page() {
  return (
    <div className={`${style.sign_up} h-full-dvh`}>
      <form>
        <header>
          <span>Sign Up</span>
        </header>

        <div>
          <input type="text" />
          <label htmlFor="">User Id</label>
        </div>

        <div>
          <input type="email" />
          <label htmlFor="">Email</label>
        </div>

        <div>
          <input type="password" />
          <label htmlFor="">Password</label>
        </div>

        <footer>
          <Link href="/login">Login</Link>
          <button type="submit">Create</button>
        </footer>
      </form>
    </div>
  );
}

export default Page;
