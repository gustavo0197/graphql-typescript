import "reflect-metadata";
import { IPropData } from "./types";
const propMetadataKey: string = "props";

export function Query(name: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function () {
      const props: IPropData[] = Reflect.getOwnMetadata(propMetadataKey, target, key);

      if (props) {
        // Get GraphQL query arguments
        const queryArgs = arguments["1"];

        for (let key in props) {
          // Set resolver function arguments
          arguments[props[key].index] = queryArgs[props[key].propName];
        }
      }

      return method.apply(this, arguments);
    };

    Reflect.defineMetadata("type", "Query", descriptor.value);
    Reflect.defineMetadata("name", name, descriptor.value);

    return descriptor;
  };
}
