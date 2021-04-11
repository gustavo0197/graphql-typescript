import "reflect-metadata";
import { IPropData, IContextData } from "./types";
const propMetadataKey: string = "props";
const contextMetadataKey: string = "context";

// Handle decorators @prop() and @ctx()
export function handleProps(target: any, key: string | symbol, args: any) {
  const props: IPropData[] = Reflect.getOwnMetadata(propMetadataKey, target, key); // @prop()
  const contexts: IContextData = Reflect.getOwnMetadata(contextMetadataKey, target, key); // @ctx()
  const queryArgs = args["1"]; // Get GraphQL query arguments
  const contextArgs = args["2"]; // Get GraphQL query arguments

  if (props) {
    for (let key in props) {
      // Set resolver function arguments
      if (props[key].propName) {
        args[props[key].index] = queryArgs[props[key].propName];
      } else {
        args[props[key].index] = queryArgs;
      }
    }
  }

  if (contexts) {
    for (let key in contexts) {
      if (contexts[key].contextName) {
        const contextName = contexts[key].contextName;
        args[contexts[key].index] = contextArgs[contextName];
      } else {
        args[contexts[key].index] = contextArgs;
      }
    }
  }

  //return method.apply(this, arguments);
  return args;
}

export function cloneMetadata(fromTarget: any, target: any, metadataKeys: string[]) {
  metadataKeys.forEach((key: string) => {
    const metadataValue: any = Reflect.getMetadata(key, fromTarget);
    Reflect.defineMetadata(key, metadataValue, target);
  });
}
