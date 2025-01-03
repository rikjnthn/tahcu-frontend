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
  type: "Contact";
}

export interface AddedMembersType {
  name: string;
  user_id: string;
}

export interface MemberType {
  id: string;
  user_id: string;
  group_id: string;
  joined_at: Date;
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
  type: "Group";
}

export interface GroupWithMembershipType extends GroupType {
  group_membership: GroupMemberShipType[];
}

export interface MessageType {
  id: string;
  message: string;
  contact_id?: string;
  group_id?: string;
  sender: {
    username: string;
  };
  sender_id: string;
  sent_at: Date;
  updated_at: Date;
}

export interface UpdateGroupDataType {
  name: string;
  description?: string;
}

export interface SignUpData {
  user_id: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

type ErrorCode =
  | "UNAUTHORIZED"
  | "INVALID"
  | "NOT_FOUND"
  | "DUPLICATE_VALUE"
  | "VALIDATION_ERROR"
  | "OTP_EXPIRED"
  | "TOO_MANY_REQUESTS";

export interface ErrorResponseType {
  error: {
    code: ErrorCode;
    message: any;
  };
}

export type ChatType = GroupWithMembershipType | ContactType;
