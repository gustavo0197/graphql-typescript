import "reflect-metadata";
import { AuthenticationError } from "apollo-server";
import { cloneMetadata } from "./helpers";

export function Auth() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function () {
      const auth: any = arguments["2"].auth;

      if (auth) {
        return method.apply(this, arguments);
      } else {
        return new AuthenticationError("You need to be authenticated");
      }
    };

    // Clone metadata from the old descriptor.value
    cloneMetadata(method, descriptor.value, Reflect.getOwnMetadataKeys(method));

    return descriptor;
  };
}
