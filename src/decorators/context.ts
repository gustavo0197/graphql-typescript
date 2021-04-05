import "reflect-metadata";
import { IContextData } from "./types";
const ctxMetadataKey: string = "context";

export function ctx(ctxName?: string) {
  return function (target: Object, key: symbol | string, parameterIndex: number) {
    const metadata: IContextData[] = Reflect.getOwnMetadata(ctxMetadataKey, target, key) || [];
    metadata.push({ index: parameterIndex, contextName: ctxName });

    Reflect.defineMetadata(ctxMetadataKey, metadata, target, key);
  };
}
