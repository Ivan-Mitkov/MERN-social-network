import React from 'react'
import PostItem from './PostItem'
const PostsArray = ({posts}) => {
  return (
    <div className="posts">
    {posts.map((post) => (
      <PostItem key={post._id} post={post} showActions={true} />
    ))}
  </div>
  )
}

export default PostsArray
