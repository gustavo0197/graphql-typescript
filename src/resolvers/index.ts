import { fileLoader } from "merge-graphql-schemas";
import { join } from "path";
import { getResolvers } from "../decorators";

const queries = fileLoader(join(`${__dirname}/queries/`), {
  extensions: [".ts"],
});

const mutations = fileLoader(join(`${__dirname}/mutations/`), {
  extensions: [".ts"],
});

export default getResolvers([...queries, ...mutations]);
