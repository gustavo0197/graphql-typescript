import "reflect-metadata";

export function Resolver(constructor: Function) {
  const _getResolverFunctions = (operationType: string) => {
    let operations = {};
    const operationFields = Object.keys(constructor.prototype).filter(
      (field: string) => Reflect.getMetadata("type", constructor.prototype[field]) == operationType
    );

    operationFields.forEach((field) => {
      // Get operation name
      const name = Reflect.getMetadata("name", constructor.prototype[field]);
      operations[name] = constructor.prototype[field];
    });

    return operations;
  };

  const _getQueries = () => _getResolverFunctions("Query");
  const _getMutations = () => _getResolverFunctions("Mutation");
  const _getSubscriptions = () => _getResolverFunctions("Subscription");

  Reflect.defineProperty(constructor, "Queries", { value: _getQueries });
  Reflect.defineProperty(constructor, "Mutations", { value: _getMutations });
  Reflect.defineProperty(constructor, "Subscriptions", { value: _getSubscriptions });
}

// Merge all resolvers
export function getResolvers(resolvers: any[]) {
  let Query = {};
  let Mutation = {};
  let Subscription = {};

  for (let i = 0; i < resolvers.length; i++) {
    const queries = Reflect.getOwnPropertyDescriptor(resolvers[i], "Queries");
    const mutations = Reflect.getOwnPropertyDescriptor(resolvers[i], "Mutations");
    const subscriptions = Reflect.getOwnPropertyDescriptor(resolvers[i], "Subscriptions");

    if (queries) {
      const _queries = queries.value();
      validateUniqueOperations(Object.keys(_queries), Object.keys(Query), "Query");

      Query = { ...Query, ..._queries };
    }

    if (mutations) {
      const _mutations = mutations.value();
      validateUniqueOperations(Object.keys(_mutations), Object.keys(Mutation), "Mutation");

      Mutation = { ...Mutation, ..._mutations };
    }

    if (subscriptions) {
      const _subscriptions = subscriptions.value();
      validateUniqueOperations(Object.keys(_subscriptions), Object.keys(Subscription), "Subscription");

      Subscription = { ...Subscription, ..._subscriptions };
    }
  }

  let result = {};

  if (Object.keys(Query).length) result["Query"] = Query;
  if (Object.keys(Mutation).length) result["Mutation"] = Mutation;
  if (Object.keys(Subscription).length) result["Subscription"] = Subscription;

  return result;
}

function validateUniqueOperations(operations: string[], globalOperations: string[], operationType: string) {
  operations.forEach((field: string) => {
    if (globalOperations.includes(field)) {
      throw new Error(`There are a repeated ${operationType} called "${field}"`);
    }
  });
}
