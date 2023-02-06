import { StyledLink } from "./StyledLink";

export const PrimaryStyledLink = () => (
  <StyledLink title="My blog" />
);

const StyledLinkProps = {
  title: "StyledLink",
  component: StyledLink,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qxzMxzEPoblvQiLRD7D34u/Sinatra-Library?node-id=172%3A562",
    },
  },
}

export default StyledLinkProps