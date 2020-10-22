import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const Posts = ({ querykey }) => {
  const posts = useQuery(querykey, () => {
    return axios
      .get("http://localhost:8000/api/posts/")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });

  return posts.isLoading ? (
    <div>
      <h1>Posts</h1>
      <h2>Loading...</h2>
    </div>
  ) : posts.isError ? (
    <div>
      <h1>Posts</h1>
      <h2>{posts.error.message}</h2>
    </div>
  ) : (
    <div>
      <h1>Posts</h1>
      {/* {posts.data.map((post) => {
        console.log(post);
      })} */}
    </div>
  );
};

export default Posts;
