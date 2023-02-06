import { Post } from "./Post";

export const PrimaryPost = () => (
  <Post post={null} />
);

const PostProps = {
  title: "Post",
  component: Post,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qxzMxzEPoblvQiLRD7D34u/Sinatra-Library?node-id=172%3A562",
    },
  },
}

export default PostProps