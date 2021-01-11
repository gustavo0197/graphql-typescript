//import { ApolloServer } from "apollo-server";
//import { makeExecutableSchema } from "graphql-tools";
//import typeDefs from "./schema";
//import resolvers from "./resolvers";
//require("dotenv").config();

//const schema = makeExecutableSchema({ resolvers, typeDefs });
//const server = new ApolloServer({ schema });

//server
//.listen(process.env.PORT)
//.then(({ url }) => {
//console.log("\x1Bc");
//console.log(`Listening on ${url}`);
//})
//.catch((error: any) => {
//console.log(error);
//});

interface IResolver {
  type: string;
  key: string;
  value: () => any;
}

function Resolver<T extends { new (...args: any[]): {} }>(constructor: T) {
  let queries = {};

  for (let key in constructor.prototype) {
    const resolverData: IResolver = constructor.prototype[key]();

    if (resolverData.key && resolverData.type && resolverData.value) {
      switch (resolverData.type) {
        case "Query":
          queries[resolverData.key] = resolverData.value;
          break;
        case "Mutation":
          break;
        case "Subscription":
          break;
      }
    }

    delete constructor.prototype[key];
  }

  return class extends constructor {
    Query = queries;
  };
}

function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    public newProperty = "new property";
    private hello = "override";
    static getQueries = () => console.log("getting queries");
  };
}

function Query(name: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.value = function (): IResolver {
      return {
        type: "Query",
        key: name,
        value: descriptor.value,
      };
    };

    return descriptor;
  };
}

@classDecorator
class HelloResolver {
  @Query("HelloQuery")
  public Hello() {
    console.log("Hi from hello method");
  }

  public test() {
    //console.log("test method");
    return { message: "hi" };
  }

  static data() {}
}

HelloResolver.getQueries();
const hello = new HelloResolver();
console.log(hello);
