import React from "react";
import Post from "./Post";

function PostsContainer({ header }) {
  return (
    <div className="w-[min(1400px,100%)] flex flex-col gap-3">
      <div className="w-full">
        <h4 className="h4 text-zinc-950">{header && header}</h4>
      </div>
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default PostsContainer;
