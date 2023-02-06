import { Header } from "./Header";

export const PrimaryHeader = () => (
  <Header title="My blog" />
);

const HeaderProps = {
  title: "Header",
  component: Header,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qxzMxzEPoblvQiLRD7D34u/Sinatra-Library?node-id=172%3A562",
    },
  },
}

export default HeaderProps