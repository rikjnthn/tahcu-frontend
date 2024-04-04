import React from "react";

import style from "./group-photo.module.scss";

const GroupPhoto = ({ groupName }: { groupName: string }) => {
  return (
    <div className={style.group_photo} title={groupName}>
      {groupName[0].toUpperCase()}
    </div>
  );
};

export default GroupPhoto;
