import "reflect-metadata";
import { handleProps } from "./helpers";

export function Mutation(name: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function () {
      const args = handleProps(target, key, arguments);
      return method.apply(this, args);
    };

    Reflect.defineMetadata("type", "Mutation", descriptor.value);
    Reflect.defineMetadata("name", name, descriptor.value);

    return descriptor;
  };
}
