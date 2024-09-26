import { Grid, Paper, Typography, Box, IconButton, Divider, Button, Menu, MenuItem, Modal, FormHelperText } from '@mui/material'
import { Avatar } from 'antd'
import React, { useState } from 'react'
import { Like1, MessageText, More, Share, User } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, createPost } from '../../../../redux/newsfeed/newsfeedAction';
import TextArea from 'antd/lib/input/TextArea';
import timeAgo from '../../../../timeFormat';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SocialPostCard = ({ content, userName, createdAt, handleGetPost, handleDeletePost, handlePostLike, liked, comments, ...rest }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const user = useSelector(state => state.auth.user)

    const [showAllComments, setShowAllComments] = useState(false);


    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleOpen = () => {
        setOpenModal(true)
    };
    const modalProps = {
        open: openModal,
        handleClose: handleCloseModal,
        id: rest?.id,
        handleGetPost
    }
    return (
        <Paper elevation={1} sx={{ height: '100%', width: '100%', borderRadius: '10px', padding: '15px', display: 'flex', flexDirection: 'column', }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', columnGap: '18px', alignItems: 'center' }}>
                    <Avatar shape="square" icon={<User />} />
                    <Box sx={{ display: 'flex', columnGap: '18px', flexDirection: 'column', alignItems: 'space-between' }}>
                        <Typography onClick={() => history.push(`/pages/profile/social/${rest.user.id}`)} variant='body2' fontWeight={600} sx={{'&:hover':{textDecoration:'underline', cursor:'pointer'}}}>{userName}</Typography>
                        <Typography variant='caption' sx={{ color: 'silver' }}>{timeAgo(createdAt)}</Typography>
                    </Box>
                </Box>
                {(user.role === 'admin' || rest.user?.id === user?.id) &&
                    <IconButton onClick={handleClick}><More /></IconButton>
                }
            </Box>
            <Box mt={0.5} mb={1.5}>
                <Typography variant='subtitle2'>
                    {content}
                </Typography>
            </Box>
            <Typography fontSize={'12px'} sx={{ color: 'silver' }}>{rest?.likedBy?.length ?? '0'} like</Typography>
            <Divider sx={{ my: 0.5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='text' startIcon={<Like1 variant='Bold' color={!liked ? '#858a91' : 'blue'} />} sx={{ color: !liked ? '#858a91' : 'primary' }} onClick={() => handlePostLike(rest?.id)} fullWidth >Like</Button>
                <Button variant='text' onClick={handleOpen} startIcon={<MessageText />} sx={{ color: '#858a91' }} fullWidth>Comment</Button>
                <Button variant='text' startIcon={<Share />} sx={{ color: '#858a91' }} fullWidth>Share</Button>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            {comments?.length > 1 &&

                <Button onClick={() => setShowAllComments(!showAllComments)} sx={{ color: '#858a91', width: 'fit-content', '&:hover': { textDecoration: 'underline' } }} variant='text'>{!showAllComments ? 'View more comments' : 'show less comments'}</Button>
            }
            <Box mt={1} sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
                {comments?.length > 0 &&
                    (!showAllComments
                        ?
                        comments?.slice(0, 1)?.map(comment => (
                            <Box sx={{ display: 'flex', columnGap: '6px' }}>
                                <Avatar shape="circle" icon={<User />} size={'default'} />
                                <Box py={1} px={2} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '20px', backgroundColor: '#f0f2f5' }}>
                                    <Typography onClick={() => history.push(`/pages/profile/social/${rest.user.id}`)}  variant='body2' fontWeight={600} sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>{comment?.user?.firstName} {comment?.user?.lastName}</Typography>
                                    <Typography variant='body2'>{comment?.content}</Typography>
                                </Box>
                            </Box>
                        ))
                        :
                        comments?.map(comment => (
                            <Box sx={{ display: 'flex', columnGap: '6px' }}>
                                <Avatar shape="circle" icon={<User />} size={'default'} />
                                <Box py={1} px={2} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '20px', backgroundColor: '#f0f2f5' }}>
                                    <Typography variant='body2' onClick={() => history.push(`/pages/profile/social/${rest.user.id}`)} fontWeight={600} sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>{comment?.user?.firstName} {comment?.user?.lastName}</Typography>
                                    <Typography variant='body2'>{comment?.content}</Typography>
                                </Box>
                            </Box>
                        ))
                    )
                }
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleDeletePost(rest?.id)}>Delete post</MenuItem>
            </Menu>
            <CreateCommentModal {...modalProps} />
        </Paper>
    )
}

export default SocialPostCard;


const CreateCommentModal = ({ open, handleClose, id, handleGetPost }) => {
    const [content, setContent] = useState('');
    const [error, seterror] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const submit = async () => {
        if (content.trim() === '') {
            seterror("Some content is required")
            return
        }
        const payload = {
            content,
            user: user.id
        }
        const res = await dispatch(createComment(id, payload));
        handleGetPost()
        setContent('')
        handleClose()

    };
    const handleShare = () => {
        // Create a new post with the same content and user
        const sharedPost = {
            content: content,
            user: user.id, // Use the original post's user
        };

        // Dispatch action to create the new post
        dispatch(createPost(sharedPost));

        // Fetch updated posts
        handleGetPost();
    };

    const checkError = () => {
        if (content.trim() === '') {
            seterror("Some content is required")
            return
        }
    }

    return (
        <Modal open={open} onClose={handleClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 0 }}>
            <Box p={2} sx={{ display: 'flex', backgroundColor: 'white', borderRadius: '12px', flexDirection: 'column', width: '450px' }}>
                <Typography variant='body1' fontWeight={600} textAlign={'center'}>Create Post</Typography>
                <Divider sx={{ my: 1, mb: 3 }} />
                <TextArea
                    placeholder='Write Comment'
                    rows={5}
                    value={content}
                    onFocus={() => seterror('')}
                    onChange={(e) => setContent(e.target.value)}
                    onBlur={checkError}
                />
                {error && (
                    <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                    >
                        {error}
                    </FormHelperText>
                )}
                <Button sx={{ mt: 3 }} onClick={submit} fullWidth variant='contained'>Submit</Button>
            </Box>
        </Modal>
    );
};