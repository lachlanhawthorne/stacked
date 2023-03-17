module.exports = function (plop) {
  plop.setGenerator("ui-component", {
    description: "Generate a UI component directory",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of your component?"
      }
    ],
    actions: [
      {
        type: "add",
        path: "../packages/ui/src/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "ui/component.tsx.hbs"
      },
      {
        type: "add",
        path: "../packages/ui/src/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: "ui/component.test.tsx.hbs"
      },
      {
        type: "add",
        path: "../packages/ui/src/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "ui/component.stories.tsx.hbs"
      },
      {
        type: "add",
        path: "../packages/ui/src/{{pascalCase name}}/index.ts",
        templateFile: "ui/component-index.ts.hbs"
      }
    ]
  });
};
