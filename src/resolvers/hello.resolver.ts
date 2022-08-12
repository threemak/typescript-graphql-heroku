import { Query, Resolver } from "type-graphql";

@Resolver()
export default class HelloResolver {
  @Query()
  hello() {
    return "Hello world";
  }
}
