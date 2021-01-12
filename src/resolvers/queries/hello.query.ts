import { Resolver, Query } from "../../decorators";

@Resolver
export default class HelloResolver {
  @Query("Hello")
  public hello(data, { name }) {
    //console.log(data);
    if (name) {
      return `Hi there, ${name}`;
    }

    return "Hi there";
  }

  @Query("Greeting")
  public greeting(data, { name }) {
    return `Hi ${name}`;
  }
}
