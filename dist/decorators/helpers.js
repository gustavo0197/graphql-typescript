"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneMetadata = exports.handleProps = void 0;
require("reflect-metadata");
var propMetadataKey = "props";
var contextMetadataKey = "context";
function handleProps(target, key, args) {
    var props = Reflect.getOwnMetadata(propMetadataKey, target, key);
    var contexts = Reflect.getOwnMetadata(contextMetadataKey, target, key);
    var queryArgs = args["1"];
    var contextArgs = args["2"];
    if (props) {
        for (var key_1 in props) {
            if (props[key_1].propName) {
                args[props[key_1].index] = queryArgs[props[key_1].propName];
            }
            else {
                args[props[key_1].index] = queryArgs;
            }
        }
    }
    if (contexts) {
        for (var key_2 in contexts) {
            if (contexts[key_2].contextName) {
                var contextName = contexts[key_2].contextName;
                args[contexts[key_2].index] = contextArgs[contextName];
            }
            else {
                args[contexts[key_2].index] = contextArgs;
            }
        }
    }
    return args;
}
exports.handleProps = handleProps;
function cloneMetadata(fromTarget, target, metadataKeys) {
    metadataKeys.forEach(function (key) {
        var metadataValue = Reflect.getMetadata(key, fromTarget);
        Reflect.defineMetadata(key, metadataValue, target);
    });
}
exports.cloneMetadata = cloneMetadata;
