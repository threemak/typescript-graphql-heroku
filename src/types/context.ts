import { Request, Response } from "express";
import { User } from "../schema/user.schema";

interface Context {
  res: Response;
  req: Request;
  user: User | null;
}

export default Context;
