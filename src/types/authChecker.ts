import { AuthChecker } from "type-graphql";
import Context from "./context";

const authChecker: AuthChecker<Context> = ({ context }) => {
  console.log(context.user);
  return !!context.user;
};

export default authChecker;
