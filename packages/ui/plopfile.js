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
        path: "src/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/ui-component.tsx.hbs"
      },
      {
        type: "add",
        path: "src/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: "plop-templates/ui-component.test.tsx.hbs"
      },
      {
        type: "add",
        path: "src/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "plop-templates/ui-component.stories.tsx.hbs"
      },
      {
        type: "add",
        path: "src/{{pascalCase name}}/index.ts",
        templateFile: "plop-templates/ui-component-index.ts.hbs"
      }
    ]
  });
};
