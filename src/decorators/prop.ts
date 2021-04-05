import "reflect-metadata";
import { IPropData } from "./types";
const propMetadataKey: string = "props";

export function prop(propName: string) {
  return function (target: Object, key: symbol | string, parameterIndex: number) {
    const metadata: IPropData[] = Reflect.getOwnMetadata(propMetadataKey, target, key) || [];
    metadata.push({ index: parameterIndex, propName });

    Reflect.defineMetadata(propMetadataKey, metadata, target, key);
  };
}
