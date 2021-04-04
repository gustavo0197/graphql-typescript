import { Resolver, Mutation } from "../../decorators";

@Resolver
export default class HelloResolver {
  @Mutation("Hello")
  public hello(data, { name }) {
    if (name) {
      return `Hi there, ${name}, from hello mutation`;
    }

    return "Hi there from Hello mutation";
  }
}
