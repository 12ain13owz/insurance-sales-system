import { Response } from "express";

interface CustomResponseLocals {
  user: string;
}

type AppRes = Response & { locals: CustomResponseLocals };
