import { Resolver, Mutation, prop } from "@decorators";
import { pubsub } from "@utils";

@Resolver
export default class HelloResolver {
  @Mutation("Hello")
  public hello(@prop("name") name: string) {
    pubsub.publish("HELLO", { Hello: name });
    return `Hi there, ${name} from Hello mutation`;
  }
}
