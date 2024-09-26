import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocialPostCard from "./SocialPostCard";
import { Box, Grid } from "@mui/material";
import CreatePostCard from "./CreatePostCard";
import { deletePost, getAllPosts, likePost } from "../../../../redux/newsfeed/newsfeedAction";
import ProtectedAppPage from "../../../pages/Protected";

function Workspace() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const user = useSelector(state => state.auth.user);

  const handleGetPost = async () => {
    const res = await dispatch(getAllPosts());
    if (res && res?.length > 0) {
      setPosts(res?.reverse());
    }
  };

  const handlePostLike = async (id) => {
    const res = await dispatch(likePost(id));
    const newPosts = posts?.map(post => post.id === id ? {...post, likedBy:res?.post?.likedBy} : {...post})
    setPosts(newPosts)
  };

  useEffect(() => {
    handleGetPost();
  }, []);

  const handleDeletePost = async (id) => {
    await dispatch(deletePost(id));
    handleGetPost();
  };

  return (
    <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', rowGap:'40px' }}>
      <Grid container justifyContent={'center'}>
        <Grid item xs={7}>
          <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', rowGap: '20px', alignItems: 'center' }}>
            <CreatePostCard handleGetPost={handleGetPost} />
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent={'center'}>
        <Grid item xs={7}>
          <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', rowGap: '20px', alignItems: 'center' }}>
            {
              posts?.map(post => (
                <SocialPostCard key={post.id} content={post.content} userName={`${post?.user?.firstName} ${post?.user?.lastName}`} handleDeletePost={handleDeletePost} setPosts={setPosts} handleGetPost={handleGetPost} comments={post?.comments?.reverse()} handlePostLike={handlePostLike} liked={post?.likedBy?.includes(user.id)} {...post} />
              ))
            }
          </Box>
        </Grid>
      </Grid>
      <ProtectedAppPage />
    </Box>
  );
}

export default Workspace;
