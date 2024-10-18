import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../utils/axios";

const Posts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => makeRequest.get("/posts").then(res => res.data)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <div className="posts">
      {data && data.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Posts;
