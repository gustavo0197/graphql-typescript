import { mergeResolvers, fileLoader } from "merge-graphql-schemas";
import { join } from "path";

const queries = fileLoader(join(`${__dirname}/queries/`), {
  extensions: [".ts"],
});

const mutations = fileLoader(join(`${__dirname}/mutations/`), {
  extensions: [".ts"],
});

export default mergeResolvers([...queries, ...mutations]);
