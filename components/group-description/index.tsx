import React from "react";

import style from "./group-description.module.scss";

const GroupDescription = ({ description }: { description?: string }) => {
  return (
    <div className={style.description}>
      <span>Description</span>
      <div className={typeof description === "undefined" ? "opacity-50" : ""}>
        {typeof description === "undefined" ? "No description" : description}
      </div>
    </div>
  );
};

export default GroupDescription;
