import "reflect-metadata";
import { IPropData, IContextData } from "./types";
const propMetadataKey: string = "props";
const contextMetadataKey: string = "context";

export function Query(name: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function () {
      const props: IPropData[] = Reflect.getOwnMetadata(propMetadataKey, target, key);
      const contexts: IContextData = Reflect.getOwnMetadata(contextMetadataKey, target, key);
      const queryArgs = arguments["1"]; // Get GraphQL query arguments
      const contextArgs = arguments["2"]; // Get GraphQL query arguments

      if (props) {
        for (let key in props) {
          // Set resolver function arguments
          arguments[props[key].index] = queryArgs[props[key].propName];
        }
      }

      if (contexts) {
        for (let key in contexts) {
          if (contexts[key].contextName) {
            const contextName = contexts[key].contextName;
            arguments[contexts[key].index] = contextArgs[contextName];
          } else {
            arguments[contexts[key].index] = contextArgs;
          }
        }
      }

      return method.apply(this, arguments);
    };

    Reflect.defineMetadata("type", "Query", descriptor.value);
    Reflect.defineMetadata("name", name, descriptor.value);

    return descriptor;
  };
}
