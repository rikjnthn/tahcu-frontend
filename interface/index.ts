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
