import { Query } from "../../decorators";
import { Resolver } from "decorators";

@Resolver
export default class HelloResolver {
  @Query("Hello")
  public hello(data, { name }) {
    if (name) {
      return `Hi there, ${name}`;
    }

    return "Hi there";
  }
}
