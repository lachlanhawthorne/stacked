module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom"],
  ignorePatterns: [".cache", ".keystone", ".next", "dist", "node_modules"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
