import path from "path";

const rootDir = path.resolve(__dirname, "..");

export default {
  entryMain: path.resolve(rootDir, "src/index.js"),
  htmlTemplate: path.resolve(rootDir, "public/index.html"),
  favicon: path.resolve(rootDir, "public/favicon.svg"),
  absolute: {
    dist: path.resolve(rootDir, "build"),
    src: path.resolve(rootDir, "src")
  }
};
