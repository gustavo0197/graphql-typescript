import "reflect-metadata";

export function Resolver(constructor: Function) {
  let queries = {};
  let mutations = {};
  let subscriptions = {};

  for (let key in constructor.prototype) {
    const resolverType: string = Reflect.getMetadata("type", constructor.prototype[key]);
    const name: string = Reflect.getMetadata("name", constructor.prototype[key]);

    if (resolverType && name) {
      switch (resolverType) {
        case "Query":
          queries[name] = constructor.prototype[key];
          break;
        case "Mutation":
          mutations[name] = constructor.prototype[key];
          break;
        case "Subscription":
          subscriptions[name] = constructor.prototype[key];
          break;
      }
    }
  }

  Reflect.defineProperty(constructor, "Query", { value: queries });
  Reflect.defineProperty(constructor, "Mutation", { value: mutations });
  Reflect.defineProperty(constructor, "Subscription", { value: subscriptions });
}

// Merge all resolvers
export function getResolvers(resolvers: any[]) {
  let Query = {};
  let Mutation = {};
  let Subscription = {};

  for (let i = 0; i < resolvers.length; i++) {
    // Get properties
    const queriesDescriptor = Reflect.getOwnPropertyDescriptor(resolvers[i], "Query");
    const mutationsDescriptor = Reflect.getOwnPropertyDescriptor(resolvers[i], "Mutation");
    const subscriptionsDescriptor = Reflect.getOwnPropertyDescriptor(resolvers[i], "Subscription");

    // Ensure that 'value' has something
    const queries = queriesDescriptor ? queriesDescriptor.value : {};
    const mutations = mutationsDescriptor ? mutationsDescriptor.value : {};
    const subscriptions = subscriptionsDescriptor ? subscriptionsDescriptor.value : {};

    Query = { ...Query, ...queries };
    Mutation = { ...Mutation, ...mutations };
    Subscription = { ...Subscription, ...subscriptions };
  }

  let result = {};

  if (Object.keys(Query).length) result["Query"] = Query;
  if (Object.keys(Mutation).length) result["Mutation"] = Mutation;
  if (Object.keys(Subscription).length) result["Subscription"] = Subscription;

  return result;
}
