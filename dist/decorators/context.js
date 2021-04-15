"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctx = void 0;
require("reflect-metadata");
var ctxMetadataKey = "context";
function ctx(ctxName) {
    return function (target, key, parameterIndex) {
        var metadata = Reflect.getOwnMetadata(ctxMetadataKey, target, key) || [];
        metadata.push({ index: parameterIndex, contextName: ctxName });
        Reflect.defineMetadata(ctxMetadataKey, metadata, target, key);
    };
}
exports.ctx = ctx;
