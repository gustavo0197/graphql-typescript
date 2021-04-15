"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
require("reflect-metadata");
var helpers_1 = require("./helpers");
function Query(name) {
    return function (target, key, descriptor) {
        var method = descriptor.value;
        descriptor.value = function () {
            var args = helpers_1.handleProps(target, key, arguments);
            return method.apply(this, args);
        };
        Reflect.defineMetadata("type", "Query", descriptor.value);
        Reflect.defineMetadata("name", name, descriptor.value);
        return descriptor;
    };
}
exports.Query = Query;
