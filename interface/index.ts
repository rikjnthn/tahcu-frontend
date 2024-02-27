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
