import {Hash} from "node:crypto";

export interface Lessons{
  id: number,
  name: string,
  text: string,
  video: string,
  level: string
}

export interface Magazine{
  id: number,
  name: string,
  text: string,
  date: Date,
  picture: string,
  type: string
}
export interface LogUp{
  name: string,
  text: string,
  password: string
}

export interface LogIn{
  email: string,
  password: string
}
export interface User{
  name: string,
  email: string,
}
export interface Token{
  refresh: string,
  access: string,
}
export interface AuthToken {
  token: string;
}
