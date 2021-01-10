import { mergeTypes, fileLoader } from "merge-graphql-schemas";
import { join } from "path";

const graphQLFiles = fileLoader(join(`${__dirname}/`), {
  extensions: [".graphql"],
});

export default mergeTypes(graphQLFiles, { all: true });
