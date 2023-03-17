import { Document } from "./Document";

export const PrimaryDocument = () => (
  <Document document={[]} />
);

const DocumentProps = {
  title: "Document",
  component: Document,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qxzMxzEPoblvQiLRD7D34u/Sinatra-Library?node-id=172%3A562",
    },
  },
}

export default DocumentProps