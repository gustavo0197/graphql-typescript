"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
require("reflect-metadata");
var apollo_server_1 = require("apollo-server");
var helpers_1 = require("./helpers");
function Auth() {
    return function (target, key, descriptor) {
        var method = descriptor.value;
        descriptor.value = function () {
            var auth = arguments["2"].auth;
            if (auth) {
                return method.apply(this, arguments);
            }
            else {
                return new apollo_server_1.AuthenticationError("You need to be authenticated");
            }
        };
        (0, helpers_1.cloneMetadata)(method, descriptor.value, Reflect.getOwnMetadataKeys(method));
        return descriptor;
    };
}
exports.Auth = Auth;
