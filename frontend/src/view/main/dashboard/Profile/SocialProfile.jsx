import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SocialPostCard from "../workspace/SocialPostCard";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  deletePost,
  getAllUserPosts,
  likePost,
} from "../../../../redux/newsfeed/newsfeedAction";
import { useDispatch, useSelector } from "react-redux";
import ProtectedAppPage from "../../../pages/Protected";
import CoverPhoto from "../../../../assets/icons/cover.webp";

const SocialProfile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const handleGetUserPost = async () => {
    const res = await dispatch(getAllUserPosts(params.id));
    if (res && res?.length > 0) {
      setPosts(res?.reverse());
    }
  };

  const handlePostLike = async (id) => {
    const res = await dispatch(likePost(id));
    const newPosts = posts?.map((post) =>
      post.id === id ? { ...post, likedBy: res?.post?.likedBy } : { ...post }
    );
    setPosts(newPosts);
  };

  useEffect(() => {
    handleGetUserPost();
  }, []);

  const handleDeletePost = async (id) => {
    await dispatch(deletePost(id));
    handleGetUserPost();
  };
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item xs={11}>
          <div style={{height: "300px"}}>
            <img src={CoverPhoto} width="100%" height="250px" />

            <img
              src={user?.profileImage}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "100%",
                position: "relative",
                bottom: "5rem",
                left: "3rem",
              }}
            />
          </div>
        </Grid>
      </Grid>
      <Grid my={5} container justifyContent={"center"}>
        <Grid item xs={7}>
        <h3 style={{position: "relative", bottom: "5rem", left: "2rem"}}>{user?.firstName} {user?.lastName}</h3>

          <Typography mb={2} variant="h4">
            Your Posts
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
              alignItems: "center",
            }}
          >
            {posts?.length > 0 ? (
              posts?.map((post) => (
                <SocialPostCard
                  key={post.id}
                  content={post.content}
                  userName={`${post?.user?.firstName} ${post?.user?.lastName}`}
                  handleDeletePost={handleDeletePost}
                  setPosts={setPosts}
                  handleGetPost={handleGetUserPost}
                  comments={post?.comments?.reverse()}
                  handlePostLike={handlePostLike}
                  liked={post?.likedBy?.includes(user.id)}
                  {...post}
                />
              ))
            ) : (
              <Typography variant="subtitle2">The user has no posts</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      <ProtectedAppPage />
    </>
  );
};

export default SocialProfile;
