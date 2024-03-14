import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import Member from "../member";
import style from "./group-member.module.scss";
import { GroupMemberShipType, UserDataType } from "@/interface";

const GroupMember = ({
  members,
  adminId,
}: {
  members?: GroupMemberShipType[];
  adminId?: string;
}) => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<UserDataType>(["userData"]);

  return (
    <div className={style.group_member}>
      <span>Member</span>
      <ul>
        {members
          ? members.map(({ id, user, user_id }) => (
              <Member
                key={id}
                name={user.username}
                user_id={user_id}
                isAdmin={adminId === user_id}
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default GroupMember;
