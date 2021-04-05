import { Resolver, Query, prop, ctx } from "@decorators";

@Resolver
export default class HelloResolver {
  @Query("Hello")
  public hello(@prop("name") name: string, @ctx("auth") auth: any, @prop("lastname") lastname: string) {
    console.log("auth; ", auth);

    if (name || lastname) {
      return `Hi there, ${name} ${lastname}`;
    }

    return "Hi there";
  }
}
