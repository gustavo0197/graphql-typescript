"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prop = void 0;
require("reflect-metadata");
var propMetadataKey = "props";
function prop(propName) {
    return function (target, key, parameterIndex) {
        var metadata = Reflect.getOwnMetadata(propMetadataKey, target, key) || [];
        metadata.push({ index: parameterIndex, propName: propName });
        Reflect.defineMetadata(propMetadataKey, metadata, target, key);
    };
}
exports.prop = prop;
