import React, { useState } from "react";

import UserSetting from "../user-setting/indext";
import CloseButton from "../close-button";
import style from "./setting-body.module.scss";

const SettingBody = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <div>
      <UserSetting setIsOpenModal={setIsOpenModal} />

      {isOpenModal && (
        <div className={style.modal}>
          <div>
            <header>
              <CloseButton
                onClick={() => setIsOpenModal(false)}
                stroke="#000"
              />
              <span>Delete Account</span>
            </header>

            <form>
              <div>
                <input id="password" placeholder="Password" />
                <label htmlFor="password">Account Password</label>
              </div>
              <button type="submit">Confirm</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingBody;
