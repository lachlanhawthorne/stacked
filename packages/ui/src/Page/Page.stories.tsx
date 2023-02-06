import { Page } from "./Page";

export const PrimaryPage = () => (
  <Page title="My blog" />
);

const PageProps = {
  title: "Page",
  component: Page,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qxzMxzEPoblvQiLRD7D34u/Sinatra-Library?node-id=172%3A562",
    },
  },
}

export default PageProps