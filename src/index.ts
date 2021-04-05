import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";
import { isAuth } from "@utils";
import typeDefs from "./schema";
import resolvers from "./resolvers";
require("dotenv").config();

const schema = makeExecutableSchema({ resolvers, typeDefs });
const server = new ApolloServer({
  schema,
  context: ({ connection, req }) => {
    if (connection) {
      return connection.context;
    } else {
      return { auth: isAuth(req.headers.authorization) };
    }
  },
});

server
  .listen(process.env.PORT)
  .then(({ url }) => {
    //console.log("\x1Bc");
    console.log(`Listening on ${url}`);
  })
  .catch((error: any) => {
    console.log(error);
  });
