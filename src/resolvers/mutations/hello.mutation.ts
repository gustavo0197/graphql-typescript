import { Resolver, Mutation, prop } from "@decorators";

@Resolver
export default class HelloResolver {
  @Mutation("Hello")
  public hello(@prop("name") name: string) {
    return `Hi there, ${name} from Hello mutation`;
  }
}
