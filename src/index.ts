import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "./schema";
import resolvers from "./resolvers";
require("dotenv").config();

const schema = makeExecutableSchema({ resolvers, typeDefs });
const server = new ApolloServer({ schema });

server
  .listen(process.env.PORT)
  .then(({ url }) => {
    //console.log("\x1Bc");
    console.log(`Listening on ${url}`);
  })
  .catch((error: any) => {
    console.log(error);
  });
