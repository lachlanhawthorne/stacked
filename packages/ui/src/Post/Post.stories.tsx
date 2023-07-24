import { Post } from "./Post";

const samplePost = {
  id: '1',
  title: "My first post",
  content: "This is my first post",
  publishDate: new Date("2021-01-01"),
  status: 'published',
  views: 200,
  authorId: '1',
}

export const PrimaryPost = () => (
  <Post post={samplePost} />
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