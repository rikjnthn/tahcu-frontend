import React from "react";

import style from "./group-description.module.scss";

const GroupDescription = ({ description }: { description?: string }) => {
  return (
    <div className={style.description}>
      <span>Description</span>
      <div className={!description ? "opacity-50" : ""}>
        {!description ? "No description" : description}
      </div>
    </div>
  );
};

export default GroupDescription;
