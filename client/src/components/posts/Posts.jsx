import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../utils/axios";

const Posts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => makeRequest.get("/post").then(res => res.data)
  });

  return (
    <div className="posts">
      {isLoading
        ? "loading"
        : data && data.map(post => (<Post post={post} key={post.id} />
        ))}
    </div>
  );
}

export default Posts;
