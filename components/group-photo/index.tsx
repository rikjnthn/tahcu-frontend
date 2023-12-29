import React from "react";

import style from "./group-photo.module.scss";

const GroupPhoto = ({ groupName }: { groupName: string }) => {
  return <div className={style.group_photo}>{groupName[0].toUpperCase()}</div>;
};

export default GroupPhoto;
