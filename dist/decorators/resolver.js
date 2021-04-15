"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolvers = exports.Resolver = void 0;
require("reflect-metadata");
function Resolver(constructor) {
    var _getResolverFunctions = function (operationType) {
        var operations = {};
        var operationFields = Object.keys(constructor.prototype).filter(function (field) { return Reflect.getMetadata("type", constructor.prototype[field]) == operationType; });
        operationFields.forEach(function (field) {
            var name = Reflect.getMetadata("name", constructor.prototype[field]);
            operations[name] = constructor.prototype[field];
        });
        return operations;
    };
    var _getQueries = function () { return _getResolverFunctions("Query"); };
    var _getMutations = function () { return _getResolverFunctions("Mutation"); };
    var _getSubscriptions = function () { return _getResolverFunctions("Subscription"); };
    Reflect.defineProperty(constructor, "Queries", { value: _getQueries });
    Reflect.defineProperty(constructor, "Mutations", { value: _getMutations });
    Reflect.defineProperty(constructor, "Subscriptions", { value: _getSubscriptions });
}
exports.Resolver = Resolver;
function getResolvers(resolvers) {
    var Query = {};
    var Mutation = {};
    var Subscription = {};
    for (var i = 0; i < resolvers.length; i++) {
        var queries = Reflect.getOwnPropertyDescriptor(resolvers[i], "Queries");
        var mutations = Reflect.getOwnPropertyDescriptor(resolvers[i], "Mutations");
        var subscriptions = Reflect.getOwnPropertyDescriptor(resolvers[i], "Subscriptions");
        if (queries) {
            var _queries = queries.value();
            validateUniqueOperations(Object.keys(_queries), Object.keys(Query), "Query");
            Query = __assign(__assign({}, Query), _queries);
        }
        if (mutations) {
            var _mutations = mutations.value();
            validateUniqueOperations(Object.keys(_mutations), Object.keys(Mutation), "Mutation");
            Mutation = __assign(__assign({}, Mutation), _mutations);
        }
        if (subscriptions) {
            var _subscriptions = subscriptions.value();
            validateUniqueOperations(Object.keys(_subscriptions), Object.keys(Subscription), "Subscription");
            Subscription = __assign(__assign({}, Subscription), _subscriptions);
        }
    }
    var result = {};
    if (Object.keys(Query).length)
        result["Query"] = Query;
    if (Object.keys(Mutation).length)
        result["Mutation"] = Mutation;
    if (Object.keys(Subscription).length)
        result["Subscription"] = Subscription;
    return result;
}
exports.getResolvers = getResolvers;
function validateUniqueOperations(operations, globalOperations, operationType) {
    operations.forEach(function (field) {
        if (globalOperations.includes(field)) {
            throw new Error("There are a repeated " + operationType + " called \"" + field + "\"");
        }
    });
}
