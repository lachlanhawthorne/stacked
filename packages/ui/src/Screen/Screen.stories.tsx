import { Screen } from "./Screen";

export const PrimaryScreen = () => (
  <Screen title="My blog" />
);

const ScreenProps = {
  title: "Screen",
  component: Screen,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qxzMxzEPoblvQiLRD7D34u/Sinatra-Library?node-id=172%3A562",
    },
  },
}

export default ScreenProps