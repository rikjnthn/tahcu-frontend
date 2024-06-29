import React from "react";

import Member from "../member";
import style from "./group-member.module.scss";
import { GroupMemberShipType } from "@/interface";

const GroupMember = ({
  members,
  adminId,
}: {
  members?: GroupMemberShipType[];
  adminId?: string;
}) => {
  return (
    <div className={style.group_member}>
      <span>Member</span>
      <ul>
        {members?.map(({ id, user, user_id }) => (
          <Member
            key={id}
            name={user.username}
            user_id={user_id}
            isMemberAdmin={adminId === user_id}
            adminId={adminId}
            showDelete
          />
        ))}
      </ul>
    </div>
  );
};

export default GroupMember;
