import { Dispatch, SetStateAction } from "react";

export interface ButtonType {
  fill?: string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type SetStateType<T> = Dispatch<SetStateAction<T>>;

export interface MessageMenuCoordinateType {
  left: number;
  top: number;
}

export interface UserDataType {
  id: string;
  user_id: string;
  username: string;
  email: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserContactType {
  username: string;
  email: string;
}

export interface FriendsContactType {
  username: string;
  email: string;
}

export interface ContactType {
  id: string;
  user_id: string;
  friends_id: string;
  user: UserContactType;
  friends: FriendsContactType;
}

export interface AddedMembersType {
  name: string;
  user_id: string;
}

export interface GroupMemberShipType {
  id: string;
  user_id: string;
  group_id: string;
  joined_at: Date;
  user: {
    username: string;
  };
}

export interface GroupType {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  admin_id: string;
  created_by_id: string;
}

export interface GroupWithMembershipType {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  admin_id: string;
  created_by_id: string;
  group_membership: GroupMemberShipType[];
}

export interface MessageType {
  id: string;
  message: string;
  group_id: string;
  sender: {
    username: string;
  };
  sender_id: string;
  receiver_id: string;
  sent_at: Date;
  updated_at: Date;
}
